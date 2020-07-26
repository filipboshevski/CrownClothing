import React from 'react'
import './PreviewCollection.scss';
import CollectionItem from '../collection-item/CollectionItem';


const PreviewCollections = ({ title, items, id }) => {
    return (
        <div key={id} className='collection-preview'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items
                        .filter((item, index) => index < 4)
                        .map(({id, ...otherItemProps}) => {
                            return <CollectionItem key={id} {...otherItemProps} />
                        })
                }
            </div>
        </div>
    )
}

export default PreviewCollections;