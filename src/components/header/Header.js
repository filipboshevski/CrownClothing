import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth, setUserCartData } from '../firebase/FirebaseUtilities';

import { connect } from 'react-redux';

import './Header.scss';
import CartIcon from '../cart-icon/CartIcon';
import CartDropDown from '../cart-dropdown/CartDropDown';
import { selectCartHidden, selectCartItems } from '../../redux/cart/CartSelectors';
import { selectCurrentUser } from '../../redux/user/UserSelectors';
import { createStructuredSelector } from 'reselect';
import { toggleCanSave } from '../../redux/save/SaveAction';

const Header = ({currentUser, hidden, cartItems, authUser, toggleCanSave}) => {

    const onSignOut = async () => {
        await setUserCartData(authUser, cartItems);
        await auth.signOut();
        toggleCanSave();
    }

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ? 
                    (
                        <div className='option' onClick={onSignOut}>SIGN OUT</div>
                    ) :
                    <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon />
                { hidden ? null : <CartDropDown /> }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
    cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
    toggleCanSave: () => dispatch(toggleCanSave())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);