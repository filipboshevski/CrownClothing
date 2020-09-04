import React from 'react';
import CollectionsOverview from '../../collections-overview/CollectionsOverview';
import Collection from '../Collection/Collection';
import { Route } from 'react-router-dom';


const Shop = ({ match }) => {
    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={Collection} />
        </div>
    );
}


export default Shop;