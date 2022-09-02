/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { signout } from '../../../firebase/firebase';
import { validateUser } from '../../../validations/editProfileValidate';
// eslint-disable-next-line react/prop-types
export const FormUserProfile = ({ currentUser, handleContinue }) => {
	// eslint-disable-next-line react/prop-types
	// console.log('hoooola', currentUser);
	// const firstName = arr[0];
	const arr = currentUser.displayName.split(' ');
	const firstName = arr[0];
	const lastName = arr[1];
	const [spinner, setSpinner] = useState(true);
	// console.log('firstName:', firstName);
	// const lastName = arr[1];
	// const navigate = useHistory();

	const handelCancel = () => {
		signout();
	};

	return (
		<div className='container mx auto'>
			<div className='flex justify-center'>
				<Formik
					initialValues={{
						firstName,
						lastName,
						gender: '',
						identityCard: '',
						birthDate: '',
					}}
					validationSchema={validateUser}
					onSubmit={(values, { resetForm }) => {
						resetForm();
						setSpinner(false);
						handleContinue(values);
						setTimeout(() => {
							setSpinner(true);
							window.location.reload();
						}, 1000);
					}}
				>
					{({ errors }) => (
						<Form className='px-8 pt-6 pb-6 mb-4 bg-gray-100 rounded'>
							<div className='flex justify-center mb-2' hidden={spinner}>
								<BeatLoader />
							</div>
							<div className='mb-2 md:flex md:justify-between'>
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
								<div className='mb-4 md:mr-2 md:mb-0'>
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
							<div>
								<p>
									<b>Email:</b>
								</p>
								<p className='py-4 px-3'>{currentUser.email}</p>
							</div>
							<div className='mb-4 md:mr-2 md:mb-0'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='gender'
								>
									Gender
								</label>
								{/* <Field
                  className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='gender'
                  name='gender'
                  type='text'
                  placeholder='Gender'
                /> */}
								<Field
									as='select'
									id='gender'
									name='gender'
									className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white'
									placeholder='Gender'
								>
									<option hidden>Gender</option>
									<option value='Female'>Female</option>
									<option value='Male'>Male</option>
									<option value='Other'>Other</option>
								</Field>
								<ErrorMessage
									name='gender'
									component={() => (
										<p className='text-xs italic mt-3 text-red-500'>
											{errors.gender}
										</p>
									)}
								/>
							</div>
							<div className='mb-4 md:flex'>
								<div className='w-full mb-4 md:mr-2 md:mb-0'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='identityCard'
									>
										Identity Card
									</label>
									<Field
										className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
										id='identityCard'
										name='identityCard'
										type='text'
										placeholder='Identity Card'
									/>
									<ErrorMessage
										name='identityCard'
										component={() => (
											<p className='text-xs italic mt-3 text-red-500'>
												{errors.identityCard}
											</p>
										)}
									/>
								</div>
								{/* <div className='mb-4 md:mr-2 md:mb-0'>
									<Field
										as='select'
										id='typeId'
										name='typeId'
										className='w-full mt-4 px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white'
									>
										<option hidden>Type</option>
										<option value='cc'>CC</option>
										<option value='ce'>CE</option>
										<option value='passport'>Passport</option>
									</Field>
									<ErrorMessage
										name='typeId'
										component={() => (
											<p className='text-xs italic mt-3 text-red-500'>
												{errors.typeId}
											</p>
										)}
									/>
								</div> */}
							</div>
							<div className='mb-4 md:mr-2 md:mb-0'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='birthDate'
								>
									Birthdate
								</label>
								<Field
									className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
									id='birthDate'
									name='birthDate'
									type='date'
								/>
								<ErrorMessage
									name='birthDate'
									component={() => (
										<p className='text-xs italic mt-3 text-red-500'>
											{errors.birthDate}
										</p>
									)}
								/>
							</div>
							{/* </div> */}
							<div className='mb-1 text-center w-full px-3 py-2'>
								<button
									className='w-full px-4 py-2 font-bold text-white rounded-full bg-violet-400 hover:bg-violet-500 focus:outline-none focus:shadow-outline'
									type='submit'
								>
									Save
								</button>
							</div>
							<div className='mb-1 text-center w-full px-3 py-2'>
								<button
									className='w-full px-4 py-2 font-bold text-white rounded-full bg-red-400 hover:bg-red-500 focus:outline-none focus:shadow-outline'
									type='button'
									onClick={handelCancel}
								>
									Cancel
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
