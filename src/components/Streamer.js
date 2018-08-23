import React from 'react';
import { Rect } from '../styled-components';

const Streamer = ({colours}) => {
    console.log(colours);
    return (
        <div className="grid-streamer">
            {Array(50).fill().map((x, i) => {
                const borderRadius = {};
                if (i === 0) {
                    borderRadius.tl = '15px';
                    borderRadius.bl = '15px';
                }
                if (i === 49) {
                    borderRadius.tr = '15px';
                    borderRadius.br = '15px';
                }
                return <Rect
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