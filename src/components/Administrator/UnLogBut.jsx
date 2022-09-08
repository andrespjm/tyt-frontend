import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { signout } from '../../firebase/firebase';

export const UnLog = () => {
	const dispatch = useDispatch();

	const handleUnLog = e => {
		dispatch(async () => {
			await signout();
			location.reload();
		});
	};

	return (
		<div>
			<Stack spacing={2} direction='row' onClick={e => handleUnLog(e)}>
				<Button variant='contained'>Logout</Button>
			</Stack>
			<button></button>
		</div>
	);
};
