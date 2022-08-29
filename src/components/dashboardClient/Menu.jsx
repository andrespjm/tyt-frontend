import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../redux/actions';

export const Menu = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
  }, [id]);

  return (
    <>
      <div id='menu' className='container mx auto flex justify-center'>
        <ul className='flex justify-center'>
          <li>
            <Link to={`/${id}/user/menu/account`}>
              <button id='account' type='button' className='flex justify-center px-6 py-6 my-8 border-solid border-1 text-white'>
                My Account
              </button>
            </Link>
          </li>
          <li>
            <Link to={`/${id}/user/menu/orders`}>
              <button id='orders' className='flex justify-center px-6 py-6 my-8 border-solid border-1 text-white'>
                My Orders
              </button>
            </Link>
          </li>
          <li>
            <Link to={`/${id}/user/menu/favorites`}>
              <button id='favorites' className='flex justify-center px-6 py-6 my-8 border-solid border-1 text-white'>
                My Favorites
              </button>
            </Link>
          </li>
          <li>
            <Link to={`/${id}/user/menu/address`}>
              <button id='address' className='flex justify-center px-6 py-6 my-8 border-solid border-1 text-white'>
                Address Book
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
};