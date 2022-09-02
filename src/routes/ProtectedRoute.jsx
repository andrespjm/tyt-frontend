import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const navigate = useHistory();

	if (loading) return <h1>Loading</h1>;

	if (!user) return navigate.push('/signin');

	return <>{children}</>;
};
