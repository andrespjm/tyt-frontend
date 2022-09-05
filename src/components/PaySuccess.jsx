import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartContext } from '../context/ShoppingCartContext';

const PaySuccess = () => {
	const [cart, setCart] = useContext(ShoppingCartContext);
	const { currentUserF } = useAuth();
	console.log(cart);
	async function pay() {
		try {
			console.log(currentUserF);
			const userId = currentUserF.id;
			console.log(userId);
			const user = (await axios.get(`/users/${userId}`)).data;

			console.log(user);
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
				purchaseMail: user.email,
				name: user.firstName,
				orderId: orderId[0].id,
			});

			console.log('voy a limppiar el carrito');
			setCart([]);
		} catch (error) {
			console.log(error.message);
			alert('error');
		}
	}

	return (
		<div className='absolute top-0 w-screen h-[800px] flex items-center justify-center'>
			<div className='bg-blue-200 p-14 rounded-lg w-[600px] h-[260px] text-center'>
				YOUR PURCHASE WAS SUCCESSFUL
				<div className='p-5'>
					<Link to='/home'>
						<button onClick={pay} className='m-3 btn btn-red hover:btn-red '>
							BACK HOME
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PaySuccess;
