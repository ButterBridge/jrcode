import React from 'react';
import {colours} from '../style';
import {sample} from 'lodash';

export const GameContext = React.createContext('hi');

export class GameProvider extends React.Component {
    state = {
        colours: []
    }

    render () {
        return (
            <GameContext.Provider value={{
                ...this.state,
                generateRandomColours : this.generateRandomColours,
                swapColourRandomly : this.swapColourRandomly
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

    swapColourRandomly = targetIndex => {
        this.setState({
            colours : this.state.colours.map((font, index) => {
                return index === targetIndex ?
                    sample(colours) :
                    font
            })
        })
    }

}