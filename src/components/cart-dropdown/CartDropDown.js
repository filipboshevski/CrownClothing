import React from 'react';

import CustomButton from '../custom-button/CustomButton';

import './CartDropDown.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/CartItem';
import { selectCartItems, selectLocalCartItems } from '../../redux/cart/CartSelectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/CartActions';
import { selectCurrentUser } from '../../redux/user/UserSelectors';

const CartDropDown = ({cartItems, localCartItems, currentUser, history, dispatch}) => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    currentUser ? 
                    (cartItems.length ? cartItems.map( cartItem => <CartItem key={cartItem.id} item={cartItem} />) : <span className='empty-message'>Your cart is empty</span>) 
                    :
                    (localCartItems.length ? localCartItems.map( cartItem => <CartItem key={cartItem.id} item={cartItem} />) : <span className='empty-message'>Your cart is empty</span>)
                }
            </div>
            <CustomButton onClick={() => {
                dispatch(toggleCartHidden());
                history.push('/checkout');
            }} >GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    localCartItems: selectLocalCartItems,
    currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps)(CartDropDown));