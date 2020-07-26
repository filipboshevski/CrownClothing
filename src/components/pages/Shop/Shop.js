import React, { Component } from 'react';
import SHOP_DATA from './ShopData';
import PreviewCollections from '../../preview-collections/PreviewCollections';


class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const {collections} = this.state;
        return (
        <div>
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <PreviewCollections key={id} {...otherCollectionProps} />
                ))
            }
        </div>
        );
    }
}

export default Shop;