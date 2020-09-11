import React, { useEffect } from 'react';
import './App.css';
import HomePage from './components/pages/Homepage/HomePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import Shop from './components/pages/Shop/Shop';
import Header from './components/header/Header';
import SignInSignUp from './components/pages/sign-in-sign-up/SignIn-SignUp';
import { connect } from 'react-redux';
import { selectAuthUser, selectCurrentUser } from './redux/user/UserSelectors';
import { selectCartItems } from './redux/cart/CartSelectors';
import { createStructuredSelector } from 'reselect';
import Checkout from './components/pages/Checkout/Checkout';
import { setCartItems } from './redux/cart/CartActions';
import toggleCanSave from './redux/save/SaveAction';
import { selectCanSave, selectIsLoading } from './redux/save/SaveSelector';
import WithSpinner from './components/spinner/WithSpinner';
import { signInSuccess, isUserPersisted } from './redux/user/UserActions';

const CheckoutWithSpinner = WithSpinner(Checkout);
const HomePageWithSpinner = WithSpinner(HomePage);
const SignInSignUpWithSpinner = WithSpinner(SignInSignUp);

const App = ({currentUser, cartItems, canSave, isUserPersisted, isLoading, authUser}) => {

  useEffect(() => {
    isUserPersisted(canSave, isLoading, cartItems);
  }, [isUserPersisted]);

  return (
    <div>
      <Header authUser={authUser} />
      <Switch>
        <Route exact render={(props) => <HomePageWithSpinner isLoading={isLoading} {...props} />} path='/'/>
        <Route component={Shop} path='/shop'/>
        <Route exact render={(props) => <CheckoutWithSpinner isLoading={isLoading} {...props} />} path='/checkout' />
        <Route exact path='/signin' render={(props) => currentUser ? (<Redirect to='/' />) : (<SignInSignUpWithSpinner isLoading={isLoading} {...props} />)}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
  canSave: selectCanSave,
  isLoading: selectIsLoading,
  authUser: selectAuthUser
});

const mapDispatchToProps = dispatch => ({
  setCartItems: cartItems => dispatch(setCartItems(cartItems)),
  toggleCanSave: () => dispatch(toggleCanSave()),
  signInSuccess: authUser => dispatch(signInSuccess(authUser)),
  isUserPersisted: (canSave, loading, cartItems) => dispatch(isUserPersisted(canSave, loading, cartItems))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
