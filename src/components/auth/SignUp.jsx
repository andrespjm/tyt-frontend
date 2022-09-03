import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerNewUser } from '../../firebase/firebase';
import { FormSignUp } from './forms/FormSignUp';

export const SignUp = () => {
	const { signup } = useAuth();
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState('');
	const navigate = useHistory();

	const handleSubmit = async values => {
		setError('');
		const displayName = values.firstName + ' ' + values.lastName;
		try {
			const res = await signup(values.email, values.password);
			const user = res.user;
			await registerNewUser({
				id: user.uid,
				displayName,
				firstName: values.firstName,
				lastName: values.lastName,
				email: user.email,
				profilePicture: user.profileImageURL || user.photoURL,
				processCompleted: false,
				processFirebase: true,
			});
			navigate.push('/user/edit');
		} catch (error) {
			if (error.code === 'auth/email-already-in-use')
				setError('Email already in use');
		}
	};

	return <FormSignUp handleSubmit={handleSubmit} error={error} />;
};
