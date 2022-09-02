import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
} from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { auth, getUserInfo } from '../../firebase/firebase';
import { cartSignIn } from '../../helpers/cartSignIn.js';
import { FormLogin } from './forms/FormLogin';

export const SignIn = () => {
	const { login } = useAuth();
	const navigate = useHistory();
	// const [currentUser, setCurrentUser] = useState({});
	const [error, setError] = useState('');
	const [cart, setCart] = useContext(ShoppingCartContext);
	let userId;
	useEffect(() => {
		onAuthStateChanged(auth, handleUserStateChanged);
	}, []);
	const handleUserStateChanged = async user => {
		if (user) {
			const userInfo = await getUserInfo(user.uid);
			if (userInfo.processCompleted) {
				return navigate.push('/home');
			}
			navigate.push('/user/edit');
		}
	};
	const handleOnClickGoogle = async () => {
		const gooogleProvider = new GoogleAuthProvider();
		await signInWithGoogle(gooogleProvider);
		async function signInWithGoogle(gooogleProvider) {
			try {
				const res = await signInWithPopup(auth, gooogleProvider);
				userId = res.user.uid;
			} catch (err) {
				console.error(err);
			}
			console.log('sign in, userdid', userId);
			await cartSignIn(userId, cart, setCart);
		}
	};

	const handleSignInFirebase = async (email, password) => {
		try {
			await login(email, password);
			// navigate.push('/home');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<FormLogin
			handleOnClickGoogle={handleOnClickGoogle}
			handleSignInFirebase={handleSignInFirebase}
			error={error}
		/>
	);

	// if (status === 1)
	// 	return (
	// 		<div className='bg-gray-100 w-2/4 mx-auto'>
	// 			<h1 className='text-center text-2xl mt-2 pt-4'>
	// 				Bienvenido {currentUser.firstName}
	// 			</h1>
	// 			<p className='text-center my-3'>
	// 				Para terminar el proceso elige un nombre de usuario
	// 			</p>
	// 			{Object.entries(currentUser).length !== 0 ? (
	// 				<FormUserProfile
	// 					currentUser={currentUser}
	// 					handleContinue={handleContinue}
	// 				/>
	// 			) : (
	// 				<div className='flex py-3 justify-center'>
	// 					<BeatLoader />
	// 				</div>
	// 			)}
	// 		</div>
	// 	);

	// if (status === 2)
	// 	return (
	// 		<div className='flex justify-center py-5'>
	// 			<div className='flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg w-full'>
	// 				<img
	// 					className=' w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg'
	// 					src='https://res.cloudinary.com/dyqwtxenu/image/upload/v1661740059/tyt/success_afsck3.jpg'
	// 					alt='cakes and bases'
	// 				/>
	// 				<div className='p-6 flex flex-col justify-start'>
	// 					<div className='flex justify-center'>
	// 						<svg
	// 							xmlns='http://www.w3.org/2000/svg'
	// 							className='mx-auto mt-8 h-16 w-16 text-green-400'
	// 							viewBox='0 0 20 20'
	// 							fill='currentColor'
	// 						>
	// 							<path
	// 								fillRule='evenodd'
	// 								d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
	// 								clipRule='evenodd'
	// 							/>
	// 						</svg>
	// 					</div>
	// 					<h5 className='text-gray-900 text-xl font-medium mb-2 text-center'>
	// 						Good Job!
	// 					</h5>
	// 					<h5 className='text-center text-xl font-medium'>
	// 						Thank you {currentUser.displayName}!
	// 					</h5>
	// 					<h2 className='text-center text-xl font-medium'>
	// 						We are about to complete your register!
	// 					</h2>
	// 					<p className='text-gray-700 text-base mb-4 text-center'>
	// 						We have sent an message to your email to activate your account!
	// 					</p>
	// 					<a
	// 						className='inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-center text-green-100 shadow-md duration-75 hover:bg-green-400'
	// 						href='/home'
	// 					>
	// 						Continue
	// 					</a>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
};
