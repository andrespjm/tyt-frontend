/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import { validateUser } from '../../../validations/editProfileValidate';
import { getUser } from '../../../redux/actions';

export const FormEditProfile = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const {redUser} = useSelector(state => state);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id])


  return (
    <div className="container mx-auto h-auto text-white flex">
      <Formik
        initialValues={{
          firstName: redUser.firstName,
          lastName: redUser.lastName,
          profilePicture: '',
          gender: redUser.gender.lenght > 0 ? redUser.gender : '',
          identityCard: redUser.identityCard.lenght > 0 ? redUser.identityCard : '',
          birthDate: redUser.birthDate.lenght > 0 ? redUser.birthDate : '',
        }}
        validationSchema={validateUser}
        onSubmit={(values, { resetForm }) => {
          resetForm();
        }}
      >
        {({ errors }) => (
          <Form className='py-10 mx-auto'>
            <div className=''>
              <div className='flex w-auto justify-center'>
                <div className='w-1/8 inline-block mt-4'>
                  <label className='flex h-[43.2px] py-2 px-4 mt-1'>Email</label>
                  <label className='flex h-[43.2px] py-2 px-4 mt-1'>First Name*</label>
                  <label className='flex h-[43.2px] py-2 px-4 mt-1'>Last Name*</label>
                  <label className='flex h-[43.2px] py-2 px-4 mt-1'>Profile image</label>
                  <label className='flex h-[43.2px] py-2 px-4 mt-1'>Gender</label>
                  <label className='flex h-[43.2px] py-2 px-4 mt-1'>Identity card</label>
                  <label className='flex h-[43.2px] py-2 px-4 mt-1'>Birthdate</label>
                </div>
                <div className='w-2/6 inline-block mt-4'>
                  <span className="flex font-bold py-2 px-4 mt-1">{redUser?.email}</span>
                  <Field
                    className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
                    id='firstName'
                    name='firstName'
                    type='text'
                  />
                  <ErrorMessage
                    name='firstName'
                    component={() => (
                      <p className='text-xs italic mt-3 text-red-500'>
                        {errors.firstName}
                      </p>
                    )}
                  />
                  <Field
                    className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
                    id='lastName'
                    name='lastName'
                    type='text'
                  />
                  <ErrorMessage
                    name='lastName'
                    component={() => (
                      <p className='text-xs italic mt-3 text-red-500'>
                        {errors.lastName}
                      </p>
                    )}
                  />
                  <label
                    htmlFor='imageMain'
                    className='btn btn-purple cursor-pointer hover:bg-neutral-200 select-none'
                  >
                    Choose your cover image (PNG, JPG)
                  </label>
                  <Field
                    className='hidden py-2 px-4 mt-1'
                    id='profilePicture'
                    name='profilePicture'
                    type='file'
                    accept='.jpg, .jpeg, .png'
                  />
                  <Field
                    as='select'
                    id='gender'
                    name='gender'
                    className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
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
                  <Field
                    className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
                    id='identityCard'
                    name='identityCard'
                    type='text'
                  />
                  <ErrorMessage
                    name='identityCard'
                    component={() => (
                      <p className='text-xs italic mt-3 text-red-500'>
                        {errors.identityCard}
                      </p>
                    )}
                  />
                  <Field
                    className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
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
              </div>
              <div className=''>
                <button
                type='submit'
                value='Add product'
                className='btn btn-purple hover:btn-purple'>
                Save
              </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
};