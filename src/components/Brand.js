import React, { Component } from 'react';
import {sample} from 'lodash';
import { HeadLetter } from '../styled-components';
import {colours, fonts} from '../style';
import Sidebar from './canvases/Sidebar';

class Brand extends Component {
    state = {
        fonts : Array(6).fill().map(x => sample(fonts)),
        colours : Array(6).fill().map(x => sample(colours))
    }

    render() {
        const {fonts, colours} = this.state;
        return (
            <div className="grid-sidebar">
                {['j', 'r', 'c', 'o', 'd', 'e'].map((char, i) => {
                    return <HeadLetter
                        gridCols={{from : i + 1, to : i + 2}}
                        key={i}
                        font={fonts[i]}
                        colour={colours[i]}
                        onMouseEnter={() => this.changeStyle(i)}
                    >
                        {char}
                    </HeadLetter>
                })}
                <div className="grid-sidebar-canvas">
                    <Sidebar colours={colours} dimensions={[6, 13]}/>
                </div>
            </div>
        );
    }

    changeStyle = targetindex => {
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

export default Brand;