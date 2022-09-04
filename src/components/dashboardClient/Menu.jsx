import { useContext, useEffect } from 'react'; // eslint-disable-line no-unused-vars
// import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
// import { getUsers } from '../../redux/actions';

export const Menu = () => {
	// const dispatch = useDispatch();
	const { id } = useParams();

	return (
		<>
			<div id='menu' className='container mx auto flex justify-center'>
				<ul className='flex justify-center'>
					<li>
						<Link to={`/${id}/user/menu/account`}>
							<button
								id='account'
								className='flex justify-center px-6 py-6 my-8 border-solid border border-white text-white hover:bg-gray-400'
							>
								My Account
							</button>
						</Link>
					</li>
					<li>
						<Link to={`/${id}/user/menu/orders`}>
							<button
								id='orders'
								className='flex justify-center px-6 py-6 my-8 border-solid border border-white text-white hover:bg-gray-400 duration-1000'
							>
								My Orders
							</button>
						</Link>
					</li>
					<li>
						<Link to={`/${id}/user/menu/favorites`}>
							<button
								id='favorites'
								className='flex justify-center px-6 py-6 my-8 border-solid border border-white text-white hover:bg-gray-400 duration-1000'
							>
								My Favorites
							</button>
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
};
