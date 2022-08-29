import { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { signout } from '../firebase/firebase';
// import TemporaryDrawer from '../components/Drawer';

// eslint-disable-next-line react/prop-types
export default function Navbar() {
	const [cart, setCart] = useContext(ShoppingCartContext); // eslint-disable-line no-unused-vars
	const [menuSign, setMenuSign] = useState(false);
	const location = useLocation();
	const navigate = useHistory();
	const { currentUserF, setIsLogged } = useContext(AuthContext);

	useEffect(() => {
		document.getElementById('shp-num').innerHTML = cart.length;
	}, [cart]);

	const handleOnClick = () => {
		document.getElementById('menubar').classList.toggle('flex');
		document.getElementById('menubar').classList.toggle('hidden');
	};

	const handleOnClickAuth = () => {
		if (Object.entries(currentUserF).length === 0) {
			navigate.push('/signin');
		} else {
			setMenuSign(!menuSign);
		}
	};

	const handleSignout = () => {
		signout().then(() => setIsLogged(true));
	};
	// const handleonclicksignin = () {
	// si no esta logueado se va a la ruta de logueo
	// si esta logueado se muestra el nombre o avatar
	// y si da click setMenuSign(true)

	// }

	return (
		<nav
			className='sticky top-0 mx-auto p-4 bg-black select-none  text-white drop-shadow-2xl	z-50
		lg:h-32'
		>
			<div className='container mx-auto flex items-center justify-between'>
				<Link
					to='/'
					className='z-50 hover:text-purple-300	duration-1000				
					lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-9
				'
				>
					<i
						className={`
					fa-solid fa-palette
					text-2xl
					${location.pathname === '/home' ? 'text-blue-500' : 'text-myPurple-100'}
					mr-4
					`}
					></i>
					<span className='text-2xl'>
						Cakes
						<span
							className={`text-2xl font-bold
					${location.pathname === '/home' ? 'text-blue-500' : 'text-myPurple-100'}
						`}
						>
							&
						</span>
						Bases
					</span>
				</Link>
				<button
					id='menu'
					onClick={handleOnClick}
					className='
 lg:hidden
 text-purple-100
 hover:text-myPurple-100
				duration-1000
 '
				>
					<svg
						className='h-8 w-8'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth='2'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M4 6h16M4 12h16M4 18h16'
						/>
					</svg>
				</button>
				<div
					id='menubar'
					className='
					hidden
					z-20
					flex-col
					gap-4
					absolute
					right-0
					left-0
					top-16
					bg-black
					text-center
					text-lg
					p-6
					items-center
					lg:flex
					lg:flex-row
					lg:static
					lg:justify-between
					lg:w-full
					'
				>
					<span
						className={`text-white flex gap-2 py-1 px-6 cursor-pointer
						${location.pathname !== '/home' && 'hidden'}
						`}
						onClick={() =>
							document.querySelector('#sidebar').classList.toggle('hidden')
						}
					>
						<i className='bi bi-filter-left px-2'></i>
						Filter
					</span>
					<Link
						className={`
						flex
						gap-2
						py-1
						px-6
						hover:text-purple-400
						duration-1000
						${location.pathname === '/home' && 'hidden'}
						`}
						to='/home'
					>
						<svg
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
							/>
						</svg>
						Home
					</Link>
					<a
						role='menuitem'
						className='
						flex
						gap-2
						py-1
						px-6
						hover:text-purple-400
							duration-1000
						lg:mr-auto
						'
						href='#'
					>
						<svg
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
							/>
						</svg>
						Other
					</a>

					<Link
						role='menuitem'
						className='
 flex
						gap-2
						py-1
						px-6
						hover:text-purple-400
						duration-1000
 	'
						to='/shop/shoppingCart'
					>
						<div className='flex justify-center items-center'>
							<svg
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-6 h-6 mb-2'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
								/>
							</svg>
							<span
								id='shp-num'
								className='
							absolute
							text-[10px]
							text-green-300'
							></span>
						</div>
						In the bag
					</Link>
					<div className='relative'>
						<button
							role='menuitem'
							onClick={handleOnClickAuth}
							className={`py-2 px-6 text-white rounded-md
							${location.pathname === '/home' ? 'bg-blue-500' : 'bg-myPurple-100'}
					`}
							// href='/signin'
						>
							{Object.entries(currentUserF).length !== 0 ? (
								<>
									<img
										className='inline-block h-7 w-7 mr-2 rounded-full ring-1 ring-white'
										src={currentUserF.profilePicture}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null; // prevents looping
											currentTarget.src =
												'https://doodleipsum.com/500/abstract';
										}}
										alt=''
									/>
									{currentUserF.firstName}
								</>
							) : (
								<>
									<i className='text-2xl mr-3 fa-solid fa-circle-user'></i>
									Sign In
								</>
							)}
						</button>
						{menuSign && (
							<>
								<div
									className='fixed inset-0 h-screen w-screen'
									onClick={() => setMenuSign(false)}
									tabIndex='-1'
								></div>

								<div className='absolute right-0 mt-2 py-2 w-48 bg-black rounded-lg text-sm text-left text-white '>
									<a
										href='#'
										className='block px-4 py-2  hover:bg-blue-500 hover:text-white'
									>
										Account settings
									</a>
									<button
										onClick={handleSignout}
										className='block px-4 py-2 text-myRed  hover:bg-blue-500 hover:text-pink-300 w-full text-left'
									>
										Sign out
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
