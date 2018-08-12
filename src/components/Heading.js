import React, { Component } from 'react';
import {sample} from 'lodash';
import { HeadLetter } from '../styled-components';
import {colours, fonts} from '../style';
import Sidebar from './canvases/Sidebar';

class Heading extends Component {
    state = {
        fonts : Array(5).fill().map(x => sample(fonts)),
        colours : Array(5).fill().map(x => sample(colours))
    }

    render() {
        const {fonts, colours} = this.state;
        return (
            <div className="grid-sidebar">
                {['J', 'R', '→', 'J', 'S'].map((char, i) => {
                    return <HeadLetter
                        gridCols={{from : i + 1, to : i + 2}}
                        key={i}
                        font={fonts[i]}
                        colour={colours[i]}
                        onMouseEnter={() => this.changeFont(i)}
                    >
                        {char}
                    </HeadLetter>
                })}
                <div className="grid-sidebar-canvas">
                    <Sidebar colours={colours} dimensions={[5, 13]}/>
                </div>
            </div>
        );
    }

    changeFont = targetindex => {
        this.setState({
            fonts : this.state.fonts.map((font, index) => {
                return index === targetindex ?
                    sample(fonts) :
                    font
            }),
            colours : this.state.colours.map((font, index) => {
                return index === targetindex ?
                    sample(colours) :
                    font
            })
        })
    }
}

export default Heading;