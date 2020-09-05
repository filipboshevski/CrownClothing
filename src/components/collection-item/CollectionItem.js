import React from 'react';

import './CollectionItem.scss';
import CustomButton from '../custom-button/CustomButton';
import { connect } from 'react-redux';
import { addCartItem, addLocalCartItem } from '../../redux/cart/CartActions';
import { selectCurrentUser } from '../../redux/user/UserSelectors';
import { createStructuredSelector } from 'reselect';

const CollectionItem = ({item, addItem, addLocalItem, currentUser}) => {
    const {id, name, price, imageUrl} = item;
    return (
        <div key={id} className='collection-item'>
            <div className='image' style={{backgroundImage: `url(${imageUrl})`}} />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>$ {price}</span>
            </div>
            <CustomButton onClick={() => { currentUser ? addItem(item) : addLocalItem(item) }} inverted>ADD TO CART</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addCartItem(item)),
    addLocalItem: item => dispatch(addLocalCartItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);