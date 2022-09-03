import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteFavourite, getUserFavourites } from '../../redux/actions';
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
        {!!redUser?.Products?.length < 1
          ?<div>There are no Favourites</div>
          :
          <>
          {redUser?.Products?.map((e) => {
            return(
              <table className=' w-3/4 'style={{ border: '1px solid white', margin: '20px auto'}} key={e?.id}>
                <tr>
                  <th className='p-3'>Name</th>
                  <th className='p-3'>Description</th>
                  <th className='p-3'>Image</th>
                </tr>
                <tr>
                <td className='p-3'>{e?.name}</td>
                <td className='p-3'>{e?.description}</td>
                <td className='p-3  overflow-hidden'><img className='w-16 rounded-3xl object-cover' src={e?.img_home?.secure_url} alt={e?.name} /></td>
                <td className='p-3'><button onClick={() => dispatch(deleteFavourite(id, e?.id))}className='bg-red-600 p-2 rounded-lg hover:transform-cpu'>Delete</button></td>
                </tr>
              </table>
            );
          })}
          </>
        }
      </div>
    </>
  )
};