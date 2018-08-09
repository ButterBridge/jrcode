import React, { Component } from 'react';
import {sample} from 'lodash';
import { HeadLetter } from '../styled-components';
import {colours, fonts} from '../style';

class Heading extends Component {
    state = {
        colours : [],
        fonts : []
    }

    componentDidMount = () => {
        this.setState({
            fonts : Array(5).fill().map(x => sample(fonts)),
            colours : Array(5).fill().map(x => sample(colours)),
        });
    }

    render() {
        return (
            <div className="grid-heading">
                {['J', 'R', '→', 'J', 'S'].map((char, i) => {
                    return <HeadLetter
                        gridCols={{from : i + 1, to : i + 2}}
                        key={i}
                        font={this.state.fonts[i]}
                        colour={this.state.colours[i]}
                        onMouseEnter={() => this.changeFont(i)}
                    >
                        {char}
                    </HeadLetter>
                })}
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