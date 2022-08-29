/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { Menu } from './Menu';
import { getUser } from '../../redux/actions';

export const DataAccount = (props) => {
  // const { displayName } = props;
  const dispatch = useDispatch();
  const { id } = useParams();

  const { redUser } = useSelector(state => state);
  console.log(redUser);

  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id]);

  // console.log(dispatch(getUser(1)))
  return (
    <>
      <Menu />
      <div className="container mx-auto h-auto text-white flex">
        <div className="mx auto text-white flex w-1/4">
          Imagen
        </div>
        <div className="mx auto text-white w-3/4">
          <h3 className="flex">Account information</h3>
          <hr />
          <br />
          <span className="flex">{redUser.displayName}</span>
          <span className="flex">{redUser.email}</span>
        </div>
      </div>
    </>
  )
};