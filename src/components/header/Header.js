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

const Header = ({currentUser, hidden, cartItems, authUser}) => {

    const onSignOut = async () => {
        console.log('Saving Cart');
        await setUserCartData(authUser, cartItems);
        auth.signOut();
        window.location.reload(true);
    }

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link onClick={() => console.log(currentUser)} className='option' to='/shop'>
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

export default connect(mapStateToProps)(Header);