import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions';
import Cards from './Cards';

export const HomeUser = () => {
  const dispatch = useDispatch();
  const { redUser } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div className="container mx auto h-auto w-auto flex justify-center mt-3">
        <div className="flex justify-center">
          {redUser?.length > 0 ? (
            <Cards redUser={redUser}/>
          ) : null}
        </div>
      </div>
    </>
  )
}