import React from 'react';

import './Collection.scss';
import { connect } from 'react-redux';
import { selectCollection } from '../../../redux/shop/ShopSelectors';
import CollectionItem from '../../collection-item/CollectionItem';

const Collection = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map( item => <CollectionItem key={item.id} item={item} /> )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(Collection);