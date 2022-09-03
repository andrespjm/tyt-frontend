import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { getUserOrder } from '../../redux/actions';
import { Menu } from './Menu';

export const DataAddress = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {redUser} = useSelector(state => state);

  useEffect(() => {
    dispatch(getUserOrder(id));;
  }, [id])
  return (
    <>
      <Menu />
      <div className="container mx-auto text-white">
        <div className="flex justify center items center w-1/4 mt-16 ml-8">
        </div>
        <div className="text-white w-2/4">
          
        </div>
        {redUser?.Purchases?.length > 0 ? (
          <div>

          </div>
        ) : (
        <div>
          No hay dirección de envio
        </div>
        )}
      </div>
    </>
  )
};