import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { validateResetPassword } from '../../../validations/editProfileValidate';

export const ChangePassword = () => {
	const [message, setMessage] = useState('');
	const { resetPassword } = useAuth();
	const handleResetPassword = async email => {
		try {
			await resetPassword(email);
			setMessage(
				'A message has been sent to your email to change your password'
			);
		} catch (error) {
			setMessage(error.code);
		}
	};
	return (
		<div className='container mx auto'>
			<div className='flex justify-center px-6 my-12'>
				<Formik
					initialValues={{
						email: '',
					}}
					validationSchema={validateResetPassword}
					onSubmit={(values, { resetForm }) => {
						handleResetPassword(values.email);
						resetForm();
					}}
				>
					{({ errors }) => (
						<Form className='px-8 pt-6 pb-6 mb-4 bg-gray-100 rounded'>
							{message && (
								<div className='w-3/4 text-center text-green-600 font-bold mx-auto'>
									{message}
								</div>
							)}
							{/* /<div className='mb-4 md:flex md:justify-between'> */}
							<div className='mb-4 md:mr-2 md:mb-0'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='email'
								>
									Email
								</label>
								<Field
									className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									id='email'
									name='email'
									type='email'
									placeholder='Email'
								/>
								<ErrorMessage
									name='email'
									component={() => (
										<p className='text-xs italic mt-3 text-red-500'>
											{errors.email}
										</p>
									)}
								/>
							</div>
							{/* </div> */}
							<div className='mb-6 text-center w-full px-3 py-3'>
								<button
									className='w-full px-4 py-2 font-bold text-white rounded-full bg-violet-400 hover:bg-violet-500 focus:outline-none focus:shadow-outline'
									type='submit'
								>
									Send
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
