import React from 'react';
import CollectionsOverview from '../../collections-overview/CollectionsOverview';
import Collection from '../Collection/Collection';
import { Route } from 'react-router-dom';
import { firestore } from '../../firebase/FirebaseUtilities';
import { fetchCollectionsStart } from '../../../redux/shop/ShopAction';
import { connect } from 'react-redux';
import WithSpinner from '../../spinner/WithSpinner';
import { isCollectionLoaded } from '../../../redux/shop/ShopSelectors';
import { createStructuredSelector } from 'reselect';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);


class Shop extends React.Component {
    
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        const collectionRef = firestore.collection('collections');
        
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot => {
            fetchCollectionsStart();
        });
    }
    
    render() {
        const { match, isCollectionLoaded } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionLoaded} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionWithSpinner isLoading={!isCollectionLoaded} {...props} />} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionLoaded: isCollectionLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(mapStateToProps, mapDispatchToProps)(Shop);