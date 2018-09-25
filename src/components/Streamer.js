import React from 'react';
import PropTypes from 'prop-types';
import Transition from './Transition';
import { Rect } from '../styled-components';
import { fillNewEmptyArray } from '../utils/helpers';

const Streamer = ({ colours, isSmall, timeSpent, currentHighScore }) => {
  const streamerLength = 100;
  return (
    <div className={`grid-streamer${isSmall ? '-mini' : ''}`}>
      {fillNewEmptyArray(streamerLength, (x, i, arr) => {
        const colour = 
          (currentHighScore && i < arr.length / currentHighScore * timeSpent) ||
          timeSpent === 0 ? 
            'whitesmoke' : 
            colours[i % colours.length];
        const borderRadius = {};
        if (i === 0) {
          borderRadius.bl = '15px';
        }
        if (i === streamerLength - 1) {
          borderRadius.br = '15px';
        }
        if (i === 50) console.log(colour)
        return <Transition
          additionalTimeout={i*20}
          key={i}
        >
          <Rect
            colour={colour}
            gridCols={{
              from: i + 1,
              to: i + 2
            }}
            borderRadius={borderRadius}
          />
        </Transition>
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