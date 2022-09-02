import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserFavourites } from '../../redux/actions';
import { Menu } from './Menu';

export const DataFavorites = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {redUser} = useSelector(state => state);
  console.log(redUser)

  useEffect(() => {
    dispatch(getUserFavourites(id));
  }, [])
  return (
    <>
      <Menu />
      <div className="container mx-auto text-white">
        {!!redUser?.length < 1
          ?<div>There are no Favourites</div>
          :
          <>
          {redUser?.map((e) => {
            return(
              <div key={e?.id}>
                <span>{e?.name}</span>
                <span>{e?.description}</span>
                <img src={e?.img_home?.secure_url} alt={e?.name} />
              </div>
            );
          })}
          </>
        }
      </div>
    </>
  )
};