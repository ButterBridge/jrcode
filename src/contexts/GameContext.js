import React from 'react';
import {colours} from '../style';
import {sample, difference} from 'lodash';
import * as helpers from '../utils/helpers';

export const GameContext = React.createContext('hi');

export class GameProvider extends React.Component {
    state = {
        colours: [],
        progressing: false,
        round : 1,
        '1' : {
            onMouseOverHeadLetter : 'swapColourRandomly',
            checkResult : 'areAllEqual',
            onPositiveResult : 'targetNewColour',
            checkCompletion : 'areEquivalent',
            minorProgression : 'flash',
            progress : []
        },
        '2' : {
            onMouseOverHeadLetter : 'swapColourRandomly',
            checkResult : 'doNothing'
        }
    }

    render () {
        const {colours, progressing} = this.state;
        return (
            <GameContext.Provider value={{
                colours,
                progressing,
                onMouseOverHeadLetter : this.onMouseOverHeadLetter,              
                generateRandomColours : this.generateRandomColours,
            }}>
                {this.props.children}
            </GameContext.Provider>
        )
    }


    generateRandomColours = length => {
        this.setState({
            colours : Array(length).fill().map(x => sample(colours))
        })
    }

    onMouseOverHeadLetter = letterIndex => {
        let round = this.state[this.state.round];
        this[round.onMouseOverHeadLetter](letterIndex, () => {
            if (helpers[round.checkResult](this.state.colours)) {
                this.triggerProgression(round.minorProgression, () => {
                    this[round.onPositiveResult](round, () => {
                        round = this.state[this.state.round];
                        if (helpers[round.checkCompletion](round.progress, colours)) {
                            this.progressToNextRound();
                        }
                    });
                });
            }
        });
    }

    progressToNextRound = () => {
        const {round, colours} = this.state;
        this.setState({
            round : round + 1,
            progressing : 'nextRound'
        });
        this.triggerProgression('random', () => {
            this.generateRandomColours(colours.length);
        });
    }

    swapColourRandomly = (targetIndex, done) => {
        this.setState({
            colours : this.state.colours.map((colour, index) => {
                return index === targetIndex ?
                    sample(colours) :
                    colour
            })
        }, done)
    }

    targetNewColour = ({progress}, done) => {
        const {colours : currentColours, round} = this.state;
        this.setState({
            colours : currentColours.map((colour, index) => {
                return index === currentColours.length - 1 ? 
                    sample(difference(colours, [...progress, currentColours[0]])) :
                    sample(colours)
            }),
            [round] : {
                ...this.state[round],
                progress : [...progress, currentColours[0]]
            },
            progressing : 'flash'
        }, done);
    }

    triggerProgression = (type, cb) => {
        this.setState({
            progressing : type
        })
        setTimeout(() => {
            cb();
            this.setState({
                progressing : false
            })
        }, 1000)
    }
}