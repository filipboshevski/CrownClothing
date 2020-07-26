import React from 'react';
import { withRouter } from 'react-router-dom';
import './MenuItem.scss';

const MenuItem = ({title, imageUrl, size, history, match, urlLink}) => {
    return (
        <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${urlLink}`)}>
            <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}}></div>
                <div className='content'>
                    <h1 className='title'>{title.toUpperCase()}</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>
    )
}

export default withRouter(MenuItem);