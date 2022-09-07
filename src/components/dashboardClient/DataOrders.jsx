import './DataOrders.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserOrder } from '../../redux/actions';
import { Menu } from './Menu';
import Stars from './Stars';
export const DataOrders = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { redUser } = useSelector(state => state);

	useEffect(() => {
		dispatch(getUserOrder(id));
	}, []);

	return (
		<div className='h-screen bg-gradient-to-b from-black via-gray-700 to-base-900'>
			<Menu />
			<div className=' text-white' style={{ width: '90vw', margin: '5px auto' }}>
				<div className='text-5xl border-b border-blue-300 p-2 pb-5' >
					<i className="bi bi-bag-fill px-1 text-yellow-400"></i>
					My Orders!
				</div>
				{!!redUser?.Purchases?.length < 1 ? (
					<div className='text-white text-2xl text-center select-none'>You have not orders</div>
				) : (
					<>
						{!!redUser?.Purchases?.length && !redUser?.Purchases?.length > 0 ? (
							<div>There are no orders</div>
						) : (
							redUser?.Purchases?.map((e, k) => {
								return (
									<div
										className='orderContainer border-b border-blue-300'

										key={k}
									>

										<div className='orderStatus'>
											<div className='border-b border-blue-300'>
												<b>Order ID:</b> {e?.id}
											</div>
											<div className='border-b border-blue-300'>
												<b>Status:</b> {e?.status}
											</div>
										</div>
										<div>

										{!!e?.OrderItems?.length > 0 &&
											e?.OrderItems?.map((o, k) => {
												return (
													<div key={k} className='orderDetails'>
														<div className='orderDetailsImage '>
															<img
																className='aspect-square object-cover'
																src={o?.Stock?.Product?.img_home?.secure_url}
															/>
														</div>
														<div className='orderDetailsText'>

															<div className=''>
																<div>{o?.Stock?.Product?.name}</div>
																<div>Quantity: {o?.quantity}</div>
																<div>Price: {o?.price}</div>
															</div>

															{!!(e?.status === 'Received') &&
																!o?.Stock?.Product?.Reviews.some(
																	i =>
																		i.ProductId === o?.Stock?.Product?.id &&
																		i.idOrderItems === e.id
																) && (
																	<div className='startsContainer'>
																		<Stars
																			userId={id}
																			productId={o?.Stock?.Product?.id}
																			idOrderItems={e.id}
																		/>
																	</div>
																)}
														</div>
													</div>
												);
											})}
										</div>



									</div>
								);
							})
						)}
					</>
				)}
			</div>
		</div>
	);
};
