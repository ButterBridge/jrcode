import React from 'react';
import { window, document } from 'browser-monads';
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
        const atBottom = this.getAmountScrolled() > 90;
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

    getAmountScrolled(){
        const windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
        const documentHeight = this.getDocHeight();
        const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        const trackLength = documentHeight - windowHeight;
        return Math.floor(scrollTop / trackLength * 100);
    }

    getDocHeight() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        )
    }
}