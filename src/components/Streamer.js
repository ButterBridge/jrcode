import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from '../styled-components';

const Streamer = ({ colours, isSmall, timeSpent, currentHighScore }) => {
  const streamerLength = 100;
  return (
    <div className={`grid-streamer${isSmall ? '-mini' : ''}`}>
      {Array(streamerLength).fill().map((x, i, arr) => {
        let colour = timeSpent === 0 ?
          colours[i % colours.length] :
          i > arr.length / currentHighScore * timeSpent ?
            colours[i % colours.length] :
            'white'
        const borderRadius = {};
        if (i === 0) {
          borderRadius.bl = '15px';
        }
        if (i === streamerLength - 1) {
          borderRadius.br = '15px';
        }
        return <Rect
          key={i}
          colour={colour}
          gridCols={{
            from: i + 1,
            to: i + 2
          }}
          borderRadius={borderRadius}
        />
      })}
    </div>
  );
};


Streamer.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.string).isRequired,
  isSmall: PropTypes.bool.isRequired,
  timeSpent: PropTypes.number.isRequired,
  currentHighScore: PropTypes.number.isRequired
}

export default Streamer;