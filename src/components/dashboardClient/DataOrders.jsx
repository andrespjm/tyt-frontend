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
        {!!redUser?.Purchases?.length < 1 
        ? <div>There are no orders</div>
        :
         <>
         
         {!!redUser?.Purchases?.length &&!redUser?.Purchases?.length > 0 ? <div>There are no orders</div>: redUser?.Purchases?.map((e, k) => {
           return (
             <div key={k}>
             <div >Order ID: {e?.id}</div>
             <div >Order Status: {e?.status}</div>
             {!!e?.OrderItems?.length > 0 && e?.OrderItems?.map((o, k) => {
               return (
                 <div key={k}>
                 <div >Quantity: {o?.quantity}</div>
                 <div>Price: {o?.price}</div>
                 <div>{o?.Stock?.Product?.name}</div>
                 <div><img style={{width: '50px'}} src={o?.Stock?.Product?.img_home?.secure_url}/></div>

                 </div>
               )
             })}
       </div>
           )
         }) }
         </>
       }
        
      </div>
    </>
  )
};