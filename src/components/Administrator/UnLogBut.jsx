import { useDispatch } from 'react-redux';

export const UnLog = () => {
	const dispatch = useDispatch();

	const handleUnLog = e => {
		dispatch();
	};

	return (
		<div>
			<button className='logout-button' onClick={e => handleUnLog(e)}>
				Logout
			</button>
		</div>
	);
};
