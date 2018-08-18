import React from "react"
import { Transition as ReactTransition } from "react-transition-group"
import composeTransitionStyles from "../utils/transitions"

const timeout = 250;
const historyExitingEventType = `history::exiting`;

class Transition extends React.Component {
    state = { 
        exiting: false
    }

    listenerHandler = (event) => {
        this.setState({ exiting: true })
    }

    componentDidMount() {
        window.addEventListener(historyExitingEventType, this.listenerHandler)
    }

    componentWillUnmount() {
        window.removeEventListener(historyExitingEventType, this.listenerHandler)
    }

    render() {
        const {additionalTimeout = 0, actions = ['fade']} = this.props;
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
                        }}
                    >
                        {this.props.children}
                    </div>
                )}
            </ReactTransition>
        )
    }
}

export default Transition;