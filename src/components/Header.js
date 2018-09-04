import React, { Fragment } from 'react';
import Streamer from './Streamer';
import Navigation from './Navigation';
import Transition from './Transition';

const Header = ({colours, siteName, isSmall, location, progress, progressing, timeSpent, scrollDir, scrollPos, toggleForceReveal, forceReveal}) => {
    const isRevealed = scrollDir === 'up' || scrollY === 0 || forceReveal;
    return (
        <div className={`grid-header${isRevealed ? '' : '-hidden'}`}>
            <Transition
                actions={[isRevealed ? 'descend' : 'ascend']}
            >
                <Fragment>
                    <div className="grid-header-navigation">
                        <Navigation 
                            colour={colours[siteName.length]}
                            isSmall={isSmall}
                            location={location}
                            progress={progress}
                            progressing={progressing}
                            timeSpent={timeSpent}
                            toggleForceReveal={toggleForceReveal}
                        />
                    </div>
                    <div className="grid-header-streamer">
                        <Streamer
                            colours={colours.slice(0, -1)}
                            isSmall={isSmall}
                        />
                    </div>
                </Fragment>
            </Transition>
        </div>
    );
};

export default Header;