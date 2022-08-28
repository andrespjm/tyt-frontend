
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import DashBoard from "./components/Administrator/Index";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { EditUserProfile } from "./components/dashboardClient/formsUsers/EditUserProfile";
import { Menu } from "./components/dashboardClient/Menu";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import ShoppingCart from "./components/ShoppingCart";
import Try from "./components/Try";
import { auth, getUserInfo, userExists } from "./firebase/firebase";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import PaySuccess from "./components/PaySuccess";
import PayFailure from "./components/PayFailure";

function App() {
  const [userLoggedComplete, setUserLoggedComplete] = useState(false);
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
          setUserLoggedComplete(true);
        }
      }
    }
  }
  return (
    <>
      <Navbar userLoggedComplete={userLoggedComplete} />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/admin" component={DashBoard} />
        <Route exact path="/addproduct" component={ProductForm} />
        <Route exact path="/shop/shoppingCart" component={ShoppingCart} />
        <Route exact path="/bases/try" component={Try} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path={"/paysuccess"} component={PaySuccess}/>
        <Route exact path={"/payfailure"} component={PayFailure}/>

        <Route exact path="/user/edit" component={EditUserProfile} />
        {/* <Route exact path='/user/changepassword' component={ChangePassword} /> */}
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/user/main" component={Menu} />
        <Route exact path="/:id" component={Detail} />
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
