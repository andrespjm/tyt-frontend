import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserOrder } from '../../redux/actions';
import { Menu } from './Menu';

export const DataOrders = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {redUser} = useSelector(state => state);
  console.log(redUser)

  useEffect(() => {
    dispatch(getUserOrder(id))
  }, [])
  return (
    <>
      <Menu />
      <div className="container mx-auto text-white">
        Orders for {id}
        <table>
          <tr>
            <th></th>
          </tr>
        </table>
      </div>
    </>
  )
};