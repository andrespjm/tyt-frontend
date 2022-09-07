/* eslint-disable no-prototype-builtins */
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import DashBoard from './components/Administrator/Index';
import { SignUp } from './components/auth/SignUp';
import { DataAccount } from './components/dashboardClient/DataAccount';
import { DataFavorites } from './components/dashboardClient/DataFavorites';
import { DataOrders } from './components/dashboardClient/DataOrders';
import { EditUserProfile } from './components/dashboardClient/formsUsers/EditUserProfile';
import { FormEditPassword } from './components/dashboardClient/formsUsers/FormEditPassword';
import { FormEditProfile } from './components/dashboardClient/formsUsers/FormEditProfle';
import { HomeUser } from './components/dashboardClient/HomeUser';
import { Menu } from './components/dashboardClient/Menu';
import Navbar from './components/Navbar';

import ModifyProduct from './components/ModifyProduct';
import PayFailure from './components/PayFailure';
import PaySuccess from './components/PaySuccess';
import ProductForm from './components/ProductForm';
import ShoppingCart from './components/ShoppingCart';

import { useAuth } from './context/AuthContext';

import { auth, getUserInfo, signout, userExists } from './firebase/firebase';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Landing from './pages/Landing';

import { SignInAdmin } from './components/Administrator/auth/SignInAdmin';
import { SignIn } from './components/auth/SignIn';
import { ChangePassword } from './components/dashboardClient/formsUsers/ChangePassword';
import Reviews from './components/Reviews';
import Page404 from './pages/Page404';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ProtectedRouteAdmin } from './routes/ProtectedRouteAdmin';
import { ProtectedRouteUser } from './routes/ProtectedRouteUser';

function App() {
	const { setCurrentUserF, user, currentAdmin } = useAuth();
	const navigate = useHistory();
	useEffect(() => {
		// signout();
		onAuthStateChanged(auth, handleUserStateChanged);
	}, [user]);
	async function handleUserStateChanged(user) {
		if (user) {
			const isRegister = await userExists(user.uid);
			if (isRegister) {
				const userInfo = await getUserInfo(user.uid);
				if (userInfo.processCompleted) {
					if (userInfo.enabled) {
						setCurrentUserF({
							id: userInfo.id,
							firstName: userInfo.firstName,
							lastName: user.lastName,
							profilePicture: userInfo.profilePicture,
							email: user.email,
						});
					} else {
						return signout().then(() => navigate.push('/signin')); // console.log(userInfo);
					}
				}
			}
		}
	}
	return (
		<>
			<Navbar />

			{(user &&
				Object.entries(user).length !== 0 &&
				user.hasOwnProperty('emailVerified') &&
				!user.emailVerified) ||
				(currentAdmin.emailVerified && (
					<div className='text-center bg-yellow-400 text-md py-3 w-full'>
						<b>Please activate your account</b>
					</div>
				))}

			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/home' component={Home} />
				<Route exact path='/tyt-admin' component={SignInAdmin} />
				<Route exact path='/admin'>
					<ProtectedRouteAdmin>
						<DashBoard />
					</ProtectedRouteAdmin>
				</Route>
				<Route exact path='/admin/addproduct' component={ProductForm} />
				<Route exact path='/admin/modifyproduct' component={ModifyProduct} />
				<Route exact path='/shop/shoppingCart' component={ShoppingCart} />
				<Route exact path='/signup'>
					<ProtectedRoute>
						<SignUp />
					</ProtectedRoute>
				</Route>
				<Route exact path={'/paysuccess'}>
					<ProtectedRouteUser>
						<PaySuccess />
					</ProtectedRouteUser>
				</Route>
				<Route exact path={'/payfailure'}>
					<ProtectedRouteUser>
						<PayFailure />
					</ProtectedRouteUser>
				</Route>
				<Route exact path={'/reviews/:id'} component={Reviews} />
				<Route exact path='/user/edit' component={EditUserProfile} />
				<Route exact path='/user/changepassword' component={ChangePassword} />
				<Route exact path='/signin'>
					<ProtectedRoute>
						<SignIn />
					</ProtectedRoute>
				</Route>
				<Route exact path='/user/main' component={HomeUser} />
				<Route exact path='/:id/user/menu'>
					<ProtectedRouteUser>
						<Menu />
					</ProtectedRouteUser>
				</Route>
				<Route exact path='/:id/user/menu/account'>
					<ProtectedRouteUser>
						<DataAccount />
					</ProtectedRouteUser>
				</Route>
				<Route exact path='/:id/user/menu/orders'>
					<ProtectedRouteUser>
						<DataOrders />
					</ProtectedRouteUser>
				</Route>
				<Route exact path='/:id/user/menu/favorites'>
					<ProtectedRouteUser>
						<DataFavorites />
					</ProtectedRouteUser>
				</Route>
				<Route path='/:id/user/menu/account/edit'>
					<ProtectedRouteUser>
						<FormEditProfile />
					</ProtectedRouteUser>
				</Route>
				<Route path='/:id/user/menu/account/changepass'>
					<ProtectedRouteUser>
						<FormEditPassword />
					</ProtectedRouteUser>
				</Route>
				<Route exact path='/detail/:id' component={Detail} />
				<Route path='/' component={Page404} />
			</Switch>
		</>
	);
}

export default App;
