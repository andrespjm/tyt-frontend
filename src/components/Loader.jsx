import loading from '../assets/cakes&bases Loading.gif';
import './Loader.css';

const Loader = () => {
	return (
		<div className='loader-container'>
			<img src={loading} alt='HTML5 Icon'></img>
		</div>
	);
};

export default Loader;
