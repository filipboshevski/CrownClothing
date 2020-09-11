import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { connect } from 'react-redux';

import './Header.scss';
import CartIcon from '../cart-icon/CartIcon';
import CartDropDown from '../cart-dropdown/CartDropDown';
import { selectCartHidden, selectCartItems } from '../../redux/cart/CartSelectors';
import { selectCurrentUser, selectAuthUser } from '../../redux/user/UserSelectors';
import { createStructuredSelector } from 'reselect';
import { signOutUser } from '../../redux/user/UserActions';
import { toggleCartHiddenFalse } from '../../redux/cart/CartActions';

class Header extends React.Component {

    onSignOut = async () => {
        const { authUser, cartItems, signOutUser } = this.props;
        signOutUser(authUser, cartItems);
    }

    render() {
        const {currentUser, hidden, toggleCartHiddenFalse} = this.props;
        return (
            <div className='header'>
                <Link onClick={toggleCartHiddenFalse} className='logo-container' to='/'>
                    <Logo className='logo' />
                </Link>
                <div className='options'>
                    <Link onClick={toggleCartHiddenFalse} className='option' to='/shop'>
                        SHOP
                    </Link>
                    <Link onClick={toggleCartHiddenFalse} className='option' to='/contact'>
                        CONTACT
                    </Link>
                    {
                        currentUser ? 
                        (
                            <div className='option' onClick={this.onSignOut}>SIGN OUT</div>
                        ) :
                        <Link onClick={toggleCartHiddenFalse} className='option' to='/signin'>SIGN IN</Link>
                    }
                    <CartIcon isLoading={this.props.isLoading} />
                    { hidden ? null : <CartDropDown /> }
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
    cartItems: selectCartItems,
    authUser: selectAuthUser
});

const mapDispatchToProps = dispatch => ({
    signOutUser: (authUser, cartItems) => dispatch(signOutUser(authUser, cartItems)),
    toggleCartHiddenFalse: () => dispatch(toggleCartHiddenFalse())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);