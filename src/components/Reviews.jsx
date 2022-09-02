import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from './Rating';

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
			{data
				? data.map(e => (
						<div key={e.id}>
							<p>{e.user.displayName}</p>
							<p key={e.comments}>comments: {e.comments}</p>
							<p key={e.score}>score: {e.score}</p>
							<Rating id={e.id} ratings={e.score} rating={e.score} />
							<br />
							<br />
							<br />
						</div>
				  ))
				: 'no exite'}
		</div>
	);
};
export default Reviews;
