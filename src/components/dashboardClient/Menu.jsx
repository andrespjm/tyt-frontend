import { DataAccount } from './DataAccount';
import { DataOrders } from './DataOrders';
import { DataFavorites } from './DataFavorites';
import { DataAddress } from './DataAddress';
import Cards from './Cards';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions';

export const Menu = () => {
  const dispatch = useDispatch();
  const { redUser } = useSelector((state) => state);
  console.log(redUser);
  const[show, setShow] = useState({
    account: false,
    order: false,
    fav: false,
    address: false
  });
  const handleOnClickAccount = () => {
    setShow({
      account: true,
      order: false,
      fav: false,
      address: false
    });
	};

  const handleOnClickOrder = () => {
    setShow({
      account: false,
      order: true,
      fav: false,
      address: false
    });
	};

  const handleOnClickFav = () => {
    setShow({
      account: false,
      order: false,
      fav: true,
      address: false
    });
	};

  const handleOnClickAddress = () => {
    setShow({
      account: false,
      order: false,
      fav: false,
      address: true
    });
	};

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div className='container mx auto flex justify-center'>
        <ul className='flex justify-center'>
          <li>
            <button id='account' type='button' className='flex justify-center px-6 py-6 my-8 border-solid border-1' onClick={handleOnClickAccount}>
              My Account
            </button>
          </li>
          <li>
            <button id='orders' className='flex justify-center px-6 py-6 my-8 border-solid border-1' onClick={handleOnClickOrder}>
              My Orders
            </button>
          </li>
          <li>
            <button id='favorites' className='flex justify-center px-6 py-6 my-8 border-solid border-1' onClick={handleOnClickFav}>
              My Favorites
            </button>
          </li>
          <li>

            <button id='address' className='flex justify-center px-6 py-6 my-8 border-solid border-1' onClick={handleOnClickAddress}>
              Address Book
            </button>
          </li>
        </ul>
      </div>
      <div className="container mx auto h-14">
        {redUser?.length > 0 ? (
          <Cards redUser={redUser}/>
        ) : null}
      </div>
      <div>
        {show.account && <DataAccount />}
        {show.order && <DataOrders />}
        {show.fav && <DataFavorites />}
        {show.address && <DataAddress />}
      </div>
    </>
  )
};