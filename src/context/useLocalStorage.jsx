import { useEffect, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(key); // verify if it already exist
		if (jsonValue !== null) return JSON.parse(jsonValue);
		return initialValue; // if no exist, set the initial value
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	return [value, setValue];
};
