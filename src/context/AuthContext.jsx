import { createContext, useState } from 'react';

export const AuthContext = createContext();

// const VIDEOGAMES_PER_PAGE = 15;

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [currentUserF, setCurrentUserF] = useState({});
	const [isLogged, setIsLogged] = useState(false);

	const data = {
		currentUserF,
		setCurrentUserF,
		isLogged,
		setIsLogged,
	};
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
