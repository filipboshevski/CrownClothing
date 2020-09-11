import React from 'react';

import './CollectionsOverview.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/ShopSelectors';

import PreviewCollections from '../preview-collections/PreviewCollections';

const CollectionsOverview = ({collection}) => {
    return (
        <div className='collections-overview'>
            {
                collection.map(({id, ...otherCollectionProps}) => (
                    <PreviewCollections key={id} {...otherCollectionProps} />
                ))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collection: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);