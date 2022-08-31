/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useContext } from 'react';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from './Menu';
import { AuthContext } from '../../context/AuthContext';

export const DataAccount = (props) => {
  // const dispatch = useDispatch();
	const { currentUserF } = useContext(AuthContext);
	const userId = currentUserF.id;

  // const { redUser } = useSelector(state => state);
  const { redData } = useSelector(state => state);

  return (
    <>
      <Menu />
      <div className="container mx-auto h-auto text-white flex">
        <div className="flex justify center items center w-1/4 mt-16 ml-8">
          <img src={redData[0].img_home.secure_url} alt='Image not found' className="w-56 h-56 rounded-lg"/>
        </div>
        <div className="text-white w-2/4">
          <h3>Account information</h3>
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
            <span className="flex">{currentUserF.displayName}</span>
            <span className="flex">{currentUserF.email}</span>
            <span className="flex">{currentUserF.gender}</span>
            <span className="flex">{currentUserF.identityCard}</span>
            <span className="flex">{currentUserF.birthDate.substring(0, 10)}</span>
          </div>
          <div className="inline-block float-right">
            <div className='inline-block text-center border-r-[1px]  pr-1'>
              <Link to={`/${userId}/user/menu/account/changepass`} className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Change password
              </Link>
            </div>
            {/* <hr className='h-[55vh] w-[.5vw] border-0' /> */}
            <div className='inline-block text-center pl-1'>
              <Link to={`/${userId}/user/menu/account/edit`} className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className="text-white w-1/4 flex">
          <div className="mx-auto justify center">
            {Object.entries(currentUserF).length !== 0 ? (
              <>
                <img
                  className='inline-block h-7 w-7 mr-2 rounded-full ring-1 ring-white'
                  src={currentUserF.profilePicture}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      'https://doodleipsum.com/500/abstract';
                  }}
                  alt=''
                />
                {currentUserF.firstName}
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