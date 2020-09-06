import React from 'react';

import './Collection.scss';
import { connect } from 'react-redux';
import { selectCollection } from '../../../redux/shop/ShopSelectors';
import CollectionItem from '../../collection-item/CollectionItem';
import { setShopData } from '../../../redux/shop/ShopAction';
import { convertCollectionsToArray, firestore } from '../../firebase/FirebaseUtilities';

class Collection extends React.Component {
    
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { setShopData } = this.props;
        const collectionRef = firestore.collection('collections');
            
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot => {
            const collections = convertCollectionsToArray(snapShot);
            setShopData(collections);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    render() {
        const { collection: {title, items} } = this.props;
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
}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

const mapDispatchToProps = dispatch => ({
    setShopData: collections => dispatch(setShopData(collections))
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection);