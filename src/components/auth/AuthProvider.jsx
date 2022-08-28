/* eslint-disable react/prop-types */
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import {
	auth,
	getUserInfo,
	registerNewUser,
	userExists,
} from '../../firebase/firebase';

export const AuthProvider = ({
	children,
	onUserLoggedIn,
	onUserNotLoggedIn,
	onUserNotRegister,
}) => {
	useEffect(() => {
		onAuthStateChanged(auth, handleUserStateChanged);
	}, []);
	async function handleUserStateChanged(user) {
		if (user) {
			const isRegister = await userExists(user.uid);
			if (isRegister) {
				// TODO: redirigir a Dashboard
				const userInfo = await getUserInfo(user.uid);
				if (userInfo.processCompleted) {
					onUserLoggedIn(userInfo);
				} else {
					onUserNotRegister(userInfo);
				}
			} else {
				// TODO: redirigir a choose username
				await registerNewUser({
					id: user.uid,
					displayName: user.displayName,
					email: user.email,
					profilePicture: '',
					username: '',
					processCompleted: false,
				});
				onUserNotRegister(user);
			}
		} else {
			onUserNotLoggedIn();
		}
	}
	return <div>{children}</div>;
};
