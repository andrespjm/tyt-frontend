import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { payMercadoPago } from '../helpers/payMercadoPago.js';
import { loggin } from '../redux/actions';
import './ShoppingCart.css';
import { AuthContext } from '../context/AuthContext';

const ShoppingCart = () => {
	// const login = useSelector(state => state.login);
	const dispatch = useDispatch();

	// const [cart, setCart] = useContext(ShoppingCartContext);
	const [cart, setCart] = useContext(ShoppingCartContext);
	const history = useHistory();
	const totalPrice = cart?.reduce(
		(acc, curr) => acc + curr.price * curr.quantity,
		0
	);
	const totalShipping = cart?.reduce((acc, curr) => acc + curr.quantity * 5, 0);
	const [checkout, setCheckout] = useState(false);
	const [orderData, setOrderData] = useState({
		phoneNumber: '',
		postalCode: '',
		shippingAddressStreet: '',
		shippingAddressNumber: '',
		shipmentFee: 0,
		tax: 0,
	});
	const [pay, setPay] = useState(false);
	const [errorOrder, setErrorOrder] = useState(false);
	const [deleteItem, setDeleteItem] = useState(false);
	// const [order, setOrder] = useState();
	const { currentUserF } = useContext(AuthContext);
	const userId = currentUserF.id; // from token information

	function handleIncrement(e) {
		const cart2 = [...cart];
		const item = cart2.find(el => el.stockId === parseInt(e.target.id));
		item.quantity =
			item.quantity < item.stockQuantity ? item.quantity + 1 : item.quantity;
		setCart(cart2);
	}

	function handleDecrement(e) {
		const cart2 = [...cart];
		const item = cart2.find(el => el.stockId === parseInt(e.target.id));
		item.quantity = item.quantity > 0 ? item.quantity - 1 : item.quantity;
		setCart(cart2);
	}

	useEffect(() => {
		async function handleLoggin() {
			// logout: save in DB in order status cart, order items confirmed false (if order exists replace if not create)
			// search order status cart where userId. if it exists delete line items and create new ones, if not, create order and add line items.
			if (Object.entries(currentUserF).length > 0) {
				let orderId = '';
				try {
					// I look for the id of the order in the cart if it already exists
					orderId = (await axios.get(`/purchases/cart?userId=${userId}`)).data;
					// if it already exists, I delete the items, to leave only the current ones loaded
					if (orderId.length > 0) {
						orderId = orderId[0].id;
						await axios.delete(`/order-items/PurchaseId/${orderId}`);
					} else {
						// if it doesn't exist, I create the purchase order
						orderId = (await axios.post(`/purchases/${userId}`, {})).data.id;
					}
					// in both cases I create the items of the cart without confirming and clean the state when leaving
					await Promise.all(
						cart.map(el =>
							axios.post('/order-items', {
								stockId: el.stockId,
								quantity: el.quantity,
								purchaseId: orderId,
								price: el.price,
								confirmed: false,
							})
						)
					);
					setCart([]);
				} catch (error) {
					alert(error.request.response);
				}
			} else {
				// loggin: raise DB and merge with local storage (if duplicates add quantities) and validate maximum stock
				let orderId = '';
				try {
					const data = await axios.get(`/purchases/cart?userId=${userId}`);
					orderId = data.data;
					if (orderId.length > 0) {
						const orderItems = (
							await axios.get(`/order-items?PurchaseId=${orderId[0].id}`)
						).data;

						const ordersDB = orderItems.map(el => ({
							name: el.Stock.Product.name,
							prodImageHome: el.Stock.Product.img_home.secure_url,
							prodType: el.Stock.ProductTypeName,
							stockId: el.StockId,
							price: el.price,
							quantity: el.quantity,
							stockQuantity: el.Stock.quantity,
						}));

						// eslint-disable-next-line no-return-assign
						cart.forEach(el =>
							ordersDB.find(lc => el.stockId === lc.stockId)
								? (el.quantity =
										el.quantity +
										ordersDB.find(lc => el.stockId === lc.stockId).quantity)
								: el
						);

						const added = ordersDB.filter(
							el => !cart.find(d => d.stockId === el.stockId)
						);

						const agreg = [...cart, ...added];
						// eslint-disable-next-line no-return-assign
						agreg.forEach(el =>
							el.quantity > el.stockQuantity
								? (el.quantity = el.stockQuantity)
								: el
						);

						setCart(agreg);
					}
				} catch (error) {
					alert(error.request.response);
				}
			}
			dispatch(loggin());
		}
		handleLoggin();
	}, []);

	// look up the contact information of the last order and preload it
	async function handleCheckOut() {
		Object.entries(currentUserF).length === 0 && history.push('/signin');
		try {
			const orderId = (await axios.get(`/purchases/data?userId=${userId}`))
				.data;
			if (orderId.length > 0) {
				setOrderData({
					...orderData,
					phoneNumber: orderId[0].phoneNumber,
					postalCode: orderId[0].postalCode,
					shippingAddressStreet: orderId[0].shippingAddressStreet,
					shippingAddressNumber: orderId[0].shippingAddressNumber,
				});
			}
		} catch (error) {
			alert(error.request.response);
		}
		setCheckout(true);
	}

	// update contact information
	function handleOrderData(e) {
		setOrderData(orderData => ({
			...orderData,
			[e.target.name]: e.target.value,
		}));
	}

	async function handleOrder(e) {
		e.preventDefault();
		let items = cart.map(e => {
			return {
				title: e.name,
				unit_price: e.price,
				quantity: e.quantity,
			};
		});
		items = [
			...items,
			{ title: 'shipment', unit_price: totalShipping, quantity: 1 },
			{
				title: 'tax',
				unit_price: (totalPrice + totalShipping) * 0.2,
				quantity: 1,
			},
		];
		payMercadoPago(items);
		setPay(true);
		let orderId = '';
		if (
			!orderData.phoneNumber ||
			!orderData.postalCode ||
			!orderData.shippingAddressNumber ||
			!orderData.shippingAddressStreet
		) {
			setErrorOrder(true);
		} else {
			setErrorOrder(false);
			try {
				// find cart order
				orderId = (await axios.get(`/purchases/cart?userId=${userId}`)).data;
				// if it already exists, update contact information (If it has previous orders it brings previous information )
				if (orderId.length > 0) {
					orderId = orderId[0].id;
					// setOrder(orderId);

					await axios.put(`/purchases/user/${orderId}`, {
						...orderData,
						shipmentFee: totalShipping,
						tax: (totalPrice + totalShipping) * 0.2,
					});
				} else {
					// if it doesn't exist, I create the purchase order
					orderId = (
						await axios.post(`/purchases/${userId}`, {
							...orderData,
							shipmentFee: totalShipping,
							tax: (totalPrice + totalShipping) * 0.2,
						})
					).data.id;
					// setOrder(orderId);
				}
				await axios.delete(`/order-items/PurchaseId/${orderId}`); // ok
				// set order items and decrement stock
				await Promise.all(
					cart.map(el =>
						axios.post('/order-items', {
							stockId: el.stockId,
							quantity: el.quantity,
							purchaseId: orderId,
							price: el.price,
							confirmed: false,
						})
					)
				);
			} catch (error) {
				alert(error.message);
			}
			// setCheckout(false);
			// setPay(true)
		}
	}

	return (
		<div className='shopping-wrapper bg-white h-screen'>
			{/* <button onClick={handleLoggin}>
				{Object.entries(currentUserF).length > 0
					? 'Logout(SignedIn)'
					: 'Loggin (SignedOut)'}
			</button> */}
			<h1>Loggin simulation until implemented</h1>
			<div className='shopping-bag'>
				<div className='shopping-header'>
					<h2>Bag</h2>
				</div>
				<hr />
				<div className='shopping-container'>
					<div className='shop-cont-left'>
						{!cart.length ? (
							<div>No items in the bag</div>
						) : (
							cart.map(e => (
								<div key={e.stockId}>
									<div className='shopping-product'>
										<div
											className='shp-img'
											style={{
												backgroundImage: `url('${e.prodImageHome}')`,
											}}
										></div>
										<div className='shp-details'>
											<p className='shp-ref'>Stock-RF {e.stockId}</p>
											<h3>{e.name}</h3>
											<p>Type: {e.prodType}</p>
											<p>
												Left availability: {e.stockQuantity - e.quantity} un
											</p>
											<div id='shp-bottom-shp-details'>
												<span className='shp-add-fv'>Add to favorites</span>
												<span
													className='text-myRed ml-4 text-xl'
													onClick={() =>
														// setCart(cart.filter(i => i.stockId !== e.stockId))
														setDeleteItem(e.stockId)
													}
												>
													<i className='fa-solid fa-trash-can'></i>
												</span>
											</div>
										</div>
										<div>
											<div>
												<button onClick={handleDecrement} id={e.stockId}>
													-
												</button>
												<button onClick={handleIncrement} id={e.stockId}>
													+
												</button>
												{e.quantity} un
											</div>
											<div>$ {e.price}</div>
										</div>
									</div>
									<hr />
								</div>
							))
						)}
					</div>
					<div className='shop-cont-right'>
						<h1 style={{ color: '#c684ff' }}>Summary</h1>
						<div className='shp-pay-info'>
							<div className='shp-pay-info-left'>
								<p>Subtotal</p>
								<p>Shipping</p>
								<p>Tax</p>
								<h3>Total</h3>
							</div>
							<div className='shp-pay-info-right'>
								<p>U$ {totalPrice}</p>
								<p>U$ {totalShipping}</p>
								<p>U$ {(totalPrice + totalShipping) * 0.2}</p>
								<h3>U$ {(totalPrice + totalShipping) * 1.2}</h3>
							</div>
						</div>
						<button className='shp-chkout' onClick={handleCheckOut}>
							Checkout
						</button>
					</div>
				</div>
			</div>

			<button
				className='btn btn-red hover:btn-red mx-auto my-5'
				onClick={() => history.push('/home')}
			>
				back
			</button>
			{checkout && (
				<div className='absolute top-0 w-screen h-[900px] flex items-center justify-center'>
					<form
						onSubmit={handleOrder}
						className='bg-blue-200 p-14 rounded-lg w-[800px] h-[460px]'
					>
						<h2 className='text-center text-lg'>
							Update your shipping information:
						</h2>
						<div className='grid grid-cols-2 mt-6'>
							<div className='flex flex-col h-[260px]'>
								<label htmlFor='phoneNumber'>Phone Number: </label>
								<label className='mt-[15px]' htmlFor='postalCode'>
									Postal Code:{' '}
								</label>
								<label className='mt-[15px]' htmlFor='shippingAddressStreet'>
									Street Adress:{' '}
								</label>
								<label className='mt-[15px]' htmlFor='shippingAddressNumber'>
									House Number:{' '}
								</label>
							</div>
							<div className='flex flex-col'>
								<input
									className='border rounded-md text-[14px] p-1'
									type='text'
									onChange={handleOrderData}
									name='phoneNumber'
									value={orderData.phoneNumber}
								></input>
								<input
									className='border rounded-md mt-2 text-[14px] p-1'
									type='text'
									onChange={handleOrderData}
									name='postalCode'
									value={orderData.postalCode}
								></input>
								<input
									className='border rounded-md mt-2 text-[14px] p-1'
									type='text'
									onChange={handleOrderData}
									name='shippingAddressStreet'
									value={orderData.shippingAddressStreet}
								></input>
								<input
									className='border rounded-md mt-2 text-[14px] p-1'
									type='text'
									onChange={handleOrderData}
									name='shippingAddressNumber'
									value={orderData.shippingAddressNumber}
								></input>
							</div>
						</div>
						{errorOrder && (
							<div className=' p-1 text-center '>
								Please complete all the information fields
							</div>
						)}
						<div className='relative flex justify-center'>
							{!pay && (
								<button
									className='btn btn-red hover:btn-red '
									id='page-content'
									type='submit'
									value='CONFIRM'
								>
									Confirm
								</button>
							)}
							{pay && (
								<button id='page-content' className='page-content'></button>
							)}
						</div>
					</form>
				</div>
			)}
			{deleteItem && (
				<div className='absolute top-0 w-screen h-[800px] flex items-center justify-center'>
					<div className='bg-blue-200 p-14 rounded-lg w-[600px] h-[260px] text-center'>
						Are you sure you want to delete the item?
						<div className='p-5'>
							<button
								onClick={() => {
									setCart(cart.filter(i => i.stockId !== deleteItem));
									setDeleteItem(false);
								}}
								className='m-3 btn btn-red hover:btn-red '
								type='submit'
							>
								Confirm
							</button>
							<button
								onClick={() => setDeleteItem(false)}
								className='m-3 btn btn-red hover:btn-red '
								type='submit'
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShoppingCart;
