import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const publishableKey = 'pk_test_51HNbdaDSas5LF9soBrsnmi5OOZ4hS43PEA5dJUVBzv75BLIsyQHLrbsrY35rrNDmXsQuJvJ5hqawrsTuR78lRCLD00wCpC4qWy';
    const priceForStripe = price * 100;
    
    const onToken = token => console.log(token);

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

export default StripeCheckoutButton;