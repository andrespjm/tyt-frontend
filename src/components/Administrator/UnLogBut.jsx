import { useDispatch } from 'react-redux';
import { signout } from '../../firebase/firebase';

export const UnLog = () => {
	const dispatch = useDispatch();

	const handleUnLog = e => {
		dispatch(() => signout().then(() => window.location.reload()));
	};

	return (
		<div>
			<button className='logout-button' onClick={e => handleUnLog(e)}>
				Logout
			</button>
		</div>
	);
};
