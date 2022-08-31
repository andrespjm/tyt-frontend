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

        <table>
          <tr>
            <th>Order Id</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Name</th>
          </tr>
            {!!redUser?.Purchases?.length &&!redUser?.Purchases?.length > 0 ? <div>There are no orders</div>: redUser?.Purchases?.map((e, k) => {
              return (
                <tr key={k}>
                <td >{e?.id}</td>
                <td >{e?.status}</td>
                {!!e?.OrderItems?.length > 0 && e?.OrderItems?.map((o, k) => {
                  return (
                    <div key={k}>
                    <td >{o?.quantity}</td>
                    <td>{o?.price}</td>
                    <td>{o?.Stock?.Product?.name}</td>
                    <td><img style={{width: '50px'}} src={o?.Stock?.Product?.img_home?.secure_url}/></td>

                    </div>
                  )
                })}
          </tr>
              )
            }) }
        </table>
      </div>
    </>
  )
};