import './Rating.css';

const Rating = () => {
	return (
		<div className='product-review-stars'>
			<input
				type='radio'
				id='star5'
				name='rating'
				value='5'
				className='visuallyhidden'
			/>
			<label htmlFor='star5' title='Rocks!'>
				★
			</label>
			<input
				type='radio'
				id='star4'
				name='rating'
				value='4'
				className='visuallyhidden'
			/>
			<label htmlFor='star4' title='Pretty good'>
				★
			</label>
			<input
				type='radio'
				id='star3'
				name='rating'
				value='3'
				className='visuallyhidden'
			/>
			<label htmlFor='star3' title='Meh'>
				★
			</label>
			<input
				type='radio'
				id='star2'
				name='rating'
				value='2'
				className='visuallyhidden'
			/>
			<label htmlFor='star2' title='Kinda bad'>
				★
			</label>
			<input
				type='radio'
				id='star1'
				name='rating'
				value='1'
				className='visuallyhidden'
			/>
			<label htmlFor='star1' title='Sucks big time'>
				★
			</label>
		</div>
	);
};

export default Rating;
