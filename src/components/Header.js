import React from 'react';
import Streamer from './Streamer';
import Navigation from './Navigation';

const Header = ({colours, siteName, isSmall}) => {
    return (
        <div className="grid-header">
            <div className="grid-header-navigation">
                <Navigation 
                    colour={colours[siteName.length]}
                    isSmall={isSmall}
                />
            </div>
            <div className="grid-header-streamer">
                <Streamer
                    colours={colours.slice(0, -1)}
                    isSmall={isSmall}
                />
            </div>
        </div>
    );
};

export default Header;