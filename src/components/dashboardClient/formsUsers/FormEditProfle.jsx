/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { validateUserEdit } from '../../../validations/editProfileValidate';
import { getUser, updateUserP } from '../../../redux/actions';
import { Menu } from '../Menu';

export const FormEditProfile = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const {redUser} = useSelector(state => state);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id])

  return (
    <>
    <Menu />
    <div className="container mx-auto h-auto text-white flex">
      <div className="w-1/4 flex">
        <div className="mx-auto mt-28">
          <svg className="h-56 w-56 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </div>
      </div>
      <div className="container w-4/6 h-auto text-white flex">
        <Formik
          initialValues={{
            firstName: redUser.firstName,
            lastName: redUser.lastName,
            profilePicture: '',
            gender: redUser.gender ? redUser.gender : '',
            identityCard: redUser.identityCard ? redUser.identityCard : '',
            birthDate: redUser.birthDate ? redUser.birthDate : '',
          }}
          validationSchema={validateUserEdit}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateUserP(values);
            resetForm();
          }}
        >
          {({ errors }) => (
            <Form className='pb-10'>
              <div className=''>
                <div className='flex justify-start'>
                  <div className='w-1/5 inline-block mt-4'>
                    <label className='flex h-[43.2px] py-2 px-4 mt-4'>Email</label>
                    <label className='flex h-[43.2px] py-2 px-4 mt-4'>First Name*</label>
                    <div
                      className={`text-red-500 text-xs mt-1${
                        errors.firstName ? 'hidden' : 'hidden'
                      }`}
                    >
                      {errors.firstName}
                    </div>
                    <label className='flex h-[43.2px] py-2 px-4 mt-4'>Last Name*</label>
                    <div
                      className={`text-red-500 text-xs mt-1${
                        errors.lasttName ? 'hidden' : 'hidden'
                      }`}
                    >
                      {errors.lastName}
                    </div>
                    <label className='flex h-[43.2px] py-2 px-4 mt-4'>Profile image</label>
                    <label className='flex h-[43.2px] py-2 px-4 mt-4'>Gender</label>
                    <div
                      className={`text-red-500 text-xs mt-1${
                        errors.gender ? 'hidden' : 'hidden'
                      }`}
                    >
                      {errors.gender}
                    </div>
                    <label className='flex h-[43.2px] py-2 px-4 mt-4'>Identity card</label>
                    <div
                      className={`text-red-500 text-xs mt-1${
                        errors.identityCard ? 'hidden' : 'hidden'
                      }`}
                    >
                      {errors.identityCard}
                    </div>
                    <label className='flex h-[43.2px] py-2 px-4 mt-4'>Birthdate</label>
                    <div
                      className={`text-red-500 text-xs mt-1${
                        errors.birthDate ? 'hidden' : 'hidden'
                      }`}
                    >
                      {errors.birthDate}
                    </div>
                  </div>
                  <div className='w-2/5 inline-block mt-4'>
                    <span className="flex font-bold py-2 px-4 mt-4">{redUser?.email}</span>
                    <Field
                      className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
                      id='firstName'
                      name='firstName'
                      type='text'
                    />
                    <ErrorMessage
                      id='firstName'
                      name='firstName'
                      component={() => (
                        <p className='text-xs italic mt-1 text-red-500'>
                          {errors.firstName}
                        </p>
                      )}
                    />
                    <Field
                      className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
                      id='lastName'
                      name='lastName'
                      type='text'
                    />
                    <ErrorMessage
                      id='lastName'
                      name='lastName'
                      component={() => (
                        <p className='text-xs italic mt-1 text-red-500'>
                          {errors.lastName}
                        </p>
                      )}
                    />
                    <label
                      htmlFor='imageMain'
                      className='btn btn-purple cursor-pointer hover:bg-neutral-200 select-none mt-4 h-[43.2px]'
                    >
                      Choose your profile image (PNG, JPG)
                    </label>
                    <Field
                      className='hidden py-2 px-4 mt-4'
                      id='profilePicture'
                      name='profilePicture'
                      type='file'
                      accept='.jpg, .jpeg, .png'
                    />
                    <Field
                      as='select'
                      id='gender'
                      name='gender'
                      className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
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
                        <p className='text-xs italic mt-1 text-red-500'>
                          {errors.gender}
                        </p>
                      )}
                    />
                    <Field
                      className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
                      id='identityCard'
                      name='identityCard'
                      type='text'
                    />
                    <ErrorMessage
                      id='identityCard'
                      name='identityCard'
                      component={() => (
                        <p className='text-xs italic mt-1 text-red-500'>
                          {errors.identityCard}
                        </p>
                      )}
                    />
                    <Field
                      className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
                      id='birthDate'
                      name='birthDate'
                      type='date'
                    />
                    <ErrorMessage
                      id='birthDate'
                      name='birthDate'
                      component={() => (
                        <p className='text-xs italic mt-1 text-red-500'>
                          {errors.birthDate}
                        </p>
                      )}
                    />
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
                      className='btn btn-purple hover:btn-purple'>
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
  )
};