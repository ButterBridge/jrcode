import React from 'react';
import { Window, Block, Strong } from '../../styled-components';

const roundWidgetGetters = [
    ({isSmall, displayColours, timeSpent}) => <Window
        borderColour={isSmall ? 'white' : 'black'}
    >
        {displayColours.map((colour, i) => {
            return <Block
                key={i}
                colour={colour}
            />
        })}
        <Strong>{timeSpent}s</Strong>
    </Window>
]

export default roundWidgetGetters;