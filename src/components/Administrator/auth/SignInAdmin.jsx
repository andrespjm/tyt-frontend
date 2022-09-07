import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { adminExists, auth, getAdminInfo } from '../../../firebase/firebase';
import Page404 from '../../../pages/Page404';
import { FormSignInAdmin } from './forms/FormSignInAdmin';

export const SignInAdmin = () => {
	const { search } = useLocation();
	const secretkey = new URLSearchParams(search).get('secretkey');
	const [status, setStatus] = useState(0);
	const { setCurrentAdmin, login } = useAuth();
	const [error, setError] = useState('');
	const navigate = useHistory();

	useEffect(() => {
		if (secretkey !== '123') {
			setStatus(2);
		} else {
			setStatus(1);
			const unsuscribe = onAuthStateChanged(auth, handleOnStateChange);
			return () => unsuscribe;
		}
	}, [status]);
	const handleOnStateChange = async user => {
		if (user) {
			const isRegister = await adminExists(user.uid);
			if (isRegister) {
				const adminInfo = await getAdminInfo(user.uid);
				setCurrentAdmin(adminInfo);
				return navigate.push('/admin');
			}
			setCurrentAdmin({});
			return navigate.push('/home');
		}
	};

	const handleSubmit = async values => {
		const { email, password } = values;
		try {
			await login(email, password);
		} catch (err) {
			setError(err.code);
		}
	};

	if (status === 0)
		return (
			<div className='text-white text-md flex justify-center'>Loading...</div>
		);
	if (status === 1)
		return <FormSignInAdmin handleSubmit={handleSubmit} error={error} />;
	if (status === 2) return <Page404 />;
};
