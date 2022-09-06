import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import './PaySucces.css';

const PaySuccess = () => {
	const [cart, setCart] = useContext(ShoppingCartContext);
	const { user } = useAuth();
	const productsPrice = cart?.reduce(
		(acc, curr) => acc + curr.price * curr.quantity,
		0
	);
	const items = JSON.parse(localStorage.getItem('items'));
	const order = JSON.parse(localStorage.getItem('OrderId'));
	const shipmentFee = items.find(el => el.title === 'shipment').unit_price;
	const tax = items.find(el => el.title === 'tax').unit_price;
	const total = productsPrice + shipmentFee + tax;
	console.log(items);
	console.log(cart);
	console.log(user);
	async function pay() {
		try {
			console.log(user);
			const userId = user.uid;
			console.log(userId);
			const userDB = (await axios.get(`/users/${userId}`)).data;

			console.log(userDB);
			const orderId = (await axios.get(`/purchases/cart?userId=${userId}`))
				.data;
			console.log(orderId);
			await axios.put(`/purchases/user/${orderId[0].id}`, {
				status: 'Paid',
			});
			console.log('voy a aplicar');
			await Promise.all(
				cart.map(el =>
					axios.put('/stocks/apply', {
						stockId: el.stockId,
						quantity: el.quantity,
					})
				)
			);
			console.log('voy a confirmar');
			await axios.put(`/order-items/confirmed`, {
				orderId: orderId[0].id,
			});
			console.log('voy a mandar el mail');
			await axios.post(`/mails/succ`, {
				purchaseMail: userDB.email,
				name: userDB.firstName,
				orderId: orderId[0].id,
			});

			console.log('voy a limppiar el carrito');
			setCart([]);
			localStorage.setItem('OrderId', JSON.stringify(''));
			localStorage.setItem('items', JSON.stringify(''));
		} catch (error) {
			console.log(error.message);
			alert('error');
		}
	}

	return (
		<div className='absolute top-0 w-screen h-[800px] flex items-center justify-center'>
			<div className='bg-blue-200 p-9 rounded-lg w-[600px]  text-center'>
				<h2 className='text-3xl m-4'>Your purchase was successful!</h2>
				<h4>Order N° {order}</h4>
				{cart.map(e => (
					<div key={e.stockId}>
						<div className='flex justify-between pr-10 p-1'>
							<div className='flex gap-3'>
								<div
									className='shp-img-ps'
									style={{
										backgroundImage: `url('${e.prodImageHome}')`,
									}}
								></div>
								<div className='shp-details'>
									<p className='shp-ref text-xs'>Stock-RF {e.stockId}</p>
									<h3>{e.name}</h3>
									<p>Type: {e.prodType}</p>
									<div id='shp-bottom-shp-details flex justify-between'>
										{/* ADD FAV AND DELETE */}
									</div>
								</div>
							</div>
							{/* 3  */}
							<div className=' flex flex-col justify-between py-3 '>
								<div className='text-1xl '>
									<span>Unit price: </span>$ {e.price}
								</div>
								{/* SELECT QUANTITY */}
								<div className='flex'>
									<span>Quantity:</span>
									<div className='flex'>
										<div id='detail-7'>
											<input
												className=' text-center bg-transparent w-10 caret-transparent after
	'
												readOnly
												type='number'
												id='shop-quantity'
												value={e.quantity}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<hr />
					</div>
				))}
				<div className=' w-[530px] text-sm h-[120px] top-1 rounded-xl p-1 border-gray-500'>
					{/* <h1 className='text-3xl text-blue-400 text-center'>Summary</h1> */}
					<div className='flex flex-col mt-1 py-1 border-y-2 border-y-gray-600'>
						<div className='flex justify-between'>
							<p className=''>Subtotal</p>
							<p className=' text-right'>U$ {productsPrice}</p>
						</div>
						<div className='flex justify-between'>
							<p className=''>Shipping</p>
							<p className=' text-right'>U$ {shipmentFee}</p>
						</div>
						<div className='flex justify-between'>
							<p className=''>Tax</p>
							<p className=' text-right'>U$ {tax}</p>
						</div>
						<div className='flex justify-between border-t-2 border-gray-500 pt-2'>
							<h3 className='text-m font-semibold'>Total</h3>
							<h3 className='text-m font-semibold'>U$ {total}</h3>
						</div>
					</div>
					{/* BOTONES */}
				</div>
				<div className='p-1'>
					We will contact you to inform you the shipment tracking.
				</div>
				<div className='p-1'>
					You can see the status of your shipment in your account at `My orders`
					section.
				</div>
				<div className='p-3'>
					<Link to='/home'>
						<button onClick={pay} className='m-2 btn btn-red hover:btn-red '>
							Back Home
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PaySuccess;
