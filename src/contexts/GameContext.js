import React from "react";
import PT from "prop-types";
import { sample, difference } from "lodash";
import { window } from "browser-monads";
import { colours as styleColours } from "../style";
import * as helpers from "../utils/helpers";

export const GameContext = React.createContext("hi");

export class GameProvider extends React.Component {
  state = {
    colours: [],
    progressing: false,
    round: 0,
    timeSpent: 0,
    clock: null,
    rounds: [
      {
        onMouseOverHeadLetter: "swapColourRandomly",
        checkResult: "areAllEqual",
        onPositiveResult: "targetNewColour",
        checkCompletion: "areEquivalent",
        minorProgression: "flash",
        timeToBeat: 100,
        progress: []
      }
    ]
  };

  componentDidUpdate = () => {
    const { round, rounds, timeSpent } = this.state;
    const { timeToBeat } = rounds[round];
    const currentHighScore = window.localStorage.getItem(`round${round}`);
    if (
      timeSpent > 0 &&
      currentHighScore &&
      timeSpent >= Math.min(timeToBeat, currentHighScore)
    ) {
      this.restartRound();
    }
  };

  componentWillUnmount = () => {
    const { clock } = this.state;
    clearInterval(clock);
  };

  generateRandomColours = length => {
    this.setState({
      colours: helpers.fillNewEmptyArray(length, () => sample(styleColours))
    });
  };

  determineCurrentRound = () => {
    const { rounds, round } = this.state;
    return rounds[round];
  };

  getIsNewPersonalBest = () => {
    const { round, timeSpent } = this.state;
    const roundScore = window.localStorage.getItem(`round${round}`);
    return !roundScore || timeSpent < +roundScore;
  };

  onMouseOverHeadLetter = letterIndex => {
    const { clock } = this.state;
    const initialRound = this.determineCurrentRound();
    this[initialRound.onMouseOverHeadLetter](letterIndex, nextColours => {
      if (helpers[initialRound.checkResult](nextColours)) {
        this.triggerProgression(initialRound.minorProgression, () => {
          this[initialRound.onPositiveResult](initialRound, () => {
            const subsequentRound = this.determineCurrentRound();
            if (!clock) this.toggleTheClock();
            if (
              helpers[subsequentRound.checkCompletion](
                subsequentRound.progress,
                styleColours
              )
            ) {
              this.progressToNextRound();
            }
          });
        });
      }
    });
  };

  progressToNextRound = () => {
    const { rounds, round, colours, timeSpent } = this.state;
    if (this.getIsNewPersonalBest()) {
      this.updateLocalScore(round, timeSpent.toString());
    }
    this.toggleTheClock();
    this.setState({
      round: rounds[round + 1] ? round + 1 : 0
    });
    this.triggerProgression("random", () => {
      this.setState({
        rounds: rounds.map(examinedRound => ({
          ...examinedRound,
          progress: []
        }))
      });
      this.generateRandomColours(colours.length);
    });
  };

  restartRound = () => {
    const { rounds } = this.state;
    this.toggleTheClock();
    this.setState({
      rounds: rounds.map(examinedRound => ({
        ...examinedRound,
        progress: []
      }))
    });
  };

  swapColourRandomly = (targetIndex, done) => {
    const { colours: prevColours } = this.state;
    this.setState(
      {
        colours: prevColours.map(
          (colour, index) =>
            index === targetIndex ? sample(styleColours) : colour
        )
      },
      () => {
        const { colours: nextColours } = this.state;
        done(nextColours);
      }
    );
  };

  targetNewColour = ({ progress }, done) => {
    const { colours: currentColours, round, rounds } = this.state;
    this.setState(
      {
        colours: currentColours.map(
          (colour, index) =>
            index === currentColours.length - 1
              ? sample(
                  difference(styleColours, [...progress, currentColours[0]])
                )
              : sample(styleColours)
        ),
        rounds: rounds.map((examinedRound, index) => ({
          ...examinedRound,
          progress:
            index === round ? [...progress, currentColours[0]] : progress
        }))
      },
      done
    );
  };

  toggleTheClock = () => {
    const { clock } = this.state;
    if (!clock) {
      const newClock = setInterval(() => {
        const { timeSpent } = this.state;
        this.setState({
          timeSpent: timeSpent + 1
        });
      }, 1000);
      this.setState({ clock: newClock });
    } else {
      clearInterval(clock);
      this.setState({
        clock: null,
        timeSpent: 0
      });
    }
  };

  triggerProgression = (type, cb) => {
    this.setState({
      progressing: type
    });
    setTimeout(() => {
      this.setState(
        {
          progressing: false
        },
        cb
      );
    }, 1000);
  };

  updateLocalScore = (round, score) => {
    window.localStorage.setItem(`round${round}`, score);
  };

  render() {
    const { colours, progressing, rounds, round, timeSpent } = this.state;
    const { children } = this.props;
    const { timeToBeat, progress } = rounds[round];
    const currentHighScore = Math.min(
      timeToBeat,
      +(window.localStorage.getItem(`round${round}`) || timeToBeat)
    );
    return (
      <GameContext.Provider
        value={{
          colours,
          progressing,
          timeSpent,
          round,
          currentHighScore,
          progress,
          onMouseOverHeadLetter: this.onMouseOverHeadLetter,
          generateRandomColours: this.generateRandomColours
        }}
      >
        {children}
      </GameContext.Provider>
    );
  }
}

GameProvider.propTypes = {
  children: PT.object.isRequired
};
