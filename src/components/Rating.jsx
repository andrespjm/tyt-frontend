/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './Rating.css';

const Rating = ({ rating }) => {
	const nroStart = () => {
		if (rating === 'NaN' || null) {
			return console.log('sin punutacion');
		} else {
			console.log('antes de truncar ', rating);
			const nro = Math.trunc(rating);
			console.log('despues de truncar ', nro);
			const input = document.getElementById(`${nro}`);
			console.log('Aca', input);
			input.setAttribute('checked', '');
		}
	};

	useEffect(() => {
		nroStart();
	}, [rating]);

	return (
		<div className='product-review-stars'>
			<input
				type='radio'
				id='5'
				name='rating'
				value='5'
				className='visuallyhidden'
				disabled='disabled'
			/>
			<label htmlFor='5' title='Rocks!'>
				★
			</label>
			<input
				type='radio'
				id='4'
				name='rating'
				value='4'
				className='visuallyhidden'
				disabled='disabled'
			/>
			<label htmlFor='4' title='Pretty good'>
				★
			</label>
			<input
				type='radio'
				id='3'
				name='rating'
				value='3'
				className='visuallyhidden'
				disabled='disabled'
			/>
			<label htmlFor='3' title='Meh'>
				★
			</label>
			<input
				type='radio'
				id='2'
				name='rating'
				value='2'
				className='visuallyhidden'
				disabled='disabled'
			/>
			<label htmlFor='2' title='Kinda bad'>
				★
			</label>
			<input
				type='radio'
				id='1'
				name='rating'
				value='1'
				className='visuallyhidden'
				disabled='disabled'
			/>
			<label htmlFor='1' title='Sucks big time'>
				★
			</label>
			<div></div>
		</div>
	);
};

export default Rating;
