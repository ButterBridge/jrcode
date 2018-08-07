import React, { Component } from 'react';
import {sample} from 'lodash';
import { HeadLetter } from '../styled-components';
/*
@import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Hanalei+Fill|MedievalSharp|Pacifico|Ruslan+Display'
*/

const fonts = ['Gloria Hallelujah', 'Hanalei Fill', 'MedievalSharp', 'Pacifico', 'Ruslan Display'];
const colours = ['#FF595E', '#8AC926', '#1982C4', '#E0CA3C', '#6A4C93']

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
            <div className="heading">
                {['J', 'R', '→', 'J', 'S'].map((char, i) => {
                    return <HeadLetter
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