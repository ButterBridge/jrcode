import React, { Component } from 'react';
import PT from 'prop-types';
import { sample } from 'lodash';
import { window } from 'browser-monads';
import Sidebar from './canvases/Sidebar';
import Transition from './Transition';
import { HeadLetter } from '../styled-components';
import {fonts} from '../style';

class Brand extends Component {
    state = {
        fonts : Array(this.props.siteName.length + 1).fill().map(x => sample(fonts)),
    }

    componentDidMount = () => {
        this.props.generateRandomColours(this.props.siteName.length + 1);
    }

    render() {
        const {fonts} = this.state;
        const {siteName, isSmall, isAlone, colours, onMouseOverHeadLetter, progressing} = this.props;
        if (!colours.length) return null;
        return (
            <div className={`grid-sidebar${isSmall ? '-mini' : ''}`}>
                {`${isSmall ? ' ' : ''}${siteName}`.split('').map((char, i) => {
                    return <HeadLetter
                        gridCols={{from : isSmall ? 1 : i + 1, to : isSmall ? 2 : i + 2}}
                        key={i}
                        font={fonts[i]}
                        colour={['', ...colours][i]}
                        onMouseEnter={() => {
                            this.changeFont(i);
                            !progressing && onMouseOverHeadLetter(i - 1);
                        }}
                    >
                        {char}
                    </HeadLetter>
                })}
                {!isSmall && !isAlone && <div className="grid-sidebar-canvas">
                    {window.hasOwnProperty('Pts') && <Transition
                        additionalTimeout={600}
                        actions={['descend']}
                        style={{width : '100%', height : '100%'}}
                    >
                        <Sidebar
                            colours={colours}
                            dimensions={[siteName.length, 13]}
                            progressing={progressing}
                        />
                    </Transition>}
                </div>}
            </div> 
        );
    }

    changeFont = targetindex => {
        this.setState({
            fonts : this.state.fonts.map((font, index) => {
                return index === targetindex ?
                    sample(fonts) :
                    font
            })
        })
    }
}

Brand.propTypes = {
    siteName : PT.string.isRequired,
    isSmall : PT.bool.isRequired,
    isAlone : PT.bool,
    colours : PT.arrayOf(PT.string).isRequired,
    onMouseOverHeadLetter : PT.func.isRequired,
    generateRandomColours : PT.func.isRequired
}

export default Brand;