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
	console.log(redUser);

	useEffect(() => {
		dispatch(getUserOrder(id));
	}, []);

	return (
		<>
			<Menu />
			<div className='w-100 text-white'>
				{!!redUser?.Purchases?.length < 1 ? (
					<div>There are no orders</div>
				) : (
					<>
						{!!redUser?.Purchases?.length && !redUser?.Purchases?.length > 0 ? (
							<div>There are no orders</div>
						) : (
							redUser?.Purchases?.map((e, k) => {
								return (
									<div
										className='relative rounded-xl'
										style={{
											border: '1px solid white',
											minHeight: '50vh',
											maxWidth: '50%',
											margin: '20px auto',
										}}
										key={k}
									>
										<svg
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='w-60 h-60 absolute left-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
											/>
										</svg>
										<div className='w-36 absolute top-36 left-20'>
											<div>
												<b>Order ID:</b> {e?.id}
											</div>
											<div>
												<b>Status:</b> {e?.status}
											</div>
										</div>
										<div className='w-4/6 absolute left-72 flex-col justify-center '>
											{!!e?.OrderItems?.length > 0 &&
												e?.OrderItems?.map((o, k) => {
													return (
														<div key={k} className='flex m-3'>
															<div className='basis-2/6'>
																<div>{o?.Stock?.Product?.name}</div>
																<div>Quantity: {o?.quantity}</div>
																<div>Price: {o?.price}</div>
															</div>
															<div className='w-28 h-28 flex justify-center justify-items-center overflow-hidden  rounded-xl'>
																<img
																	className='w-full object-cover'
																	src={o?.Stock?.Product?.img_home?.secure_url}
																/>
															</div>
															{e?.status === 'Received' && <Stars />}
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
		</>
	);
};
