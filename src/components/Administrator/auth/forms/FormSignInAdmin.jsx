import { ErrorMessage, Field, Form, Formik } from 'formik';
import { validationSignInSchema } from '../../../../helpers/validations.helper';

// eslint-disable-next-line react/prop-types
export const FormSignInAdmin = ({ handleSubmit, error }) => {
	return (
		<div>
			<div className='h-[calc(100vh-30px)] bg-purple-400 flex justify-center items-center'>
				<div className='absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block'></div>
				<div className='absolute w-40 h-40 rounded-xl bg-purple-300 bottom-10 -right-10 transform rotate-12 hidden md:block'></div>
				<div className='py-12 md:px-12 sm:px-3 bg-white rounded-2xl shadow-xl z-20'>
					<div className=''>
						<h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
							Welcome my dear Admin!
						</h1>
						{error && (
							<p className='w-full text-center text-sm mb-8 font-semibold text-red-400 tracking-wide cursor-pointer'>
								Wrong username or password
							</p>
						)}
					</div>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={validationSignInSchema}
						onSubmit={(values, { resetForm }) => {
							handleSubmit(values);
						}}
					>
						{({ errors }) => (
							<Form className='space-y-4'>
								<Field
									type='email'
									name='email'
									id='email'
									placeholder='Email Addres'
									className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
								/>
								<ErrorMessage
									name='email'
									component={() => (
										<p className='text-xs italic mt-3 text-red-500'>
											{errors.email}
										</p>
									)}
								/>
								<Field
									type='password'
									placeholder='Password'
									name='password'
									id='password'
									className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
								/>
								<ErrorMessage
									name='password'
									component={() => (
										<p className='text-xs italic mt-3 text-red-500'>
											{errors.password}
										</p>
									)}
								/>
								<div className='text-center mt-6'>
									<button
										type='submit'
										className='py-3 w-64 text-xl text-white bg-purple-400 hover:bg-purple-500 rounded-2xl'
									>
										Sign In
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div className='w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block' />
				<div className='w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block'></div>
			</div>
			;
		</div>
	);
};
