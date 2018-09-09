import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Streamer from './Streamer';
import Navigation from './Navigation';
import Transition from './Transition';

const Header = ({ colours, siteName, isSmall, location, progress, progressing, timeSpent, isHeaderRevealed, toggleForceReveal, round, currentHighScore }) => {
  return (
    <div className={`grid-header${isHeaderRevealed ? '' : '-hidden'}`}>
      <Transition
        actions={[isHeaderRevealed ? 'descend' : 'ascend']}
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
              round={round}
              toggleForceReveal={toggleForceReveal}
            />
          </div>
          <div className="grid-header-streamer">
            <Streamer
              colours={colours.slice(0, -1)}
              isSmall={isSmall}
              timeSpent={timeSpent}
              currentHighScore={currentHighScore}
            />
          </div>
        </Fragment>
      </Transition>
    </div>
  );
};

Header.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.string).isRequired,
  siteName: PropTypes.string.isRequired,
  isSmall: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  progressing: PropTypes.bool.isRequired,
  progress: PropTypes.array,
  timeSpent: PropTypes.number.isRequired,
  isHeaderRevealed: PropTypes.bool.isRequired,
  toggleForceReveal: PropTypes.func.isRequired,
  round: PropTypes.number.isRequired,
  currentHighScore: PropTypes.number.isRequired
}

export default Header;