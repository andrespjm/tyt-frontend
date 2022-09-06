/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUser, getData } from '../../redux/actions';
import { Loader } from './Loader';
import { Menu } from './Menu';
import { useAuth } from '../../context/AuthContext';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { signout } from '../../firebase/firebase';
import { cartLogout } from '../../helpers/carLogout';


export const DataAccount = (props) => {
  const {id} = useParams();
  const dispatch = useDispatch();
	const [cart, setCart] = useContext(ShoppingCartContext);
  const [idDelete, setIdDelete] = useState('');
	const [load, setLoad] = useState(false);
  const {redUser, redData, redPurchases} = useSelector(state => state); // eslint-disable-line no-unused-vars
	const { currentUserF } = useAuth();

  const deleteUser = (id) => {
    console.log(id)
		axios
			.put(`/users/deleteUser/${id}`, { data: { id } })
			.then(() => setLoad(false));
	};

  const toogleModal = () =>
		document.querySelector('#fav-modal').classList.toggle('hidden');

  const handleSignout = (id, cart, setCart) => {
    signout()
      .then(() => {
        cartLogout(id, cart, setCart);
        setIsLogged(true);
      })
      .catch(err => console.log(err.message))
      .finally(() => {
        window.location.reload();
      });
    };

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getData());
  }, [id])

	if (load) return <Loader />;

  return (
    <div className='h-auto bg-gradient-to-b from-black via-gray-700 to-base-900'>
      <Menu />
      <div className="container mx-auto h-auto text-white flex">
        <div className="flex w-1/4">
          <div className='mx-auto my-auto'>
            <img src={redData[0]?.img_home?.secure_url} alt='Image not found' className="w-56 h-56 rounded-lg object-cover"/>
          </div>
        </div>
        <div className="text-white w-2/4">
          <h2 className='font-bold'>Account information</h2>
          <hr />
          <br />
          <div className="inline-block">
            <span className="flex">Full Name: </span>
            <span className="flex">Email: </span>
            <span className="flex">Gender: </span>
            <span className="flex">Identity Card: </span>
            <span className="flex">Birthdate: </span>
          </div>
          <div className="inline-block pl-4">
            <span className="flex">{redUser?.displayName}</span>
            <span className="flex">{redUser?.email}</span>
            <span className="flex">{redUser.gender ? redUser.gender : ''}</span>
            <span className="flex">{redUser.identityCard ? redUser.identityCard : ''}</span>
            <span className="flex">{redUser.birthDate ? redUser?.birthDate?.substring(0, 10) : ''}</span>
          </div>
          <div className="inline-block float-right">
            <div className='inline-block text-center border-r-[1px]  pr-1'>
              <Link to={`/${id}/user/menu/account/changepass`} className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Change password
              </Link>
            </div>
            <div className='inline-block text-center pl-1'>
              <Link to={`/${id}/user/menu/account/edit`} className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Edit
              </Link>
            </div>
            <div className='mt-4'>
              <button
                className='float-right btn btn-red hover:btn-red w-36'
                onClick={() => {
                  setIdDelete(id);
                  toogleModal();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-1/4">
          <div className="mx-auto my-auto justify center">
            {currentUserF.profilePicture !== null ? (
              <>
                <img
                  className='inline-block w-56 h-56 mr-2 rounded-full ring-1 ring-white'
                  src={currentUserF.profilePicture}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      'https://doodleipsum.com/500/abstract';
                  }}
                  alt=''
                />
              </>
            ) : (
              <>
                <img src={redUser?.profilePicture} alt='Image user not found' className='w-56 h-56 rounded-lg'/>
              </>
            )}
          </div>
        </div>
      </div>
      <div id='fav-modal' className='hidden relative z-10'>
				<div className='fixed inset-0 bg-gray-800 bg-opacity-70 transition-opacity'></div>
				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<div className='relative transform overflow-hidden rounded-lg bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg'>
							<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
								<div className='sm:flex sm:items-start'>
									<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
										<svg
											className='h-6 w-6 text-red-600'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											aria-hidden='true'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z'
											/>
										</svg>
									</div>
									<div className='mt-3 sm:mt-0 sm:ml-4 sm:text-left'>
										<h3 className='text-lg text-center font-medium leading-6 text-gray-900'>
											Delete User
										</h3>
										<div className='mt-2'>
											<p className='text-sm text-gray-500'>
                        Are you sure you want to delete your account?
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
								<button
									onClick={() => {
										toogleModal();
										deleteUser(id, idDelete);
                    handleSignout(id, cart, setCart);
									}}
									type='button'
									className='mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
								>
									Delete
								</button>
								<button
									onClick={toogleModal}
									type='button'
									className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
  )
};

