import React from 'react'
import './PreviewCollections.scss';
import CollectionItem from '../collection-item/CollectionItem';
import { withRouter } from 'react-router-dom';

const PreviewCollections = ({ title, items, id, history, match }) => {
    return (
        <div key={id} className='collection-preview'>
            <h1 className='title' onClick={ () => history.push(`${match.path}/${title.toLowerCase()}`) }>{title.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items
                        .filter((item, index) => index < 4)
                        .map((item) => {
                            return <CollectionItem key={item.id} item={item} />
                        })
                }
            </div>
        </div>
    )
}

export default withRouter(PreviewCollections);