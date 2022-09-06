import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Page404 from '../../../pages/Page404';
import { FormSignInAdmin } from './forms/FormSignInAdmin';

export const SignInAdmin = () => {
	const { search } = useLocation();
	const secretkey = new URLSearchParams(search).get('secretkey');
	const [status, setStatus] = useState(0);

	useEffect(() => {
		if (secretkey !== '123') {
			setStatus(2);
		} else {
			setStatus(1);
		}
	}, [status]);

	const handleSubmit = async () => {};

	if (status === 0)
		return (
			<div className='text-white text-md flex justify-center'>Loading...</div>
		);
	if (status === 1) return <FormSignInAdmin handleSubmit={handleSubmit} />;
	if (status === 2) return <Page404 />;
};
