import React from 'react';

import './CheckoutItem.scss';
import { clearItemFromCart, removeCartItem, addCartItem } from '../../redux/cart/CartActions';
import { connect } from 'react-redux';

const CheckoutItem = ({ cartItem, clearItemFromCart, removeCartItem, addCartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <div className='quantity' style={{fontSize: 'inherit'}}>
                <div className='arrow' onClick={() => removeCartItem(cartItem)} >&#10094;</div>
                <div className='value'>{quantity}</div>
                <div className='arrow' onClick={() => addCartItem(cartItem)} >&#10095;</div>
            </div>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItemFromCart(cartItem)} >&#10005;</div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    clearItemFromCart: cartItem => dispatch(clearItemFromCart(cartItem)),
    removeCartItem: cartItem => dispatch(removeCartItem(cartItem)),
    addCartItem: cartItem => dispatch(addCartItem(cartItem))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);