import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
const PayFailure = () => {
	const [cart, setCart] = useContext(ShoppingCartContext);

	const handleCart = () => {
		setCart([]);
		console.log(cart);
	};
	return (
		<div className='absolute top-0 w-screen h-[800px] flex items-center justify-center'>
			<div className='bg-blue-200 p-14 rounded-lg w-[600px] h-[300px] text-center'>
				There was a problem in the payment
				<div className='p-5'>
					<Link to='/home'>
						<button
							className='m-3 btn btn-red hover:btn-red '
							onClick={handleCart}
						>
							CANCEL THE PURCHASE AND COME HOME
						</button>
					</Link>
					<Link to='/shop/shoppingCart'>
						<button className='m-3 btn btn-red hover:btn-red '>
							TRY PAYMENT AGAIN
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default PayFailure;
