import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import './Reviews.css';
const Reviews = () => {
	const { id } = useParams();

	const [data, setdata] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const { data } = await axios(`/review?productId=${id}`);
			setdata(data);
			console.log(data);
		}
		fetchData();
	}, []);

	return (
		<div className='containerReviews'>
			{data.length ? (
				data.map(e => (
					<div className='rounded-xl' key={e.id}>
						<img
							src={e.Product.img_home.secure_url}
							alt='img product'
							style={{ height: '300px' }}
							className='rounded-lg my-2'
						/>
						<p>
							<b>Name: </b> {e.User.displayName}
						</p>
						<p key={e.comments}>
							<b>Comments:</b> {e.comments}
						</p>
						<p key={e.score}>
							<b>Score:</b> {e.score}
						</p>
						<ReactStarsRating
							value={e.score}
							className='flex'
							isSelectable={false}
						/>
					</div>
				))
			) : (
				<h1>there are no reviews on this product</h1>
			)}
			<Link className='buttonReviews' to={`/detail/${id}`}>
				<button className='bg-red-400 rounded-xl'>
					Back to product detail
				</button>
			</Link>
		</div>
	);
};
export default Reviews;
