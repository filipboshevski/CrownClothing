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
import { toggleCartHiddenFalse } from '../../redux/cart/CartActions';

class Header extends React.Component {

    onSignOut = async () => {
        const { authUser, cartItems, toggleCanSave, toggleCartHiddenFalse} = this.props;
        await setUserCartData(authUser, cartItems);
        await auth.signOut();
        toggleCanSave();
        toggleCartHiddenFalse();
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
    cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
    toggleCanSave: () => dispatch(toggleCanSave()),
    toggleCartHiddenFalse: () => dispatch(toggleCartHiddenFalse())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);