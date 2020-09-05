import React from 'react';
import './App.css';
import HomePage from './components/pages/Homepage/HomePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import Shop from './components/pages/Shop/Shop';
import Header from './components/header/Header';
import SignInSignUp from './components/pages/sign-in-sign-up/SignIn-SignUp';
import { auth, createUserProfileDocument, setUserCartData } from './components/firebase/FirebaseUtilities';
import { setCurrentUser } from './redux/user/UserActions';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/UserSelectors';
import { selectCartItems, selectLocalCartItems } from './redux/cart/CartSelectors';
import { createStructuredSelector } from 'reselect';
import Checkout from './components/pages/Checkout/Checkout';
import { setCartItems } from './redux/cart/CartActions';

class App extends React.Component {
  unsubscribeFromAuth = null;
  authUser = null;

  componentDidMount() {
    const { setCurrentUser, setCartItems, localCartItems, cartItems } = this.props;
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      this.authUser = authUser;

      if (authUser) {
        const userRef = await createUserProfileDocument(authUser);
        await setUserCartData(authUser, cartItems);

        await userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
            setCartItems(snapShot.data().cartItems);
        });
      }

      setCurrentUser(authUser);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header authUser={this.authUser} />
        <Switch>
          <Route exact component={HomePage} path='/'/>
          <Route component={Shop} path='/shop'/>
          <Route exact component={Checkout} path='/checkout' />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUp />)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
  localCartItems: selectLocalCartItems
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCartItems: cartItems => dispatch(setCartItems(cartItems))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
