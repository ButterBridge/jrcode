import React, { Component } from 'react';
import {sample} from 'lodash';
import { HeadLetter } from '../styled-components';
/*
@import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Hanalei+Fill|MedievalSharp|Pacifico|Ruslan+Display'
*/

const fonts = ['Gloria Hallelujah', 'Hanalei Fill', 'MedievalSharp', 'Pacifico', 'Ruslan Display'];

class Heading extends Component {
    state = {
        colours : [],
        fonts : []
    }

    componentDidMount = () => {
        this.setState({
            fonts : Array(5).fill().map(x => sample(fonts))
        });
    }

    render() {
        return (
            <div>
                {['J', 'R', '→', 'J', 'S'].map((char, i) => {
                    return <HeadLetter
                        key={i}
                        font={this.state.fonts[i]}
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
            fonts : fonts.map((font, index) => {
                return index === targetindex ?
                    sample(fonts) :
                    font
            })
        })
    }
}

export default Heading;