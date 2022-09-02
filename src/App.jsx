import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from './components/Administrator/Index';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { EditUserProfile } from './components/dashboardClient/formsUsers/EditUserProfile';
import { Menu } from './components/dashboardClient/Menu';
import { HomeUser } from './components/dashboardClient/HomeUser';
import { DataAccount } from './components/dashboardClient/DataAccount';
import { DataOrders } from './components/dashboardClient/DataOrders';
import { DataFavorites } from './components/dashboardClient/DataFavorites';
import { DataAddress } from './components/dashboardClient/DataAddress';
import Navbar from './components/Navbar';

import PayFailure from './components/PayFailure';
import PaySuccess from './components/PaySuccess';
import ProductForm from './components/ProductForm2';
import ShoppingCart from './components/ShoppingCart';

import { AuthContext } from './context/AuthContext';

import { auth, getUserInfo, userExists } from './firebase/firebase';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Landing from './pages/Landing';

import Reviews from './components/Reviews';

function App() {
	const { setCurrentUserF } = useContext(AuthContext);

	useEffect(() => {
		onAuthStateChanged(auth, handleUserStateChanged);
	}, []);
	async function handleUserStateChanged(user) {
		if (user) {
			const isRegister = await userExists(user.uid);
			if (isRegister) {
				const userInfo = await getUserInfo(user.uid);
				if (userInfo.processCompleted) {
					// console.log(userInfo);
					setCurrentUserF({
						id: userInfo.id,
						firstName: userInfo.firstName,
						lastName: user.lastName,
						profilePicture: userInfo.profilePicture,
						email: user.email,
					});
				}
			}
		}
	}
	return (
		<>
			<Navbar />

			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/home' component={Home} />
				<Route exact path='/admin' component={DashBoard} />
				<Route exact path='/addproduct' component={ProductForm} />
				<Route exact path='/shop/shoppingCart' component={ShoppingCart} />

				<Route exact path='/signup' component={SignUp} />
				<Route exact path={'/paysuccess'} component={PaySuccess} />
				<Route exact path={'/payfailure'} component={PayFailure} />
				<Route exact path={'/reviews/:id'} component={Reviews} />

				<Route exact path='/user/edit' component={EditUserProfile} />
				{/* <Route exact path='/user/changepassword' component={ChangePassword} /> */}
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/user/main' component={HomeUser} />
				<Route exact path='/:id/user/menu' component={Menu} />
				<Route exact path='/:id/user/menu/account' component={DataAccount} />
				<Route exact path='/:id/user/menu/orders' component={DataOrders} />
				<Route
					exact
					path='/:id/user/menu/favorites'
					component={DataFavorites}
				/>
				<Route exact path='/:id/user/menu/address' component={DataAddress} />
				<Route exact path='/:id' component={Detail} />
			</Switch>
			{/* <Footer /> */}
		</>
	);
}

export default App;
