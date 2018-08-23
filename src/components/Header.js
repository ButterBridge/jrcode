import React from 'react';
import Streamer from './Streamer';
import Navigation from './Navigation';

const Header = ({colours, siteName}) => {
    return (
        <div style={{
            position : 'fixed',
            zIndex : 1,
            background: 'linear-gradient(0deg, rgba(255,255,255,0) 15%, rgba(255,255,255,1) 15%)'

        }}>
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