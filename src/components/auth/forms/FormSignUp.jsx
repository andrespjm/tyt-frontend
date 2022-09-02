/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { validationSignUpSchema } from '../../../helpers/validations.helper';
// eslint-disable-next-line react/prop-types
export const FormSignUp = ({ handleSubmit, error }) => {
	const [spinner, setSpinner] = useState(true);
	const [message, setMessage] = useState(true);
	return (
		<div className='container mx-auto'>
			<div className='flex justify-center px-6 my-12'>
				{/* Row */}
				<div className='w-full xl:w-3/4 lg:w-11/12 flex'>
					{/* Col */}
					<div
						className='w-full  h-auto bg-gray-400 hidden lg:block lg:w-7/12 bg-cover rounded-l-lg'
						style={{
							backgroundImage: 'url("https://i.ibb.co/Qv8SSPP/AXEF1454.jpg")',
						}}
					/>
					{/* Col */}
					<div className='w-full lg:w-7/12 bg-gray-100 pb-4 rounded-lg lg:rounded-l-none min-h-12'>
						<h3 className='pt-4 text-2xl text-center'>Create an Account!</h3>
						<div className='flex justify-center p-1' hidden={spinner}>
							<BeatLoader />
						</div>
						{/* Form */}
						<Formik
							initialValues={{
								firstName: '',
								lastName: '',
								email: '',
								password: '',
								c_password: '',
							}}
							validationSchema={validationSignUpSchema}
							onSubmit={(values, { resetForm }) => {
								// if (!error) return resetForm();
								setSpinner(false);
								setTimeout(() => {
									handleSubmit(values);
									resetForm();
									setSpinner(true);
									setMessage(false);
								}, 1000);
							}}
						>
							{({ errors }) => (
								<Form className='px-8 pt-6 pb-6 mb-4 bg-gray-100 rounded'>
									<div className='mb-4 md:flex md:justify-between'>
										<div className='mb-4 md:mr-2 md:mb-0'>
											<label
												className='block mb-2 text-sm font-bold text-gray-700'
												htmlFor='firstName'
											>
												First Name
											</label>
											<Field
												className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
												id='firstName'
												name='firstName'
												type='text'
												placeholder='First Name'
											/>
											<ErrorMessage
												name='firstName'
												component={() => (
													<p className='text-xs italic mt-3 text-red-500'>
														{errors.firstName}
													</p>
												)}
											/>
										</div>
										<div className='md:ml-2'>
											<label
												className='block mb-2 text-sm font-bold text-gray-700'
												htmlFor='lastName'
											>
												Last Name
											</label>
											<Field
												className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
												id='lastName'
												name='lastName'
												type='text'
												placeholder='Last Name'
											/>
											<ErrorMessage
												name='lastName'
												component={() => (
													<p className='text-xs italic mt-3 text-red-500'>
														{errors.lastName}
													</p>
												)}
											/>
										</div>
									</div>
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
										{error && (
											<p className='text-xs italic p-2 text-red-500'>{error}</p>
										)}
										<ErrorMessage
											name='email'
											component={() => (
												<p className='text-xs italic p-2 text-red-500'>
													{errors.email}
												</p>
											)}
										/>
									</div>
									<div className='mb-4 md:flex md:justify-between'>
										<div className='mb-4 md:mr-2 md:mb-0'>
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
										<div className='md:ml-2'>
											<label
												className='block mb-2 text-sm font-bold text-gray-700'
												htmlFor='c_password'
											>
												Confirm Password
											</label>
											<Field
												className='w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
												id='c_password'
												name='c_password'
												type='password'
												placeholder='******************'
											/>
											<ErrorMessage
												name='c_password'
												component={() => (
													<p className='text-xs italic text-red-500 max-w-xs'>
														{errors.c_password}
													</p>
												)}
											/>
										</div>
									</div>
									<div className='mb-6 text-center'>
										<button
											className='w-full px-4 py-2 font-bold text-white rounded-full bg-violet-400 hover:bg-violet-500 focus:outline-none focus:shadow-outline'
											type='submit'
										>
											Register Account
										</button>
										<p
											className='text-md italic mt-2 p-2 text-lime-700'
											hidden={message}
										>
											User created successfully
										</p>
									</div>
									<hr className='mb-6 border-t' />
									<div className='text-center'>
										<a
											className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
											href='#'
										>
											Forgot Password?
										</a>
									</div>
									<div className='text-center'>
										<Link
											className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
											to='/signin'
										>
											Already have an account? Login!
										</Link>
									</div>
								</Form>
							)}
						</Formik>
						{/* End Form */}
					</div>
				</div>
			</div>
		</div>
	);
};
