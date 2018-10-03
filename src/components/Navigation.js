import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Icon from "./Icon";
import Transition from "./Transition";
import { NavBar, NavBarItem, Option, IconHolder } from "../styled-components";
import { colours } from "../style";
import github from "../img/icons/github-icon.svg";
import twitter from "../img/icons/twitter-icon.svg";
import home from "../img/icons/home-icon.svg";
import about from "../img/icons/about-icon.svg";
import blog from "../img/icons/blog-icon.svg";
import contact from "../img/icons/contact-icon.svg";
import roundWidgetGetters from "./collections/round-widgets";

class Navigation extends React.Component {
  state = {
    displayingGameWindow: false,
    gameWindowActions: [],
    hoveringIcon: ""
  };

  static getDerivedStateFromProps = ({ progressing }) => {
    if (progressing) {
      return {
        displayingGameWindow: true,
        gameWindowActions: ["slide", "fade"]
      };
    }
    return {};
  };

  componentDidUpdate(_, prevState) {
    const { progressing, toggleForceReveal } = this.props;
    if (progressing && this.state === prevState) {
      toggleForceReveal(true);
      setTimeout(() => {
        this.setState(
          {
            gameWindowActions: ["ascend", "fadeOut"]
          },
          () => {
            toggleForceReveal(false);
            setTimeout(() => {
              this.setState({
                displayingGameWindow: false
              });
            }, 1000);
          }
        );
      }, 6000);
    }
  }

  setHoveringIcon = text => {
    this.setState({ hoveringIcon: text });
  };

  render() {
    const {
      colour,
      isSmall,
      progress,
      timeSpent,
      round,
      location: { pathname }
    } = this.props;
    const {
      displayingGameWindow,
      gameWindowActions,
      hoveringIcon
    } = this.state;
    const displayColours = colours.map(
      displayColour =>
        progress.includes(displayColour) ? displayColour : "black"
    );
    const Widget = roundWidgetGetters[round];
    return (
      <div className={`grid-navigation${isSmall ? "-mini" : ""}`}>
        <div className="grid-navigation-game">
          {displayingGameWindow && (
            <Transition actions={gameWindowActions}>
              <Widget
                isSmall={isSmall}
                displayColours={displayColours}
                timeSpent={timeSpent}
              />
            </Transition>
          )}
        </div>
        <div className="grid-navigation-links">
          <NavBar colour={colour}>
            <NavBarItem
              onMouseEnter={() => this.setHoveringIcon(isSmall ? "Home" : "")}
              onMouseLeave={() => this.setHoveringIcon("")}
            >
              <Link to="/">
                <Option colour={pathname === "/" ? colour : "black"}>
                  {isSmall ? <IconHolder src={home} alt="Home" /> : "Home"}
                </Option>
              </Link>
            </NavBarItem>
            <NavBarItem
              onMouseEnter={() => this.setHoveringIcon(isSmall ? "About" : "")}
              onMouseLeave={() => this.setHoveringIcon("")}
            >
              <Link to="/about">
                <Option colour={pathname === "/about" ? colour : "black"}>
                  {isSmall ? <IconHolder src={about} alt="About" /> : "About"}
                </Option>
              </Link>
            </NavBarItem>
            <NavBarItem
              onMouseEnter={() => this.setHoveringIcon(isSmall ? "Blog" : "")}
              onMouseLeave={() => this.setHoveringIcon("")}
            >
              <Link to="/blog">
                <Option colour={pathname === "/blog" ? colour : "black"}>
                  {isSmall ? <IconHolder src={blog} alt="Blog" /> : "Blog"}
                </Option>
              </Link>
            </NavBarItem>
            <NavBarItem
              onMouseEnter={() =>
                this.setHoveringIcon(isSmall ? "Contact" : "")
              }
              onMouseLeave={() => this.setHoveringIcon("")}
            >
              <Link to="/contact">
                <Option colour={pathname === "/contact" ? colour : "black"}>
                  {isSmall ? (
                    <IconHolder src={contact} alt="Contact" />
                  ) : (
                    "Contact"
                  )}
                </Option>
              </Link>
            </NavBarItem>
            <NavBarItem
              onMouseEnter={() => this.setHoveringIcon("Twitter")}
              onMouseLeave={() => this.setHoveringIcon("")}
            >
              <Icon
                link="https://twitter.com/Butter_Bridge"
                src={twitter}
                alt="Twitter"
              />
            </NavBarItem>
            <NavBarItem
              onMouseEnter={() => this.setHoveringIcon("Github")}
              onMouseLeave={() => this.setHoveringIcon("")}
            >
              <Icon
                link="https://github.com/ButterBridge"
                src={github}
                alt="Github"
              />
            </NavBarItem>
          </NavBar>
        </div>
        {hoveringIcon && (
          <div className="grid-navigation-tooltip">
            <Transition>
              <Option mini>{hoveringIcon}</Option>
            </Transition>
          </div>
        )}
      </div>
    );
  }
}

Navigation.propTypes = {
  colour: PropTypes.string,
  isSmall: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  progress: PropTypes.array,
  progressing: PropTypes.bool.isRequired,
  toggleForceReveal: PropTypes.func.isRequired,
  timeSpent: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired
};

export default Navigation;
