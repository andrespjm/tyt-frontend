// import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
export const ProtectedRouteUser = ({ children }) => {
	const { loading, user } = useAuth();

	if (loading)
		return <h1 className='text-center text-2xl text-white py-3'>Loading...</h1>;

	if (!user) return <Redirect to='/signin' />;

	return <>{children}</>;
};
