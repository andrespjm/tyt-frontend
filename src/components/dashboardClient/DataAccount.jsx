import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../redux/actions';

export const DataAccount = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id]);

  // console.log(dispatch(getUser(1)))
  return (
    <div className="container mx-auto">
      Hola
    </div>
  )
};