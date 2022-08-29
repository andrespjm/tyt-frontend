import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux';
import './index.css';
import { ShoopingCartProvider } from './context/ShoppingCartContext';
import axios from 'axios';

axios.defaults.baseURL =
	import.meta.env.VITE_API || 'https://tytecommerce.herokuapp.com';
// import.meta.env.VITE_API || 'http://localhost:3001';

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
