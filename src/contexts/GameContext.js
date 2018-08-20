import React from 'react';
import {colours} from '../style';
import {sample} from 'lodash';
import * as helpers from '../utils/helpers';

export const GameContext = React.createContext('hi');

export class GameProvider extends React.Component {
    state = {
        colours: [],
        round : '1',
        '1' : {
            onMouseOverHeadLetter : 'swapColourRandomly',
            checkResult : 'areAllEqual'
        }
    }

    render () {
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
        const round = this.state[this.state.round];
        this[round.onMouseOverHeadLetter](letterIndex, () => {
            if (helpers[round.checkResult](this.state.colours)) {
                console.log('done!')
            } else {
                console.log('not yet!')
            }
        });
    }

    swapColourRandomly = (targetIndex, done) => {
        this.setState({
            colours : this.state.colours.map((font, index) => {
                return index === targetIndex ?
                    sample(colours) :
                    font
            })
        }, done)
    }

}