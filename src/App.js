import React from 'react';
import './App.css';
import HomePage from './components/pages/Homepage/HomePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import Shop from './components/pages/Shop/Shop';
import Header from './components/header/Header';
import SignInSignUp from './components/pages/sign-in-sign-up/SignIn-SignUp';
// import { auth, createUserProfileDocument, setUserCartData } from './components/firebase/FirebaseUtilities';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/UserSelectors';
import { selectCartItems } from './redux/cart/CartSelectors';
import { createStructuredSelector } from 'reselect';
import Checkout from './components/pages/Checkout/Checkout';
import { setCartItems } from './redux/cart/CartActions';
import toggleCanSave from './redux/save/SaveAction';
import { selectCanSave } from './redux/save/SaveSelector';
import WithSpinner from './components/spinner/WithSpinner';
import { signInSuccess, isUserPersisted } from './redux/user/UserActions';

const CheckoutWithSpinner = WithSpinner(Checkout);
const HomePageWithSpinner = WithSpinner(HomePage);
const SignInSignUpWithSpinner = WithSpinner(SignInSignUp);

class App extends React.Component {

  unsubscribeFromAuth = null;

  state = {
    loading: true
  }
  
  componentDidMount() {
    const { cartItems, canSave, isUserPersisted } = this.props;
    const { loading } = this.state;

    isUserPersisted(canSave, loading, cartItems);
    
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
    //   if (authUser) {
    //     const snapShot = await firestore.doc(`users/${authUser.uid}`).get();
    //     const userCartItems = snapShot.data().cartItems;

    //     if (canSave && !this.state.loading) {
    //       await setUserCartData(authUser, cartItems);
    //     }

    //     signInSuccess(authUser);
    //     setCartItems(userCartItems);
    //   }

    this.setState({loading: false});
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header authUser={this.authUser} />
        <Switch>
          <Route exact render={(props) => <HomePageWithSpinner isLoading={this.state.loading} {...props} />} path='/'/>
          <Route component={Shop} path='/shop'/>
          <Route exact render={(props) => <CheckoutWithSpinner isLoading={this.state.loading} {...props} />} path='/checkout' />
          <Route exact path='/signin' render={(props) => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpWithSpinner isLoading={this.state.loading} {...props} />)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
  canSave: selectCanSave
});

const mapDispatchToProps = dispatch => ({
  setCartItems: cartItems => dispatch(setCartItems(cartItems)),
  toggleCanSave: () => dispatch(toggleCanSave()),
  signInSuccess: authUser => dispatch(signInSuccess(authUser)),
  isUserPersisted: (canSave, loading, cartItems) => dispatch(isUserPersisted(canSave, loading, cartItems))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
