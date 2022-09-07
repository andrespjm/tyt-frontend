/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { validateResetPassword } from '../../../validations/editProfileValidate';
import { getUser } from '../../../redux/actions';

import { DataAccount } from '../DataAccount';

export const FormEditPassword = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
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
		} finally {
      window.location.reload();
    }
	};

  useEffect(() => {
    dispatch(getUser(id));
  }, [id])

  return (
    <>
    <DataAccount />
    <div className="container mx-auto h-auto text-white flex justify-center">
      {/* <div className="w-1/4 flex">
        <div className="mx-auto mt-28">
          <svg className="h-56 w-56 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </div>
      </div> */}
      <div className="w-2/4 h-auto text-white">
      <h2 className='font-bold'>Reset password by email</h2>
      <hr />
      <br />
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validateResetPassword}
        onSubmit={(values, { resetForm }) => {
          handleResetPassword(values.email);
          resetForm();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }}
      >
        {({ errors }) => (
          <Form className='pb-10 mx-auto'>
            {message && (
              <div className='w-3/4 text-center text-green-600 font-bold mx-auto'>
                {message}
              </div>
            )}
            <div className='mt-6 ml-6'>
              <div className='flex justify-start'>
                <div className='w-1/8 inline-block mt-4'>
                  <label className='flex h-[43.2px] py-2 px-4 mt-4'>Email*</label>
                </div>
                <div className='w-2/5 inline-block mt-4'>
                  <Field
                    className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-4'
                    id='email'
                    name='email'
                    type='email'
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
              </div>
                <div className='flex justify-start mt-8 ml-24'>
                  <div className='w-1/6 inline-block'>
                    <Link to={`/${id}/user/menu/account`}>
                      <button
                        className='btn btn-red hover:btn-red w-28'
                        value='Back'
                      >
                        Cancel
                      </button>
                    </Link>
                  </div>
                  <div className='w-1/6 inline-block ml-6'>
                    <button
                      className='btn btn-purple hover:btn-purple w-28'
                      type='submit'
                    >
                      Send
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
}