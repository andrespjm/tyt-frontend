import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
			{data &&
				data.map(e => (
					<div key={e.id}>
						<p>{e.user.displayName}</p>
						<p key={e.comments}>comments: {e.comments}</p>
						<p key={e.score}>score: {e.score}</p>
						<ReactStarsRating
							value={e.score}
							className='flex'
							isSelectable={false}
						/>
					</div>
				))}
		</div>
	);
};
export default Reviews;
