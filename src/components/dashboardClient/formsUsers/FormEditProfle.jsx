/* eslint-disable react/prop-types */
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getUser } from '../../../redux/actions';
import { validateUserEdit } from '../../../validations/editProfileValidate';
import { Menu } from '../Menu';

export const FormEditProfile = () => {
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { redUser } = useSelector(state => state);

	useEffect(() => {
		dispatch(getUser(id));
	}, [id]);

	return (
		<>
			<Menu />
			<div className='container mx-auto h-auto text-white flex'>
				<div className='w-1/4 flex'>
					<div className='mx-auto mt-28'>
						<svg
							className='h-56 w-56 text-white'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
							/>
						</svg>
					</div>
				</div>
				<div className='container w-4/6 h-auto text-white flex'>
					<Formik
						initialValues={{
							firstName: redUser.firstName,
							lastName: redUser.lastName,
							gender: redUser.gender ? redUser.gender : '',
							identityCard: redUser.identityCard ? redUser.identityCard : '',
							birthDate: redUser.birthDate
								? redUser?.birthDate?.substring(0, 10)
								: '',
						}}
						validationSchema={validateUserEdit}
						onSubmit={async (values, { resetForm }) => {
							const editUser = { ...values };
							editUser.displayName = `${editUser.firstName} ${editUser.lastName}`;
							try {
								await axios.put(`/users/user/${id}`, editUser);
								history.push(`/${id}/user/menu/account`);
							} catch (error) {
								console.log(error);
							}
						}}
					>
						{({ errors }) => (
							<Form className='w-11/12 pb-10'>
								<div className=''>
									<div className='flex justify-start'>
										<div className='w-2/3 mt-4'>
											<div>
												<label className='inline-block w-1/3 h-[43.2px] py-2 px-4 mt-4'>
													Email
												</label>
												<span className='inline-block font-bold py-2 px-4 mt-4'>
													{redUser?.email}
												</span>
											</div>
											<div>
												<label className='inline-block w-1/3 h-[43.2px] py-2 px-4 mt-4'>
													First Name*
												</label>
												<Field
													className='inline-block bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
													id='firstName'
													name='firstName'
													type='text'
												/>
												<ErrorMessage
													id='firstName'
													name='firstName'
													component={() => (
														<p className='ml-52 text-xs italic mt-1 text-red-500'>
															{errors.firstName}
														</p>
													)}
												/>
											</div>
											<div>
												<label className='inline-block w-1/3 h-[43.2px] py-2 px-4 mt-4'>
													Last Name*
												</label>
												<Field
													className='inline-block bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
													id='lastName'
													name='lastName'
													type='text'
												/>
												<ErrorMessage
													id='lastName'
													name='lastName'
													component={() => (
														<p className='ml-52 text-xs italic mt-1 text-red-500'>
															{errors.lastName}
														</p>
													)}
												/>
											</div>
											<div>
												<label className='inline-block w-1/3 h-[43.2px] py-2 px-4 mt-4'>
													Gender
												</label>
												<Field
													as='select'
													id='gender'
													name='gender'
													className='inline-block bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
												>
													<option hidden>Gender</option>
													<option value='Female'>Female</option>
													<option value='Male'>Male</option>
													<option value='Other'>Other</option>
												</Field>
												<ErrorMessage
													id='gender'
													name='gender'
													component={() => (
														<p className='ml-52 text-xs italic mt-1 text-red-500'>
															{errors.gender}
														</p>
													)}
												/>
											</div>
											<div>
												<label className='inline-block w-1/3 h-[43.2px] py-2 px-4 mt-4'>
													Identity card
												</label>
												<Field
													className='inline-block bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
													id='identityCard'
													name='identityCard'
													type='text'
												/>
												<ErrorMessage
													id='identityCard'
													name='identityCard'
													component={() => (
														<p className='ml-52 text-xs italic mt-1 text-red-500'>
															{errors.identityCard}
														</p>
													)}
												/>
											</div>
											<div>
												<label className='inline-block w-1/3 h-[43.2px] py-2 px-4 mt-4'>
													Birthdate
												</label>
												<Field
													className='inline-block bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
													id='birthDate'
													name='birthDate'
													type='date'
												/>
												<ErrorMessage
													id='birthDate'
													name='birthDate'
													component={() => (
														<p className='ml-52 text-xs italic mt-1 text-red-500'>
															{errors.birthDate}
														</p>
													)}
												/>
											</div>
										</div>
									</div>
									<div className='flex justify-start mt-8'>
										<div className='w-1/6 inline-block'>
											<Link to={`/${id}/user/menu/account`}>
												<button
													className='btn btn-red hover:btn-red w-32'
													value='Back'
												>
													Back
												</button>
											</Link>
										</div>
										<div className='w-1/6 inline-block'>
											<button
												type='submit'
												value='Save'
												className='btn btn-purple hover:btn-purple ml-20 w-32'
											>
												Save
											</button>
										</div>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};
