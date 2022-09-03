/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { validationSignInSchema } from '../../../helpers/validations.helper';
export const FormLogin = ({
	handleSignInFirebase,
	handleSignInGoogle,
	handleSignInFacebook,
	error,
}) => {
	const [spinner, setSpinner] = useState(true);
	return (
		<div className='container mx-auto'>
			<div className='flex justify-center px-6 my-12'>
				{/* Row */}
				<div className='w-full xl:w-3/4 lg:w-11/12 flex shadow-md'>
					{/* Col */}
					<div className='w-full lg:w-7/12 bg-gray-100 p-4 rounded-lg lg:rounded-r-none min-h-12'>
						<h3 className='pt-4 text-2xl text-center'>Welcome back!</h3>
						<p className='text-gray-400 text-center'>
							Please enter your details
						</p>

						<div className='flex justify-center py-3' hidden={spinner}>
							<BeatLoader />
						</div>

						{error && (
							<p className='text-sm italic mt-2 p-2 w-3/4 m-auto text-white text-center rounded-lg bg-red-500'>
								{error}
							</p>
						)}
						<Formik
							initialValues={{
								email: '',
								password: '',
							}}
							validationSchema={validationSignInSchema}
							onSubmit={(values, { resetForm }) => {
								setSpinner(false);
								handleSignInFirebase(values.email, values.password);
								// resetForm();
								setTimeout(() => {
									setSpinner(true);
								}, 3000);
							}}
						>
							{({ errors }) => (
								<Form className='px-8 pt-6 pb-6 mb-4 bg-gray-100 rounded'>
									<div className='mb-4'>
										<label
											className='block mb-2 text-sm font-bold text-gray-700'
											htmlFor='email'
										>
											Email
										</label>
										<Field
											className='w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
											id='email'
											name='email'
											type='email'
											placeholder='Email'
										/>
										<ErrorMessage
											name='email'
											component={() => (
												<p className='text-xs italic p-2 text-red-500'>
													{errors.email}
												</p>
											)}
										/>
									</div>
									<div className='mb-4'>
										<label
											className='block mb-2 text-sm font-bold text-gray-700'
											htmlFor='password'
										>
											Password
										</label>
										<Field
											className='w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
											id='password'
											name='password'
											type='password'
											placeholder='******************'
										/>
										<ErrorMessage
											name='password'
											component={() => (
												<p className='text-xs italic text-red-500 max-w-xs'>
													{errors.password}
												</p>
											)}
										/>
									</div>
									<div className='mb-6 text-center'>
										<button
											className='w-full px-4 py-2 font-bold text-white bg-violet-400 rounded-full hover:bg-violet-500 focus:outline-none focus:shadow-outline'
											type='submit'
										>
											Sign in
										</button>

										{/* https://www.facebook.com/images/fb_icon_325x325.png */}
										<button
											type='button'
											onClick={handleSignInGoogle}
											className='flex flex-wrap justify-center w-full my-2 border border-gray-300 hover:bg-gray-200 px-2 py-1.5 rounded-full'
										>
											<img
												className='w-5 mr-2'
												src='https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'
											/>
											Sign in with Google
										</button>
										<button
											type='button'
											onClick={handleSignInFacebook}
											className='flex flex-wrap justify-center w-full my-2 border border-gray-300 hover:bg-gray-200 px-2 py-1.5 rounded-full'
										>
											<img
												className='w-5 mr-2'
												src='https://www.facebook.com/images/fb_icon_325x325.png'
											/>
											Sign in with Facebook
										</button>
									</div>
									<hr className='mb-6 border-t' />
									<div className='text-center'>
										<Link
											to={'/user/changepassword'}
											className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
											href='#'
										>
											Forgot Password?
										</Link>
									</div>
									<div className='text-center'>
										<Link
											className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
											to='/signup'
										>
											Do not have account? Sign up!
										</Link>
									</div>
								</Form>
							)}
						</Formik>
					</div>
					{/* Col */}
					<div
						className='w-full  h-auto bg-gray-400 hidden lg:block lg:w-7/12 bg-cover rounded-r-lg'
						style={{
							backgroundImage: 'url("https://i.ibb.co/Qv8SSPP/AXEF1454.jpg")',
						}}
					></div>
				</div>
			</div>
		</div>
	);
};
