import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { validateChangePassword } from '../../../validations/editProfileValidate';

export const ChangePassword = () => {
  const [spinner, setSpinner] = useState(true);
  return (
    <div className='container mx auto'>
      <div className='flex justify-center px-6 my-12'>
      <Formik
        initialValues={{
          password: '',
          c_password: '',
        }}
        validationSchema={validateChangePassword}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
          setSpinner(!spinner);
        }}
      >
        {({ errors }) => (
          <Form className='px-8 pt-6 pb-6 mb-4 bg-gray-100 rounded'>
            {/* /<div className='mb-4 md:flex md:justify-between'> */}
              <div className='mb-4 md:mr-2 md:mb-0'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='password'
                >
                  Password
                </label>
                <Field
                  className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Password'
                />
                <ErrorMessage
                  name='password'
                  component={() => (
                    <p className='text-xs italic mt-3 text-red-500'>
                      {errors.password}
                    </p>
                  )}
                />
              </div>
              <div className='mb-4 md:mr-2 md:mb-0'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='c_password'
                >
                  Confirm Password
                </label>
                <Field
                  className='w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='c_password'
                  name='c_password'
                  type='password'
                  placeholder='Confirm Password'
                />
                <ErrorMessage
                  name='c_password'
                  component={() => (
                    <p className='text-xs italic mt-3 text-red-500'>
                      {errors.c_password}
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
                Save
              </button>
            </div>
          </Form>
        )}
        </Formik>
      </div>
    </div>
  )
}