import React, { Fragment } from 'react';
import { window } from 'browser-monads';
import { Window, Block, Strong, Opener } from '../../styled-components';
import { colours } from '../../style';

const roundWidgetGetters = [
    class extends React.Component {
        render () {
            const {isSmall, displayColours = colours, timeSpent, withFeedback} = this.props;
            const roundScore = window.localStorage.getItem('round1');
            return <div className='grid-widget'>
                <div className='grid-widget-status'>
                    <Window
                        borderColour={isSmall ? 'white' : 'black'}
                        style={{ maxWidth : '20vw' }}
                        moveDown={withFeedback ? '0' : '1.5'}
                        colour="white"
                    >
                        {displayColours.map((colour, i) => {
                            return <Block
                                key={i}
                                colour={colour}
                            />
                        })}
                        {timeSpent > 0 && <Strong>{timeSpent}s</Strong>}
                    </Window>
                </div>
                {withFeedback && <Opener
                    className='grid-widget-feedback'
                >
                    Personal Best: {roundScore}
                </Opener>}
            </div>
        }
    }
]

export default roundWidgetGetters;