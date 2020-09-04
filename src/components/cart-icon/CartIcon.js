import React from 'react';

import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';

import './CartIcon.scss';
import {toggleCartHidden} from '../../redux/cart/CartActions';
import { connect } from 'react-redux';

import { SelectCartItemCount } from '../../redux/cart/CartSelectors';
import { createStructuredSelector } from 'reselect';

const CartIcon = ({toggleCartHidden, itemCount}) => {
        return (
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingBagIcon className='shopping-icon' />
            <span className='item-count'>
                {itemCount}
            </span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    itemCount: SelectCartItemCount
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);