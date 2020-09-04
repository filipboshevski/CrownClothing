import React from 'react';
import './App.css';
import HomePage from './components/pages/Homepage/HomePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import Shop from './components/pages/Shop/Shop';
import Header from './components/header/Header';
import SignInSignUp from './components/pages/sign-in-sign-up/SignIn-SignUp';
import { auth, createUserProfileDocument } from './components/firebase/FirebaseUtilities';
import { setCurrentUser } from './redux/user/UserActions';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/UserSelectors';
import { selectCartItems } from './redux/cart/CartSelectors';
import { createStructuredSelector } from 'reselect';
import Checkout from './components/pages/Checkout/Checkout';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const userRef = await createUserProfileDocument(authUser);
        // const userCartData = await setUserCartData(authUser, this.props.cartItems);

        await userRef.onSnapshot(snapShot => {
            this.props.setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      }
      this.props.setCurrentUser(authUser);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header />
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
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
