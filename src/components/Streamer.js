import React from 'react';
import { Rect } from '../styled-components';

const Streamer = ({colours}) => {
    console.log(colours);
    return (
        <div className="grid-streamer">
            {Array(50).fill().map((x, i) => {
                return <Rect
                    colour={colours[i % colours.length]}
                    gridCols={{
                        from: i + 1,
                        to: i + 2
                    }}
                >
                    
                </Rect>
            })}
        </div>
    );
};

export default Streamer;