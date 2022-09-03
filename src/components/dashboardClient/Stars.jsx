import { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';

function Stars() {
	const [value, setValue] = useState('');
	const [send, setSend] = useState('Unrated');
	const onChange = value => {
		console.log(`React Stars Rating value is ${value}`);
		console.log(setValue(value));
	};
	const handleSend = e => {
		e.preventDefault();
		setSend('');
	};

	return (
		<div>
			{send === 'Unrated' ? (
				<div>
					<form>
						<ReactStarsRating
							onChange={onChange}
							value={value}
							className='flex'
						/>
						<input type='text' />
						<input type='submit' onClick={handleSend} />
					</form>
					<div>{value}</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
export default Stars;
