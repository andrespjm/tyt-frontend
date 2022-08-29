import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
			// <div>
			// 	{/* <h1>Felicidades ya puedes ir al dashboard a crear tus links</h1> */}
			// 	{Swal.fire({
			// 		position: 'top-center',
			// 		icon: 'success',
			// 		title: 'Good Job!',
			// 		text: 'Your acount has been created successfully',
			// 		showConfirmButton: false,
			// 		timer: 1500,
			// 	})}
			// 	{navigate.push('/home')}
			// 	{/* <Link to='/home'>Continuar</Link> */}
			// </div>
			<div className='flex justify-center'>
				<div className='flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg'>
					<img
						className=' w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg'
						src='https://res.cloudinary.com/dyqwtxenu/image/upload/v1661740059/tyt/success_afsck3.jpg'
						alt
					/>
					<div className='p-6 flex flex-col justify-start'>
						<div className='flex justify-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='mx-auto mt-8 h-16 w-16 text-green-400'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						<h5 className='text-gray-900 text-xl font-medium mb-2'>
							Good Job!
						</h5>
						<h3>Thank you {currentUser.displayName}!</h3>
						<p className='text-gray-700 text-base mb-4'>
							Your account has been created successfully
						</p>
						<a
							className='inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400'
							href='/home'
						>
							Continue
						</a>
					</div>
				</div>
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
