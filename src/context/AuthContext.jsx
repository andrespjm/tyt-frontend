/* eslint-disable react/prop-types */
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

const authContext = createContext();

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) throw new Error('There is no Auth provider');
	return context;
};

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentUserF, setCurrentUserF] = useState({});
	const [currentUser, setCurrentUser] = useState({});

	const signup = async (email, password) => {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		if (res.user) {
			await sendEmailVerification(auth.currentUser);
		}
		return res;
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const loginWithGoogle = () => {
		const googleProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleProvider);
	};

	const logout = () => signOut(auth);

	const resetPassword = async email => sendPasswordResetEmail(auth, email);

	useEffect(() => {
		const unsubuscribe = onAuthStateChanged(auth, currentUser => {
			console.log({ currentUser });
			setUser(currentUser);
			setLoading(false);
		});
		return () => unsubuscribe();
	}, []);

	return (
		<authContext.Provider
			value={{
				signup,
				login,
				user,
				logout,
				loading,
				loginWithGoogle,
				resetPassword,
				currentUserF,
				currentUser,
				setCurrentUserF,
				setCurrentUser,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
