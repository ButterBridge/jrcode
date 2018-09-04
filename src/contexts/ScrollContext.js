import React from 'react';
import { window } from 'browser-monads';
import { throttle } from 'lodash';

export const ScrollContext = React.createContext();

export class ScrollProvider extends React.Component {
    state = {
        scrollY: window.scrollY,
        scrollDir: null,
        forceReveal: false
    }

    render () {
        const {scrollDir, scrollY, forceReveal} = this.state;
        return <ScrollContext.Provider
            value={{
                scrollDir, scrollY, forceReveal,
                toggleForceReveal: this.toggleForceReveal
            }}
        >
            {this.props.children}
        </ScrollContext.Provider>
    }

    componentDidMount () {
        window.addEventListener('scroll', this.throttledListenToScrolling);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.throttledListenToScrolling);
    }

    throttledListenToScrolling = throttle(() => {
        const {scrollY : currentScrollY, scrollDir} = this.state;
        const atBottom = window.screen.availHeight - window.scrollY < 80;
        this.setState({
            scrollY: window.scrollY,
            scrollDir: window.scrollY > currentScrollY || atBottom ? 'down' : 'up'
        });
    }, 300);

    toggleForceReveal = () => {
        this.setState({
            forceReveal: !this.state.forceReveal
        })
    }
}