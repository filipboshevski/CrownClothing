import React from 'react';

import './Checkout.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, SelectCartTotal } from '../../../redux/cart/CartSelectors';
import { connect } from 'react-redux';
import CheckoutItem from '../../checkout-item/CheckoutItem';
import StripeCheckoutButton from '../../stripe-button/StripeButton';

const Checkout = ({cartItems, total}) => {
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map( cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} /> )
            }
            <div className='total'>
                TOTAL: ${total}
            </div>
            <StripeCheckoutButton price={total} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: SelectCartTotal
});

export default connect(mapStateToProps)(Checkout);