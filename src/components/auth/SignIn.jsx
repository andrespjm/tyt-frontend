import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { AuthProvider } from './AuthProvider';
import { FormLogin } from './forms/FormLogin';

export const SignIn = () => {
	const navigate = useHistory();
	const [stateCurrent, setCurrentState] = useState(0);

	const handleOnClick = async () => {
		const gooogleProvider = new GoogleAuthProvider();
		await signInWithGoogle(gooogleProvider);

		async function signInWithGoogle(gooogleProvider) {
			try {
				const res = await signInWithPopup(auth, gooogleProvider);
				console.log(res);
			} catch (err) {
				console.error(err);
			}
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
