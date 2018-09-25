import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Icon from './Icon';
import Transition from './Transition';
import { NavBar, Container, NavBarItem, Option, IconHolder } from '../styled-components';
import { colours } from '../style';
import github from '../img/icons/github-icon.svg';
import twitter from '../img/icons/twitter-icon.svg';
import home from '../img/icons/home-icon.svg';
import about from '../img/icons/about-icon.svg';
import blog from '../img/icons/blog-icon.svg';
import contact from '../img/icons/contact-icon.svg';
import roundWidgetGetters from './collections/round-widgets';

class Navigation extends React.Component {
  state = {
    displayingGameWindow: false,
    gameWindowActions: [],
    hoveringIcon: '',
  }

  componentDidUpdate(_, prevState) {
    if (this.props.progressing && this.state === prevState) {
      this.setState({
        displayingGameWindow: true,
        gameWindowActions: ['slide', 'fade']
      })
      this.props.toggleForceReveal(true)
      setTimeout(() => {
        this.setState({
          gameWindowActions: ['ascend', 'fadeOut']
        }, () => {
          this.props.toggleForceReveal(false)
          setTimeout(() => {
            this.setState({
              displayingGameWindow: false
            })
          }, 1000);
        });
      }, 6000)
    }
  }

  render() {
    const { colour, isSmall, location: { pathname }, progress, timeSpent, round } = this.props;
    const { displayingGameWindow, gameWindowActions, hoveringIcon } = this.state;
    const displayColours = colours.map(colour => progress.includes(colour) ? colour : 'black');
    const Widget = roundWidgetGetters[round - 1];
    return <div className={`grid-navigation${isSmall ? '-mini' : ''}`}>
      <div className="grid-navigation-game">
        {displayingGameWindow && <Transition
          actions={gameWindowActions}
        >
          <Widget
            isSmall={isSmall}
            displayColours={displayColours}
            timeSpent={timeSpent}
          />
        </Transition>}
      </div>
      <div className="grid-navigation-links">
        <NavBar
          colour={colour}
        >
          <NavBarItem
            onMouseEnter={() => this.setHoveringIcon(isSmall ? 'Home' : '')}
            onMouseLeave={() => this.setHoveringIcon('')}
          >
            <Link to="/">
              <Option
                colour={pathname === '/' ? colour : 'black'}
              >{isSmall ? <IconHolder
                src={home}
                alt="Home"
              /> : 'Home'}</Option>
            </Link>
          </NavBarItem>
          <NavBarItem
            onMouseEnter={() => this.setHoveringIcon(isSmall ? 'About' : '')}
            onMouseLeave={() => this.setHoveringIcon('')}
          >
            <Link to="/about">
              <Option
                colour={pathname === '/about' ? colour : 'black'}
              >{isSmall ? <IconHolder
                src={about}
                alt="About"
              /> : 'About'}</Option>
            </Link>
          </NavBarItem>
          <NavBarItem
            onMouseEnter={() => this.setHoveringIcon(isSmall ? 'Blog' : '')}
            onMouseLeave={() => this.setHoveringIcon('')}
          >
            <Link to="/blog">
              <Option
                colour={pathname === '/blog' ? colour : 'black'}
              >{isSmall ? <IconHolder
                src={blog}
                alt="Blog"
              /> : 'Blog'}</Option>
            </Link>
          </NavBarItem>
          <NavBarItem
            onMouseEnter={() => this.setHoveringIcon(isSmall ? 'Contact' : '')}
            onMouseLeave={() => this.setHoveringIcon('')}
          >
            <Link to="/contact">
              <Option
                colour={pathname === '/contact' ? colour : 'black'}
              >{isSmall ? <IconHolder
                src={contact}
                alt="Contact"
              /> : 'Contact'}</Option>
            </Link>
          </NavBarItem>
          <NavBarItem
            onMouseEnter={() => this.setHoveringIcon('Twitter')}
            onMouseLeave={() => this.setHoveringIcon('')}
          >
            <Icon
              link="https://twitter.com/Butter_Bridge"
              src={twitter}
              alt="Twitter"
            />
          </NavBarItem>
          <NavBarItem
            onMouseEnter={() => this.setHoveringIcon('Github')}
            onMouseLeave={() => this.setHoveringIcon('')}
          >
            <Icon
              link="https://github.com/ButterBridge"
              src={github}
              alt="Github"
            />
          </NavBarItem>
        </NavBar>
      </div>
      {hoveringIcon && <div className="grid-navigation-tooltip">
        <Transition><Option mini>{hoveringIcon}</Option></Transition>
      </div>}
    </div>
  }

  setHoveringIcon = (text) => {
    this.setState({ hoveringIcon: text });
  }
};

Navigation.propTypes = {
  colour: PropTypes.string,
  isSmall: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  progress: PropTypes.array,
  timeSpent: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
}

export default Navigation
