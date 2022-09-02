import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { auth } from '../../firebase/firebase';
import { cartSignIn } from '../../helpers/cartSignIn.js';
import { AuthProvider } from './AuthProvider';
import { FormLogin } from './forms/FormLogin';

export const SignIn = () => {
	const navigate = useHistory();
	const [stateCurrent, setCurrentState] = useState(0);
	const [cart, setCart] = useContext(ShoppingCartContext);
	let userId;
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

	const handleSignUpFirebase = async (email, password) => {
		try {
			const res = await createUserWithEmailAndPassword(email, password);
			return res.user;
		} catch (err) {
			console.error(err.message);
		}
	};

	const handleUserLoggedIn = user => {
		navigate.push('/home');
	};

	const handleUserNotLoggedIn = () => {
		setCurrentState(4);
	};

	const handleUserNotRegister = user => {
		navigate.push('/user/edit');
	};

	if (stateCurrent === 2) return <div>Estas autenticado y registrado</div>;
	if (stateCurrent === 3)
		return <div>Estas autenticado pero no registrado</div>;
	if (stateCurrent === 4)
		return (
			<FormLogin
				handleOnClickGoogle={handleOnClickGoogle}
				handleSignUpFirebase={handleSignUpFirebase}
			/>
		);
	if (stateCurrent === 5)
		return (
			<FormLogin
				handleOnClickGoogle={handleOnClickGoogle}
				handleSignUpFirebase={handleSignUpFirebase}
			/>
		);

	return (
		<AuthProvider
			onUserLoggedIn={handleUserLoggedIn}
			onUserNotRegister={handleUserNotRegister}
			onUserNotLoggedIn={handleUserNotLoggedIn}
		>
			<div>Loading...</div>
		</AuthProvider>
	);
};
