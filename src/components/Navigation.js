import React from 'react';
import Link from 'gatsby-link';
import Icon from './Icon';
import { NavBar, Container, NavBarItem, Option, IconHolder, Window, Block, Strong, WindowInsert } from '../styled-components';
import {colours} from '../style';
import github from '../img/icons/github-icon.svg';
import twitter from '../img/icons/twitter-icon.svg';
import home from '../img/icons/home-icon.svg';
import about from '../img/icons/about-icon.svg';
import blog from '../img/icons/blog-icon.svg';
import contact from '../img/icons/contact-icon.svg';
import Transition from './Transition';

class Navigation extends React.Component {
    state = {
        displayingGameWindow: false,
        gameWindowActions: [],
    }

    componentDidUpdate (prevProps) {
        if (this.props.progressing && this.props !== prevProps) {
            this.setState({
                displayingGameWindow: true,
                gameWindowActions: ['slide', 'fade']
            })
            setTimeout(() => {
                this.setState({
                    gameWindowActions: ['ascend', 'fadeOut']
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            displayingGameWindow: false
                        })  
                    }, 1000);
                });
            }, 6000)
        }
    }

    render () {
        const { colour, isSmall, location : {pathname}, progress, timeSpent } = this.props;
        const { displayingGameWindow, gameWindowActions } = this.state;
        return <div className={`grid-navigation${isSmall ? '-mini' : ''}`}>
            <div className="grid-navigation-game">
                {displayingGameWindow && <Transition
                    actions={gameWindowActions}
                >
                    <Window
                        borderColour={isSmall ? 'white' : 'black'}
                    >
                        {colours.map(colour => {
                            return <Block
                                key={colour}
                                colour={progress.includes(colour) ? colour : 'black'}
                            />
                        })}
                        <Strong>{timeSpent}s</Strong>
                    </Window>
                </Transition>}
            </div>
            <div className="grid-navigation-links">
                <NavBar
                    colour={colour}
                >
                    <NavBarItem>
                        <Link to="/">
                            <Option
                                colour={pathname === '/' ? colour : 'black'}
                            >{isSmall ? <IconHolder 
                                src={home}
                                alt="Home"
                            /> : 'Home'}</Option>
                        </Link>
                    </NavBarItem>
                    <NavBarItem>
                        <Link to="/about">
                            <Option
                                colour={pathname === '/about' ? colour : 'black'}
                            >{isSmall ? <IconHolder 
                                src={about}
                                alt="About"
                            /> : 'About'}</Option>
                        </Link>
                    </NavBarItem>
                    <NavBarItem>
                        <Link to="/blog">
                            <Option
                                colour={pathname === '/blog' ? colour : 'black'}
                            >{isSmall ? <IconHolder 
                                src={blog}
                                alt="Blog"
                            /> : 'Blog'}</Option>
                        </Link>
                    </NavBarItem>
                    <NavBarItem>
                        <Link to="/contact">
                            <Option
                                colour={pathname === '/contact' ? colour : 'black'}
                            >{isSmall ? <IconHolder 
                                src={contact}
                                alt="Contact"
                            /> : 'Contact'}</Option>
                        </Link>
                    </NavBarItem>
                    <NavBarItem>
                        <Icon 
                            link="https://twitter.com/Butter_Bridge"
                            src={twitter}
                            alt="Twitter"
                        />
                    </NavBarItem>
                    <NavBarItem>
                        <Icon 
                            link="https://github.com/ButterBridge"
                            src={github}
                            alt="Github"
                        />
                    </NavBarItem>
                </NavBar>
            </div>
        </div>
    }
    
};

export default Navigation
