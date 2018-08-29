import React from 'react';
import Streamer from './Streamer';
import Navigation from './Navigation';

const Header = ({colours, siteName}) => {
    return (
        <div className="grid-header">
            <Navigation 
                colour={colours[siteName.length]}
            />
            <Streamer
                colours={colours.slice(0, -1)}
            />
        </div>
    );
};

export default Header;