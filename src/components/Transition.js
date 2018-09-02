import React from "react";
import PT from 'prop-types';
import { Transition as ReactTransition } from "react-transition-group";
import composeTransitionStyles from "../utils/transitions";
import { window } from 'browser-monads';

const timeout = 250;
const historyExitingEventType = `history::exiting`;

class Transition extends React.Component {
    state = { 
        exiting: false
    }

    listenerHandler = (event) => {
        this.setState({ exiting: true });
    }

    componentDidMount() {
        window.addEventListener(historyExitingEventType, this.listenerHandler);
    }

    componentWillUnmount() {
        window.removeEventListener(historyExitingEventType, this.listenerHandler);
    }

    render() {
        const {additionalTimeout = 0, actions = ['fade'], children, style : additionalStyle} = this.props;
        const {exiting} = this.state;

        const transitionProps = {
            timeout: {
                enter: additionalTimeout,
                exit: timeout,
            },
            appear: true,
            in: !exiting,
        }

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
        )
    }
}

Transition.propTypes = {
    children : PT.object.isRequired,
    additionalTimeout : PT.number,
    actions : PT.arrayOf(PT.string),
    style : PT.object
}

export default Transition;