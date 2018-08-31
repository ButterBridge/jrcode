import React from 'react';
import Link from 'gatsby-link';
import Icon from './Icon';
import { NavBar, Container, NavBarItem, Option, IconHolder } from '../styled-components';
import github from '../img/icons/github-icon.svg';
import twitter from '../img/icons/twitter-icon.svg';
import home from '../img/icons/home-icon.svg';
import about from '../img/icons/about-icon.svg';
import blog from '../img/icons/blog-icon.svg';
import contact from '../img/icons/contact-icon.svg';

const Navigation = ({colour, isSmall, location : {pathname}}) => {
    console.log(location);
    return <div className={`grid-navigation${isSmall ? '-mini' : ''}`}>
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
};

export default Navigation
