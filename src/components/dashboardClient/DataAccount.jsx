/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Menu } from './Menu';

export const DataAccount = (props) => {
  // const dispatch = useDispatch();
  const { id } = useParams();

  const { redUser } = useSelector(state => state);
  const { redData } = useSelector(state => state);
  console.log(redData)
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
          </div>
          <div className="inline-block pl-4">
            <span className="flex">{redUser.displayName}</span>
            <span className="flex">{redUser.email}</span>
            <span className="flex">{redUser.gender}</span>
            <span className="flex">{redUser.typeIdentityCard}{redUser.identityCard}</span>
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
        </div>
      </div>
    </>
  )
};