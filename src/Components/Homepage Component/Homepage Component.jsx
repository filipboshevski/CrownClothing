import React from 'react';
import './Homepage Component.scss';

const HomePage = () => {
    return (
    <div>
        <div className='homepage'>
          <div className='directory-menu'>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>HATS</h1>
                    <p className='subtitle'>SHOP NOW</p>
                </div>
            </div>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>SWEATERS</h1>
                    <p className='subtitle'>SHOP NOW</p>
                </div>
            </div>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>SNEAKERS</h1>
                    <p className='subtitle'>SHOP NOW</p>
                </div>
            </div>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>WOMENS</h1>
                    <p className='subtitle'>SHOP NOW</p>
                </div>
            </div>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='title'>MENS</h1>
                    <p className='subtitle'>SHOP NOW</p>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default HomePage;