import React from 'react';

import './CollectionItem.scss';
import CustomButton from '../custom-button/CustomButton';
import { connect } from 'react-redux';
import { addCartItem } from '../../redux/cart/CartActions';

const CollectionItem = ({item, addItem}) => {
    const {id, name, price, imageUrl} = item;
    return (
        <div key={id} className='collection-item'>
            <div className='image' style={{backgroundImage: `url(${imageUrl})`}} />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>$ {price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted>ADD TO CART</CustomButton>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addCartItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);