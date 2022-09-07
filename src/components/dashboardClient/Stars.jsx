import axios from 'axios';
import { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';

// eslint-disable-next-line react/prop-types
function Stars({ productId, userId, idOrderItems }) {
	const [value, setValue] = useState(0);
	const [comments, setComments] = useState('');
	const [send, setSend] = useState('no review');

	const onChange = value => {
		setValue(value);
	};
	const handleSend = async e => {
		e.preventDefault();
		if (value > 0) {
			const post = {
				score: value,
				comments,
				productId,
				userId,
				idOrderItems,
			};
			await axios.post('/review', post);
			setComments('');
			setSend('');
		}
	};

	return (
		<div>
			{send === 'no review' ? (
				<div>
					<form className='flex flex-col'>
						<ReactStarsRating
							onChange={onChange}
							value={value}
							className='flex'
							isHalf={false}
						/>
						<input
							className='my-2 bg-transparent text-yellow-50'
							style={{border: '1px solid white'}}
							placeholder='Write a review'
							type='text'
							value={comments}
							onChange={e => setComments(e.target.value)}
						/>
						<input className='bg-pink-300 my-1 rounded-lg w-3/6 mx-auto' type='submit' value='Send'onClick={handleSend} disabled={value === 0} />
					</form>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
export default Stars;
