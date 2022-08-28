import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import axios from 'axios';

const PaySuccess = () => {
	const [cart, setCart] = useContext(ShoppingCartContext);
	useEffect(() => {
		async function pay() {
			try {
				console.log('entre al handle pay');
				const userId = '58ba8def-27f7-4844-b842-f5549957306a';
				const orderId = (await axios.get(`/purchases/cart?userId=${userId}`))
					.data;
				await axios.put(`/purchases/user/${orderId[0].id}`, {
					status: 'Paid',
				});
				await Promise.all(
					cart.map(el =>
						axios.put('/stocks/apply', {
							stockId: el.stockId,
							quantity: el.quantity,
						})
					)
				);
				await axios.put(`/order-items/confirmed`, {
					orderId: orderId[0].id,
				});
				console.log(cart);
				setCart([]);
			} catch (error) {
				alert('error');
			}
		}
		pay();
	}, []);

	return (
		<div className='absolute top-0 w-screen h-[800px] flex items-center justify-center'>
			<div className='bg-blue-200 p-14 rounded-lg w-[600px] h-[260px] text-center'>
				YOUR PURCHASE WAS SUCCESSFUL
				<div className='p-5'>
					<Link to='/home'>
						<button className='m-3 btn btn-red hover:btn-red '>
							BACK HOME
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PaySuccess;
