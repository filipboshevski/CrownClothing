import React from 'react';
import './Directory.scss';

import MenuItem from '../menu-item/MenuItem';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/DirectorySelectors';
import { connect } from 'react-redux';

const Directory = ({sections}) => {
    return (
        <div className='directory-menu'>
            {
                sections.map(({id, ...otherSectionsProps}) => {
                    return <MenuItem key={id} {...otherSectionsProps} />;
                })
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);