import React from 'react';
import CollectionsOverview from '../../collections-overview/CollectionsOverview';
import Collection from '../Collection/Collection';
import { Route } from 'react-router-dom';
import { firestore, convertCollectionsToArray } from '../../firebase/FirebaseUtilities';
import { setShopData } from '../../../redux/shop/ShopAction';
import { connect } from 'react-redux';


class Shop extends React.Component {
    
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { setShopData } = this.props;
        const collectionRef = firestore.collection('collections');
        
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot => {
            const collections = convertCollectionsToArray(snapShot);
            setShopData(collections);
        });
    }
    
    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={Collection} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setShopData: collections => dispatch(setShopData(collections))
})


export default connect(null, mapDispatchToProps)(Shop);