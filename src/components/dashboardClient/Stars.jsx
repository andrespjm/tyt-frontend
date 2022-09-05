import axios from 'axios';
import { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';

// eslint-disable-next-line react/prop-types
function Stars({ productId, userId }) {
	const [value, setValue] = useState(0);
	const [comments, setComments] = useState('');
	const onChange = value => {
		console.log(`React Stars Rating value is ${value}`);
		console.log(setValue(value));
	};
	const handleSend = async e => {
		e.preventDefault();

		const post = {
			score: value,
			comments,
			productId,
			userId,
		};
		const review = await axios.post('/review', post);
		console.log(review.data);
		setComments('');
		console.log(review);
	};

	return (
		<div>
			<div>
				<form>
					<ReactStarsRating
						onChange={onChange}
						value={value}
						className='flex'
						isHalf={false}
					/>
					<b>{value > 0 && value}</b>
					<input
						type='text'
						value={comments}
						onChange={e => setComments(e.target.value)}
					/>
					<input type='submit' onClick={handleSend} />
				</form>
			</div>
		</div>
	);
}
export default Stars;
