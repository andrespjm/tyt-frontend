import { useContext, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getUsers } from '../../redux/actions';

export const Menu = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const history = useHistory();

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	return (
		<div className='w-screen p-4 select-none'>
			<div
				id='menu'
				className='container flex justify-around text-white font-semibold'
			>
				<button>
					<Link to={`/${id}/user/menu/account`}>
						<button
							id='account'
							className={`px-6 py-4 w-40 border duration-1000 border-white rounded-xl hover:text-blue-500 
							${history.location.pathname.slice(-7) === 'account' ? 'ring-4' : ''}
							
							`}
						>
							My Account
						</button>
					</Link>
				</button>
				<button>
					<Link to={`/${id}/user/menu/orders`}>
						<button
							id='orders'
							className={`px-6 py-4 w-40 border duration-1000 border-white rounded-xl hover:text-blue-500 
							${history.location.pathname.slice(-6) === 'orders' ? 'ring-4' : ''}
							
							`}
						>
							My Orders
						</button>
					</Link>
				</button>
				<button>
					<Link to={`/${id}/user/menu/favorites`}>
						<button
							id='favorites'
							className={`px-6 py-4 w-40 border duration-1000 border-white rounded-xl  hover:text-blue-500 
							${history.location.pathname.slice(-9) === 'favorites' ? 'ring-4' : ''}
							
							`}
						>
							My Favorites
						</button>
					</Link>
				</button>
			</div>
		</div>
	);
};
