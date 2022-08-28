import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateUser } from '../../../firebase/firebase';
import { AuthProvider } from '../../auth/AuthProvider';
import { FormUserProfile } from '../../auth/forms/FormUserProfile';

export const EditUserProfile = () => {
	const navigate = useHistory();
	const [stateCurrent, setCurrentState] = useState(0);
	const [currentUser, setCurrentUser] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [username, setUsername] = useState('');
	const handleUserLoggedIn = user => {
		navigate.push('/home');
	};

	const handleUserNotLoggedIn = () => {
		navigate.push('/login');
	};

	const handleUserNotRegister = user => {
		setCurrentUser(user);
		setCurrentState(3);
	};

	// const handleInputUsername = (e) => {
	//   setUsername(e.target.value);
	// };

	const handleContinue = async values => {
		currentUser.displayName = values.firstName + ' ' + values.lastName;
		const tmp = { ...currentUser, ...values };
		tmp.username = username;
		tmp.processCompleted = true;
		await updateUser(tmp);
		setCurrentState(6);
	};

	if (stateCurrent === 3 || stateCurrent === 5)
		return (
			<div className='bg-gray-100 w-2/4 mx-auto'>
				<h1 className='text-center text-2xl mt-2'>
					Bienvenido {currentUser.displayName}
				</h1>
				<p className='text-center my-3'>
					Para terminar el proceso elige un nombre de usuario
				</p>

				<FormUserProfile
					currentUser={currentUser}
					handleContinue={handleContinue}
				/>
			</div>
		);

	if (stateCurrent === 6)
		return (
			<div>
				{/* <h1>Felicidades ya puedes ir al dashboard a crear tus links</h1> */}
				{Swal.fire({
					position: 'top-center',
					icon: 'success',
					title: 'Good Job!',
					text: 'Your acount has been created successfully',
					showConfirmButton: false,
					timer: 1500,
				})}
				{navigate.push('/home')}
				{/* <Link to='/home'>Continuar</Link> */}
			</div>
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
