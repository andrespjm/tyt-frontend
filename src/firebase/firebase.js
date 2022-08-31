// Your web app's Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where,
} from 'firebase/firestore';
import { addUser, updateUserP } from '../redux/actions';
import { cartLogout } from '../helpers/carLogout.js';
// import { getStorage } from 'firebase/storage';

const {
	VITE_API_KEY,
	VITE_AUTH_DOMAIN,
	//   VITE_DATABASE_URL,
	VITE_PROJECT_ID,
	VITE_STORAGE_BUCKET,
	VITE_MESSAGING_SENDER_ID,
	VITE_APP_ID,
} = import.meta.env;

const firebaseConfig = {
	apiKey: VITE_API_KEY,
	authDomain: VITE_AUTH_DOMAIN,
	//   databaseURL: VITE_DATABASE_URL,
	projectId: VITE_PROJECT_ID,
	storageBucket: VITE_STORAGE_BUCKET,
	messagingSenderId: VITE_MESSAGING_SENDER_ID,
	appId: VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);

export const userExists = async id => {
	const docRef = doc(db, 'users', id);
	const res = await getDoc(docRef);
	return res.exists();
};

export const existsUsername = async username => {
	const users = [];
	const docsRef = collection(db, 'users');
	const q = query(docsRef, where('username', '==', username));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach(doc => users.push(doc.data()));
	return users.length > 0 ? users[0].id : null;
};

export const registerNewUser = async user => {
	try {
		const collectionRef = collection(db, 'users');
		const docRef = doc(collectionRef, user.id);
		await setDoc(docRef, user);
		await addUser(user);
	} catch (err) {}
};

export const updateUser = async user => {
	try {
		const collectionRef = collection(db, 'users');
		const docRef = doc(collectionRef, user.id);
		await setDoc(docRef, user);
		await updateUserP(user);
	} catch (err) {}
};

export const getUserInfo = async id => {
	try {
		const docRef = doc(db, 'users', id);
		const document = await getDoc(docRef);
		return document.data();
	} catch (err) {}
};

export const signout = async (userId, cart, setCart) => {
	console.log('ejecuto signout');
	console.log('ejecuto signout', userId);
	console.log('ejecuto signout', cart);
	await cartLogout(userId, cart, setCart);
	await signOut(auth).then(() => location.reload());
};
