import { createContext, useState } from 'react';

export const AuthContext = createContext();

// const VIDEOGAMES_PER_PAGE = 15;

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [currentUserF, setCurrentUserF] = useState({});

	const data = {
		currentUserF,
		setCurrentUserF,
	};
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
