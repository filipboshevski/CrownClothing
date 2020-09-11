import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { setCartItems, setLocalCartItems } from '../../redux/cart/CartActions';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/UserSelectors';

const StripeCheckoutButton = ({price, clearLocalCart, clearCart, currentUser}) => {
    const publishableKey = 'pk_test_51HNbdaDSas5LF9soBrsnmi5OOZ4hS43PEA5dJUVBzv75BLIsyQHLrbsrY35rrNDmXsQuJvJ5hqawrsTuR78lRCLD00wCpC4qWy';
    const priceForStripe = price * 100;
    
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
        .then(() => {
            if (currentUser) clearCart([]);
            else { clearLocalCart([]) };
            alert('Payment successful!');
        })
        .catch(error => {
            console.log(`Payment error: ${JSON.parse(error)}`);
            alert('There was an error during the payment. Please make sure you used the provided credit card.');
        });
    };

    return (
        <StripeCheckout 
            name='Crown Clothing Ltd.'
            description={`Your total is $${price}`}
            image='https://svgshare.com/i/CUz.svg'
            amount={priceForStripe}
            shippingAddress
            billingAddress
            label='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    clearLocalCart: localCart => dispatch(setLocalCartItems(localCart)),
    clearCart: cart => dispatch(setCartItems(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton);