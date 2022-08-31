import { NavLink } from 'react-router-dom';
import './ProductsCreate.css';

export const Create = () => (
	<div className='create-container'>
		<NavLink to='/addproduct'>To create a new Product, click here!</NavLink>
	</div>
);
