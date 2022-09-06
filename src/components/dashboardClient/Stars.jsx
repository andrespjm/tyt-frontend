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
					<form>
						<ReactStarsRating
							onChange={onChange}
							value={value}
							className='flex'
							isHalf={false}
						/>
						<input
							type='text'
							value={comments}
							onChange={e => setComments(e.target.value)}
						/>
						<input type='submit' onClick={handleSend} disabled={value === 0} />
					</form>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
export default Stars;
