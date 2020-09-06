import React from 'react';
import CollectionsOverview from '../../collections-overview/CollectionsOverview';
import Collection from '../Collection/Collection';
import { Route } from 'react-router-dom';
import { firestore, convertCollectionsToArray } from '../../firebase/FirebaseUtilities';
import { setShopData } from '../../../redux/shop/ShopAction';
import { connect } from 'react-redux';
import WithSpinner from '../../spinner/WithSpinner';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);


class Shop extends React.Component {
    state = {
        loading: true
    };
    
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { setShopData } = this.props;
        const collectionRef = firestore.collection('collections');
        
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot => {
            const collections = convertCollectionsToArray(snapShot);
            setShopData(collections);
            this.setState({ loading: false });
        });
    }
    
    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionWithSpinner isLoading={loading} {...props} />} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setShopData: collections => dispatch(setShopData(collections))
})


export default connect(null, mapDispatchToProps)(Shop);