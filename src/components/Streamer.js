import React from 'react';
import { Rect } from '../styled-components';

const Streamer = ({colours, isSmall}) => {
    const streamerLength = 100;
    return (
        <div className={`grid-streamer${isSmall ? '-mini' : ''}`}>
            {Array(streamerLength).fill().map((x, i) => {
                const borderRadius = {};
                if (i === 0) {
                    borderRadius.bl = '15px';
                }
                if (i === streamerLength - 1) {
                    borderRadius.br = '15px';
                }
                return <Rect
                    key={i}
                    colour={colours[i % colours.length]}
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

export default Streamer;