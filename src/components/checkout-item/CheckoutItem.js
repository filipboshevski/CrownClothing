import React from 'react';

import './CheckoutItem.scss';
import { clearItemFromCart, removeCartItem, addCartItem, clearItemFromLocalCart, removeLocalCartItem, addLocalCartItem } from '../../redux/cart/CartActions';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/UserSelectors';
import { createStructuredSelector } from 'reselect';

const CheckoutItem = ({ currentUser, cartItem, clearItemFromCart, clearLocalItemFromCart, removeCartItem, removeLocalItem, addCartItem, addLocalItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <div className='quantity' style={{fontSize: 'inherit'}}>
                <div className='arrow' onClick={() => {currentUser ? removeCartItem(cartItem) : removeLocalItem(cartItem)}} >&#10094;</div>
                <div className='value'>{quantity}</div>
                <div className='arrow' onClick={() => {currentUser ? addCartItem(cartItem) : addLocalItem(cartItem)}} >&#10095;</div>
            </div>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => {currentUser ? clearItemFromCart(cartItem) : clearLocalItemFromCart(cartItem)}} >&#10005;</div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    clearItemFromCart: cartItem => dispatch(clearItemFromCart(cartItem)),
    removeCartItem: cartItem => dispatch(removeCartItem(cartItem)),
    addCartItem: cartItem => dispatch(addCartItem(cartItem)),
    clearLocalItemFromCart: cartItem => dispatch(clearItemFromLocalCart(cartItem)),
    removeLocalItem: cartItem => dispatch(removeLocalCartItem(cartItem)),
    addLocalItem: cartItem => dispatch(addLocalCartItem(cartItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);