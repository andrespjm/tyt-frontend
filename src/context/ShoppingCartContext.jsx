import { createContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const ShoppingCartContext = createContext();

// eslint-disable-next-line react/prop-types
export const ShoopingCartProvider = ({ children }) => {
	const [cart, setCart] = useLocalStorage('ShoppingCart', []);
	return (
		<ShoppingCartContext.Provider value={[cart, setCart]}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
