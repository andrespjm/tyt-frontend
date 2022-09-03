/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUser, getUserOrder, getData } from '../../redux/actions';
import { Menu } from './Menu';
import { useAuth } from '../../context/AuthContext';


export const DataAccount = (props) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {redUser} = useSelector(state => state);
  const { user } = useAuth();
	const { redData } = useSelector(state => state);

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getUserOrder(id));
    dispatch(getData());
  }, [id])
  return (
    <>
      <Menu />
      <div className="container mx-auto h-auto text-white flex">
        <div className="flex justify center items center w-1/4 mt-16 ml-8">
          <img src={redData[0]?.img_home?.secure_url} alt='Image not found' className="w-56 h-56 rounded-lg"/>
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
            <span className="flex">{redUser?.gender}</span>
            <span className="flex">{redUser?.identityCard}</span>
            <span className="flex">{redUser?.birthDate?.substring(0, 10)}</span>
          </div>
          <div className="inline-block float-right">
            <div className='inline-block text-center border-r-[1px]  pr-1'>
              <Link to={`/${id}/user/menu/account/changepass`} className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Change password
              </Link>
            </div>
            {/* <hr className='h-[55vh] w-[.5vw] border-0' /> */}
            <div className='inline-block text-center pl-1'>
              <Link to={`/${id}/user/menu/account/edit`} className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Edit
              </Link>
            </div>
          </div>
          <br />
          <br />
          <h2 className='font-bold'>Shipping address</h2>
          <hr />
          <br />
          {redUser?.Purchases?.length > 0 ? (
            <>
              <span className="flex font-medium">Last purchase address</span>
              <br />
              <div className="inline-block">
                <span className="flex">Address: </span>
                <span className="flex">Postal code: </span>
                <span className="flex">Phone Number: </span>
              </div>
              <div className="inline-block pl-4">
                  <span className="flex">{redUser?.Purchases[0]?.shippingAddressStreet} #{redUser?.Purchases[0]?.shippingAddressNumber}</span>
                  <span className="flex">{redUser?.Purchases[0]?.postalCode}</span>
                  <span className="flex">{redUser?.Purchases[0]?.phoneNumber}</span>
              </div>
            </>
          ):(
            <div>
              No hay dirección de envio
            </div>
          )}
        </div>
        <div className="text-white w-1/4 flex">
          <div className="mx-auto my-auto justify center">
            {Object.entries(user).length !== 0 ? (
              <>
                <img
                  className='inline-block h-7 w-7 mr-2 rounded-full ring-1 ring-white'
                  src={user.profilePicture}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      'https://doodleipsum.com/500/abstract';
                  }}
                  alt=''
                />
                {user.firstName}
              </>
            ) : (
              <>
                <i className='flex text-9xl mr-3 fa-solid fa-circle-user'></i>
                <span className='flex'>Profile picture</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
};

