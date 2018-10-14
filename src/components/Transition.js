import React from "react";
import PT from "prop-types";
import { Transition as ReactTransition } from "react-transition-group";
import composeTransitionStyles from "../utils/transitions";

const timeout = 250;

class Transition extends React.Component {
  render() {
    const {
      additionalTimeout = 0,
      actions = ["fade"],
      children,
      style: additionalStyle
    } = this.props;

    const transitionProps = {
      timeout: {
        enter: additionalTimeout,
        exit: timeout
      },
      appear: true,
      in: true
    };

    return (
      <ReactTransition {...transitionProps}>
        {status => (
          <div
            style={{
              ...composeTransitionStyles({ status, timeout, actions }),
              ...additionalStyle
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    );
  }
}

Transition.propTypes = {
  children: PT.object.isRequired,
  additionalTimeout: PT.number,
  actions: PT.arrayOf(PT.string),
  style: PT.object
};

export default Transition;
