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
            progress : []
        }
    }

    render () {
        console.log(this.state.round)
        return (
            <GameContext.Provider value={{
                colours : this.state.colours,
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
                console.log('check good!');
                this[round.onPositiveResult](round, () => {
                    round = this.state[this.state.round];
                    if (helpers[round.checkCompletion](round.progress, colours)) {
                        this.progressToNextRound();
                    }
                });
            }
        });
    }

    progressToNextRound = () => {
        this.setState({
            round : this.state.round + 1
        })
    }

    swapColourRandomly = (targetIndex, done) => {
        this.setState({
            colours : this.state.colours.map((colour, index) => {
                return index === targetIndex ?
                    sample(colours) :
                    colour
            })
        }, () => {
            console.log(this.state.colours);
            done();
        })
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
            }
        }, done)        
    }

}