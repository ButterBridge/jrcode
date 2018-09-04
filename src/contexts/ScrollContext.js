import React from 'react';
import {throttle} from 'lodash';

export const ScrollContext = React.createContext();

export class ScrollProvider extends React.Component {
    state = {
        scrollY: window.scrollY,
        scrollDir: null,
        listeningForScrollEnd: false
    }

    render () {
        const {scrollDir, scrollY} = this.state;
        return <ScrollContext.Provider
            value={{
                scrollDir, scrollY
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
        if (!listeningForScrollEnd) this.listenForEndOfScrolling()
        this.setState({
            scrollY: window.scrollY,
            scrollDir: window.scrollY > currentScrollY ? 'down' : 'up',
            listeningForScrollEnd: true
        });
    }, 500);

    listenForEndOfScrolling = () => {
        const {scrollY : currentScrollY, scrollDir} = this.state;
        setTimeout(() => {
            const hasScrollEnded = window.scrollY === currentScrollY;
            console.log({hasScrollEnded});
            if (hasScrollEnded) {
                this.setState({
                    scrollY: window.scrollY,
                    scrollDir: null,
                    listeningForScrollEnd: false
                })
            } else {
                this.listenForEndOfScrolling();
            }
        }, 1000);
    }
}