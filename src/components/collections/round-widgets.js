import React from "react";
import PT from "prop-types";
import { window } from "browser-monads";
import { Window, Block, Strong, Opener } from "../../styled-components";
import { colours } from "../../style";

const roundWidgetGetters = [
  class extends React.Component {
    static propTypes = {
      isSmall: PT.bool,
      displayColours: PT.arrayOf(PT.string).isRequired,
      timeSpent: PT.number.isRequired,
      withFeedback: PT.bool
    };

    render() {
      const {
        isSmall,
        displayColours = colours,
        timeSpent,
        withFeedback
      } = this.props;
      const roundScore = window.localStorage.getItem("round1");
      const feedback = roundScore
        ? `Personal Best: ${roundScore}`
        : "Align all colours to begin";
      return (
        <div className="grid-widget">
          <div className="grid-widget-status">
            <Window
              borderColour={isSmall ? "white" : "black"}
              style={{ maxWidth: "20vw" }}
              moveDown={withFeedback ? "0" : "1.5"}
              colour="white"
            >
              {displayColours.map((colour, i) => (
                <Block key={i} colour={colour} />
              ))}
              {timeSpent > 0 && <Strong>{`${timeSpent}s`}</Strong>}
            </Window>
          </div>
          {withFeedback && (
            <Opener className="grid-widget-feedback">{feedback}</Opener>
          )}
        </div>
      );
    }
  }
];

export default roundWidgetGetters;
