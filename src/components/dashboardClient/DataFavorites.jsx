import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Loader } from './Loader';
import { Menu } from './Menu';

export const DataFavorites = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const history = useHistory();
	const [idProdDelete, setIdProdDelete] = useState('');
	const [load, setLoad] = useState(false);
	const [favs, setFavs] = useState([]);

	const deleteFav = (userid, productid) => {
		axios
			.delete('/favorites', { data: { userid, productid } })
			.then(() => setLoad(false));
		setFavs(favs.filter(e => e.id !== productid));
	};

	const toogleModal = () =>
		document.querySelector('#fav-modal').classList.toggle('hidden');

	useEffect(() => {
		async function getUserFavourites() {
			try {
				setLoad(true);
				const response = await axios.get(`/favorites?userid=${id}`);
				setFavs(response.data.Products);
				setLoad(false);
			} catch (error) {
				alert(error);
			}
		}
		getUserFavourites();
	}, [dispatch]);

	if (load) return <Loader />;

	return (
		<div className='h-screen bg-gradient-to-b from-black via-gray-700 to-base-900 select-none'>
			<Menu />
			{!favs.length ? (
				<div className='text-white text-2xl text-center select-none'>
					You have not selected any favourite...
				</div>
			) : (
				<div className='container mx-auto text-white'>
					<div className='text-5xl border-b border-blue-300 p-2'>
						<i className='bi-heart-fill text-myRed mr-4'></i>
						Favorites!
					</div>
					{favs?.map(e => {
						return (
							<div
								key={e.id}
								className='grid grid-cols-[0.3fr_1fr_0.5fr] border-b border-blue-300 gap-2 py-3 select-none'
							>
								<img
									src={e.img_home.secure_url}
									alt=''
									className='aspect-square object-cover'
								/>
								<div className='flex flex-col py-2'>
									<span className='text-2xl mb-3'>{e.name}</span>
									<span className='mb-3'>Collection: {e.collection}</span>
									<span className='text-gray-400'>{e.description}</span>
								</div>
								<div className='flex flex-col justify-around items-center'>
									<button
										className='btn btn-blue hover:btn-blue w-36'
										onClick={() => history.push(`/detail/${e.id}`)}
									>
										Go to detail
									</button>
									<button
										className='btn btn-red hover:btn-red w-36'
										onClick={() => {
											setIdProdDelete(e.id);
											toogleModal();
										}}
									>
										Delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}
			<div id='fav-modal' className='hidden relative z-10'>
				<div className='fixed inset-0 bg-gray-800 bg-opacity-70 transition-opacity'></div>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<div className='relative transform overflow-hidden rounded-lg bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg'>
							<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
								<div className='sm:flex sm:items-start'>
									<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
										<svg
											className='h-6 w-6 text-red-600'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											aria-hidden='true'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z'
											/>
										</svg>
									</div>
									<div className='mt-3 sm:mt-0 sm:ml-4 sm:text-left'>
										<h3 className='text-lg text-center font-medium leading-6 text-gray-900'>
											Delete Item
										</h3>
										<div className='mt-2'>
											<p className='text-sm text-gray-500'>
												Are you sure you want permanently remove this item from
												favorites?.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
								<button
									onClick={() => {
										toogleModal();
										deleteFav(id, idProdDelete);
									}}
									type='button'
									className='mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
								>
									Delete
								</button>
								<button
									onClick={toogleModal}
									type='button'
									className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
