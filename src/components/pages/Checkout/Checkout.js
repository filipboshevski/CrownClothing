import React from 'react';

import './Checkout.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, SelectCartTotal, selectLocalCartItems, SelectLocalCartTotal } from '../../../redux/cart/CartSelectors';
import { connect } from 'react-redux';
import CheckoutItem from '../../checkout-item/CheckoutItem';
import StripeCheckoutButton from '../../stripe-button/StripeButton';
import { selectCurrentUser } from '../../../redux/user/UserSelectors';

const Checkout = ({cartItems, localCartItems, currentUser, total, localTotal}) => {
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
                currentUser ? cartItems.map( cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} /> ) : localCartItems.map( cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} /> )
            }
            <div className='total'>
                TOTAL: ${currentUser ? total : localTotal}
            </div>
            <div className='test-warning'>
                *Please use the following test credit card for payments*
                <br />
                4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
            </div>
            <StripeCheckoutButton price={currentUser ? total : localTotal} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    localCartItems: selectLocalCartItems,
    currentUser: selectCurrentUser,
    total: SelectCartTotal,
    localTotal: SelectLocalCartTotal
});

export default connect(mapStateToProps)(Checkout);