import { useContext, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getData } from '../../redux/actions';

export const Menu = () => {
  const dispatch = useDispatch();
  const { currentUserF } = useContext(AuthContext);
	const userId = currentUserF.id;

  console.log(currentUserF)

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <>
      <div id='menu' className='container mx auto flex justify-center'>
        <ul className='flex justify-center'>
          <li>
            <Link to={`/${userId}/user/menu/account`}>
              <button id='account' type='button' className='flex justify-center px-6 py-6 my-8 border-solid border-1 text-white hover:bg-gray-400 duration-1000'>
                My Account
              </button>
            </Link>
          </li>
          <li>
            <Link to={`/${userId}/user/menu/orders`}>
              <button id='orders' className='flex justify-center px-6 py-6 my-8 border-solid border-1 text-white hover:bg-gray-400 duration-1000'>
                My Orders
              </button>
            </Link>
          </li>
          <li>
            <Link to={`/${userId}/user/menu/favorites`}>
              <button id='favorites' className='flex justify-center px-6 py-6 my-8 border-solid border-1 text-white hover:bg-gray-400 duration-1000'>
                My Favorites
              </button>
            </Link>
          </li>
          <li>
            <Link to={`/${userId}/user/menu/address`}>
              <button id='address' className='flex justify-center px-6 py-6 my-8 border-solid border-1 text-white hover:bg-gray-400 duration-1000'>
                Address Book
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
};