import React from 'react'
import Link from 'gatsby-link'
import Icon from './Icon'
import Heading from './Heading';
import github from '../img/github-icon.svg'
import twitter from '../img/twitter-icon.svg'
import { NavBar, Container, NavBarItem, Option } from '../styled-components';

const Navbar = () => (
    <div className="navbar">
        <NavBar>
            <NavBarItem>
                <Link to="/">
                    <Option>Home</Option>
                </Link>
            </NavBarItem>
            <NavBarItem>
                <Link to="/about">
                    <Option>About</Option>
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
)

export default Navbar
