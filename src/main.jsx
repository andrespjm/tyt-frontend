import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ShoopingCartProvider } from './context/ShoppingCartContext';
import './index.css';
import store from './redux';

axios.defaults.baseURL =
	import.meta.env.VITE_API || 'https://tytecommerce.herokuapp.com';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ShoopingCartProvider>
					<App />
				</ShoopingCartProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
