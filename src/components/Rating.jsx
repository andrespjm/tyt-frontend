/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './Rating.css';

const Rating = ({ rating }) => {
	const nroStart = () => {
		if (rating === 0 || null || isNaN(rating)) {
			return '';
		} else {
			const nro = Math.trunc(rating);
			const input = document.getElementById(`star${nro}`);
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
				id='star5'
				name='rating'
				value='5'
				className='visuallyhidden'
				disabled='disabled'
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
				disabled='disabled'
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
				disabled='disabled'
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
				disabled='disabled'
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
				disabled='disabled'
			/>
			<label htmlFor='star1' title='Sucks big time'>
				★
			</label>
		</div>
	);
};

export default Rating;
