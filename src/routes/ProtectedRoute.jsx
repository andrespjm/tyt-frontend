// import { useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
	const { loading, user } = useAuth();
	const navigate = useHistory();

	if (loading)
		return <h1 className='text-center text-2xl text-white py-3'>Loading...</h1>;

	if (user) return navigate.push('/home');

	return <>{children}</>;
};
