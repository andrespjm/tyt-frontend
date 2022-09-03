import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
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
		<div>
			{data.length ? (
				data.map(e => (
					<div key={e.id}>
						<img
							src={e.product.img_home.secure_url}
							alt='img product'
							style={{ height: '300px' }}
						/>
						<p>{e.user.displayName}</p>
						<p key={e.comments}>comments: {e.comments}</p>
						<p key={e.score}>score: {e.score}</p>
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
			<Link to={`/detail/${id}`}>
				<button>back to product detail</button>
			</Link>
		</div>
	);
};
export default Reviews;
