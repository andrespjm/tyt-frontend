import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { AuthProvider } from './AuthProvider';
import { FormLogin } from './forms/FormLogin';
import { cartSignIn } from '../../helpers/cartSignIn.js';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';

export const SignIn = () => {
	const navigate = useHistory();
	const [stateCurrent, setCurrentState] = useState(0);
	const [cart, setCart] = useContext(ShoppingCartContext);
	let userId;
	const handleOnClick = async () => {
		const gooogleProvider = new GoogleAuthProvider();
		await signInWithGoogle(gooogleProvider);
		async function signInWithGoogle(gooogleProvider) {
			try {
				const res = await signInWithPopup(auth, gooogleProvider);
				userId = res.user.uid;
			} catch (err) {
				console.error(err);
			}
			await cartSignIn(userId, cart, setCart);
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
	if (stateCurrent === 4) return <FormLogin handleOnClick={handleOnClick} />;
	if (stateCurrent === 5) return <FormLogin handleOnClick={handleOnClick} />;

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
