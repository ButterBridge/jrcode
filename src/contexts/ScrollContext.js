import React from "react";
import PT from "prop-types";
import { window, document } from "browser-monads";
import { throttle } from "lodash";
import { getAmountScrolled } from "../utils/helpers";

export const ScrollContext = React.createContext();

export class ScrollProvider extends React.Component {
  state = {
    scrollY: window.scrollY,
    scrollDir: null,
    forceReveal: false
  };

  throttledListenToScrolling = throttle(() => {
    const { scrollY: currentScrollY } = this.state;
    const atBottom = getAmountScrolled(window, document) > 90;
    this.setState({
      scrollY: window.scrollY,
      scrollDir: window.scrollY > currentScrollY || atBottom ? "down" : "up"
    });
  }, 300);

  componentDidMount() {
    window.addEventListener("scroll", this.throttledListenToScrolling);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledListenToScrolling);
  }

  toggleForceReveal = bool => {
    const { forceReveal } = this.state;
    this.setState({
      forceReveal: bool || forceReveal
    });
  };

  render() {
    const { scrollDir, scrollY, forceReveal } = this.state;
    const { children } = this.props;
    return (
      <ScrollContext.Provider
        value={{
          scrollDir,
          scrollY,
          forceReveal,
          toggleForceReveal: this.toggleForceReveal
        }}
      >
        {children}
      </ScrollContext.Provider>
    );
  }
}

ScrollProvider.propTypes = {
  children: PT.object.isRequired
};
