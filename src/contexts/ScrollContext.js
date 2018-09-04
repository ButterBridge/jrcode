import React from 'react';
import { window } from 'browser-monads';
import { throttle } from 'lodash';

export const ScrollContext = React.createContext();

export class ScrollProvider extends React.Component {
    state = {
        scrollY: window.scrollY,
        scrollDir: null,
        listeningForScrollEnd: false,
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
        window.addEventListener('scroll', this.throttledListenToScrolling)
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.throttledListenToScrolling)
    }

    throttledListenToScrolling = throttle(() => {
        const {scrollY : currentScrollY, scrollDir, listeningForScrollEnd} = this.state;
        // if (!listeningForScrollEnd) this.listenForEndOfScrolling()
        this.setState({
            scrollY: window.scrollY,
            scrollDir: window.scrollY > currentScrollY ? 'down' : 'up',
            listeningForScrollEnd: true
        });
    }, 200);

    listenForEndOfScrolling = () => {
        const {scrollY : currentScrollY, scrollDir} = this.state;
        const hasScrollEnded = window.scrollY === currentScrollY;
        if (hasScrollEnded) {
            this.setState({
                scrollY: window.scrollY,
                scrollDir: null,
                listeningForScrollEnd: false
            })
        } else {
            setTimeout(this.listenForEndOfScrolling(), 1000);
        }
    }

    toggleForceReveal = () => {
        this.setState({
            forceReveal: !this.state.forceReveal
        })
    }
}