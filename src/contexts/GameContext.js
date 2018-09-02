import React from 'react';
import {colours} from '../style';
import {sample, difference} from 'lodash';
import * as helpers from '../utils/helpers';

export const GameContext = React.createContext('hi');

export class GameProvider extends React.Component {
    state = {
        colours: [],
        progressing: false,
        round: 1,
        timeSpent: 0,
        clock: null, 
        '1' : {
            onMouseOverHeadLetter : 'swapColourRandomly',
            checkResult : 'areAllEqual',
            onPositiveResult : 'targetNewColour',
            checkCompletion : 'areEquivalent',
            minorProgression : 'flash',
            progress : []
        }
    }

    render () {
        const {colours, progressing, round, timeSpent} = this.state;
        return (
            <GameContext.Provider value={{
                colours,
                progressing,
                timeSpent,
                progress: this.state[round].progress,
                onMouseOverHeadLetter: this.onMouseOverHeadLetter,              
                generateRandomColours: this.generateRandomColours,
            }}>
                {this.props.children}
            </GameContext.Provider>
        )
    }

    componentWillUnmount = () => {
        const { clock } = this.state;
        clearInterval(clock);
    }

    

    generateRandomColours = length => {
        this.setState({
            colours : Array(length).fill().map(() => sample(colours))
        })
    }

    getIsNewPersonalBest = () => {
        const { round, timeSpent } = this.state;
        const roundScore = localStorage.getItem(round);
        return !roundScore || timeSpent < +roundScore;
    }

    onMouseOverHeadLetter = letterIndex => {
        const { clock } = this.state;
        let round = this.state[this.state.round];
        this[round.onMouseOverHeadLetter](letterIndex, () => {
            if (helpers[round.checkResult](this.state.colours)) {
                this.triggerProgression(round.minorProgression, () => {
                    this[round.onPositiveResult](round, () => {
                        round = this.state[this.state.round];
                        if (!clock) this.toggleTheClock();
                        if (helpers[round.checkCompletion](round.progress, colours)) {
                            this.progressToNextRound();
                        } 
                    });
                });
            }
        });
    }

    progressToNextRound = () => {
        const { round, colours, clock, timeSpent } = this.state;
        let newPersonalBest = false;
        if (this.getIsNewPersonalBest()) {
            this.updateLocalScore();
            newPersonalBest = true;
        }
        this.toggleTheClock();
        this.setState({
            round: this.state[round + 1] ? round + 1 : 1,
        });
        this.triggerProgression('random', () => {
            this.setState({
                [round]: {
                    ...this.state[round],
                    progress: []
                }
            });
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

    toggleTheClock = () => {
        const { clock } = this.state;
        if (!clock) {
            const newClock = setInterval(() => {
                this.setState({
                    timeSpent: this.state.timeSpent + 1
                })
            }, 1000);
            this.setState({ clock: newClock })
        } else {
            clearInterval(clock);
            this.setState({ 
                clock: null ,
                timeSpent: 0
            })
        }
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
        }, done);
    }

    triggerProgression = (type, cb) => {
        this.setState({
            progressing : type
        })
        setTimeout(() => {
            this.setState({
                progressing : false
            }, cb)
        }, 1000)
    }

    updateLocalScore = () => {
        const { round, timeSpent } = this.state;
        localStorage.setItem(round, timeSpent.toString());
    }
}