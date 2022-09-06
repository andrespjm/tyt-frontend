import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../redux/actions';
import { Loader } from './dashboardClient/Loader';

const Reviews = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const [data, setdata] = useState([]);
	const [prod, setProd] = useState();
	const { redData } = useSelector(state => state);

	useEffect(() => {
		async function fetchData() {
			const { data } = await axios(`/review?productId=${id}`);
			setdata(data);
		}
		fetchData();
		dispatch(getData());
		setProd(redData.find(e => e.id === Number(id)));
	}, [dispatch]);

	if (!redData.length || !data.length) return <Loader />;
	!prod && setProd(redData.find(e => e.id === Number(id)));

	return (
		<div className='h-screen bg-gradient-to-b from-black via-gray-700 to-base-900 select-none'>
			<div className='container mx-auto text-white'>
				<div className='border-b border-blue-300 p-2 flex justify-between items-center'>
					<div className='flex flex-col'>
						<div className='flex items-center'>
							<img
								src={prod?.img_home.secure_url}
								alt=''
								className=' w-20 aspect-square object-cover rounded-lg'
							/>
							<span className='text-5xl ml-6'>
								<i className='bi bi-list-check text-blue-400 mr-4'></i>
								Reviews!
							</span>
						</div>
						<span className='mt-4'>Product Name: {prod?.name}</span>
						<span>{prod?.description}</span>
					</div>
					<button
						onClick={history.goBack}
						className='btn btn-red hover:btn-red w-32'
					>
						back
					</button>
				</div>
				{!data.length ? (
					<div className='text-white text-2xl text-center select-none'>
						There are no reviews for this product!...
					</div>
				) : (
					data?.map(e => (
						<div
							key={e.id}
							className='grid grid-cols-[0.3fr_1fr_0.5fr] border-b border-blue-300 gap-2 py-3 select-none'
						>
							<img
								src={e.User.profilePicture}
								alt=''
								className='aspect-square object-cover'
							/>
							<div className='flex flex-col py-2'>
								<span className='text-2xl mb-3'>{e.User.displayName}</span>
								<span className='text-gray-400'>{e.comments}</span>
							</div>
							<div className='flex flex-col  items-center'>
								<ReactStarsRating
									value={e.score}
									className='flex'
									isSelectable={false}
								/>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};
export default Reviews;
