import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { payMercadoPago } from '../helpers/payMercadoPago.js';
// import { loggin } from '../redux/actions';
import './ShoppingCart.css';
// hope

const ShoppingCart = () => {
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
	const { user } = useAuth();
	// const userId = user.uid; // from token information

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
		item.quantity = item.quantity > 1 ? item.quantity - 1 : item.quantity;
		setCart(cart2);
	}

	// look up the contact information of the last order and preload it
	async function handleCheckOut() {
		// console.log(currentUserF);
		Object.entries(user).length === 0 && history.push('/signin');
		try {
			const userId = user.uid;
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
			// localStorage.setItem('payment', 'true');
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
			const userId = user.uid;
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

	// console.log(e.quanitty);

	return (
		<section className='text-white w-screen h-screen select-none bg-gradient-to-b from-black via-gray-600 to-base-900'>
			<div className='container text-white'>
				<div className='shopping-header'>
					<h2 className='text-5xl'>
						<i className='bi bi-bag'></i> Shopping Bag
					</h2>
				</div>
				<hr />
				<div className='relative shopping-container'>
					<div className='shop-cont-left'>
						{!cart.length ? (
							<div>No items in the bag</div>
						) : (
							cart.map(e => (
								<div key={e.stockId}>
									<div className='flex justify-between pr-10'>
										<div className='flex gap-3'>
											<Link to={`/detail/${e.designId}`}>
												<div
													className='shp-img'
													style={{
														backgroundImage: `url('${e.prodImageHome}')`,
													}}
												></div>
											</Link>
											<div className='shp-details'>
												<p className='shp-ref'>Stock-RF {e.stockId}</p>
												<h3>{e.name}</h3>
												<p>Type: {e.prodType}</p>
												<p>
													Left availability: {e.stockQuantity - e.quantity} un
												</p>
												<div id='shp-bottom-shp-details flex justify-between'>
													{/* ADD FAV AND DELETE */}
													<span className='underline text-blue-300'>
														<i className='bi bi-bookmark-heart pr-2'></i>
														Add to favorites
													</span>
													<span
														className='text-rose-400 ml-20 underline cursor-pointer'
														onClick={() =>
															// setCart(cart.filter(i => i.stockId !== e.stockId))
															setDeleteItem(e.stockId)
														}
													>
														<i className='fa-solid fa-trash-can text-xl px-2'></i>
														Delete
													</span>
												</div>
											</div>
										</div>
										{/* 3  */}
										<div className=' flex flex-col justify-between py-3 text-right'>
											<div className='text-2xl'>$ {e.price}</div>
											{/* SELECT QUANTITY */}
											<div className='flex'>
												<span>Quantity:</span>
												<div className='flex'>
													<i
														id={e.stockId}
														className='fa-solid  items-center fa-minus ml-4 mt-1 h-fit cursor-pointer'
														onClick={handleDecrement}
													></i>
													<div id='detail-7'>
														<input
															className='text-white text-center bg-transparent w-10 caret-transparent after
								'
															readOnly
															type='number'
															id='shop-quantity'
															value={e.quantity}
														/>
													</div>
													<i
														id={e.stockId}
														className='fa-solid fa-plus mt-1 h-fit cursor-pointer'
														onClick={handleIncrement}
													></i>
												</div>
											</div>
										</div>
									</div>
									<hr />
								</div>
							))
						)}
					</div>
					{/* SUMMARY AND PAYING INFORMATION */}
					<div className='absolute bg-gray-800 w-[420px] h-[420px] right-12 top-10 rounded-xl p-10 border-gray-600'>
						<h1 className='text-3xl text-blue-400 text-center'>Summary</h1>
						<div className='flex flex-col mt-4 py-3 border-y-2 border-y-gray-600'>
							<div className='flex justify-between'>
								<p className='mb-2'>Subtotal</p>
								<p className='mb-2 text-right'>U$ {totalPrice}</p>
							</div>
							<div className='flex justify-between'>
								<p className='mb-2'>Shipping</p>
								<p className='mb-2 text-right'>U$ {totalShipping}</p>
							</div>
							<div className='flex justify-between'>
								<p className='mb-2'>Tax</p>
								<p className='mb-2 text-right'>
									U$ {(totalPrice + totalShipping) * 0.2}
								</p>
							</div>
							<div className='flex justify-between border-t-2 border-gray-500 pt-3'>
								<h3 className='text-xl font-semibold'>Total</h3>
								<h3 className='text-xl font-semibold'>
									U$ {(totalPrice + totalShipping) * 1.2}
								</h3>
							</div>
						</div>
						{/* BOTONES */}
						<div className='flex justify-between'>
							<button
								className='btn btn-red hover:btn-red my-5 w-32'
								onClick={() => history.push('/home')}
							>
								back
							</button>
							<button
								className='btn btn-blue hover:btn-blue my-5 w-32'
								onClick={handleCheckOut}
							>
								checkout
							</button>
						</div>
					</div>
				</div>
			</div>

			{checkout && (
				<div className='fixed left-0 top-0 w-screen h-screen flex items-center justify-center text-white bg-[rgba(0,0,0,0.8)]'>
					<form
						onSubmit={handleOrder}
						className='bg-gray-800 px-12 py-8 w-[700px] rounded-lg
						'
					>
						<div className='text-end text-lg'></div>
						<h2 className='text-center text-xl border-b-2 border-gray-500 py-4 flex flex-col'>
							<i className='bi bi-truck text-4xl text-blue-300 mb-4'></i>
							Please update your shipping information!
						</h2>
						<div className='mt-6'>
							<div>
								<label className='w-1/3' htmlFor='phoneNumber'>
									Phone Number:
								</label>
								<input
									className='w-2/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-2
									focus:outline-1 focus:outline-blue-500
									'
									type='text'
									onChange={handleOrderData}
									name='phoneNumber'
									value={orderData.phoneNumber}
								/>
							</div>
							<div>
								<label className='w-1/3' htmlFor='postalCode'>
									Postal Code:
								</label>
								<input
									className='w-2/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-2
									focus:outline-1 focus:outline-blue-500
									'
									type='text'
									onChange={handleOrderData}
									name='postalCode'
									value={orderData.postalCode}
								/>
							</div>
							<div>
								<label className='w-1/3' htmlFor='shippingAddressStreet'>
									Street Adress:
								</label>
								<input
									className='w-2/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-2
									focus:outline-1 focus:outline-blue-500
									'
									type='text'
									onChange={handleOrderData}
									name='shippingAddressStreet'
									value={orderData.shippingAddressStreet}
								/>
							</div>
							<div>
								<label className='w-1/3' htmlFor='shippingAddressNumber'>
									House Number:
								</label>
								<input
									className='w-2/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-2
									focus:outline-1 focus:outline-blue-500
									'
									type='text'
									onChange={handleOrderData}
									name='shippingAddressNumber'
									value={orderData.shippingAddressNumber}
								/>
							</div>
						</div>

						<div
							className={`py-1 text-center text-myRed text-xs
							${errorOrder ? 'visible' : 'invisible'}
							`}
						>
							Please complete all the information fields
						</div>

						<div className='relative flex justify-around mt-4'>
							<button
								className='w-28 py-2 px-3 rounded-md btn-red hover:btn-red'
								onClick={() => setCheckout(false)}
							>
								Close
							</button>
							{!pay && (
								<button
									className='w-28 py-3 px-3 rounded-md btn-blue hover:btn-blue '
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
				<div className='fixed left-0 top-0 w-screen h-screen flex items-center justify-center text-white bg-[rgba(0,0,0,0.8)]'>
					<div className='bg-gray-800 p-10 rounded-lg w-[500px] h-[260px] text-center flex flex-col gap-2'>
						<i className='bi bi-trash3-fill text-2xl text-myRed'></i>
						Are you sure you want to delete the item?
						<div className='py-4 '>
							<button
								onClick={() => setDeleteItem(false)}
								className='m-3 btn btn-red hover:btn-red '
								type='submit'
							>
								cancel
							</button>
							<button
								onClick={() => {
									setCart(cart.filter(i => i.stockId !== deleteItem));
									setDeleteItem(false);
								}}
								className='m-3 btn btn-blue hover:btn-blue '
								type='submit'
							>
								confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default ShoppingCart;
