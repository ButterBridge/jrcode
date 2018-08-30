import React from 'react';
import Link from 'gatsby-link';
import Icon from './Icon';
import { NavBar, Container, NavBarItem, Option, IconHolder } from '../styled-components';
import github from '../img/github-icon.svg';
import twitter from '../img/twitter-icon.svg';
import home from '../img/home-icon.svg';
import about from '../img/about-icon.svg';
import blog from '../img/blog-icon.svg';
import contact from '../img/contact-icon.svg';

const Navigation = ({colour, isSmall}) => (
    <div className={`grid-navigation${isSmall ? '-mini' : ''}`}>
        <div className="grid-navigation-links">
            <NavBar
                colour={colour}
            >
                <NavBarItem>
                    <Link to="/">
                        <Option>{isSmall ? <IconHolder 
                            src={home}
                            alt="Home"
                        /> : 'Home'}</Option>
                    </Link>
                </NavBarItem>
                <NavBarItem>
                    <Link to="/about">
                        <Option>{isSmall ? <IconHolder 
                            src={about}
                            alt="About"
                        /> : 'About'}</Option>
                    </Link>
                </NavBarItem>
                <NavBarItem>
                    <Link to="/blog">
                        <Option>{isSmall ? <IconHolder 
                            src={blog}
                            alt="Blog"
                        /> : 'Blog'}</Option>
                    </Link>
                </NavBarItem>
                <NavBarItem>
                    <Link to="/contact">
                        <Option>{isSmall ? <IconHolder 
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
);

export default Navigation
