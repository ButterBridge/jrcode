import React, { Component } from 'react';
import {sample} from 'lodash';
import { HeadLetter } from '../styled-components';
import {colours, fonts} from '../style';
import Sidebar from './canvases/Sidebar';
import Transition from './Transition';

class Brand extends Component {
    state = {
        fonts : Array(this.props.siteName.length + 1).fill().map(x => sample(fonts)),
        // colours : Array(this.props.siteName.length + 1).fill().map(x => sample(colours))
    }

    componentDidMount = () => {
        this.props.gameProps.generateRandomColours(this.props.siteName.length);
    }

    render() {
        const {fonts} = this.state;
        const {siteName, isSmall, isAlone, gameProps} = this.props;
        return (
            <div className={`grid-sidebar${isSmall ? '-mini' : ''}`}>
                {`${isSmall ? ' ' : ''}${siteName}`.split('').map((char, i) => {
                    return <HeadLetter
                        gridCols={{from : isSmall ? 1 : i + 1, to : isSmall ? 2 : i + 2}}
                        key={i}
                        font={fonts[i] || sample(fonts)}
                        colour={gameProps.colours[i] || sample(colours)}
                        onMouseEnter={() => {
                            this.changeStyle(i);
                            gameProps.swapColourRandomly(i);
                        }}
                    >
                        {char}
                    </HeadLetter>
                })}
                {!isSmall && !isAlone && <div className="grid-sidebar-canvas">
                    <Transition
                        additionalTimeout={600}
                        actions={['descend']}
                        style={{width : '100%', height : '100%'}}
                    >
                        <Sidebar colours={colours} dimensions={[6, 13]}/>
                    </Transition>
                </div>}
            </div> 
        );
    }

    changeStyle = targetindex => {
        this.setState({
            fonts : this.state.fonts.map((font, index) => {
                return index === targetindex ?
                    sample(fonts) :
                    font
            })
            // colours : this.state.colours.map((font, index) => {
            //     return index === targetindex ?
            //         sample(colours) :
            //         font
            // })
        })
    }
}

export default Brand;