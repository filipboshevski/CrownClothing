import React from 'react';

import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';

import './CartIcon.scss';
import {toggleCartHidden} from '../../redux/cart/CartActions';
import { connect } from 'react-redux';

import { SelectCartItemCount, SelectLocalCartItemCount } from '../../redux/cart/CartSelectors';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/UserSelectors';

const CartIcon = ({toggleCartHidden, itemCount, localItemCount, currentUser}) => {
        return (
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingBagIcon className='shopping-icon' />
            <span className='item-count'>
                {
                    currentUser ? itemCount : localItemCount
                }
            </span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    localItemCount: SelectLocalCartItemCount,
    itemCount: SelectCartItemCount,
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);