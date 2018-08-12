import React, { Component } from 'react';
import {sample} from 'lodash';
import { HeadLetter } from '../styled-components';
import {colours, fonts} from '../style';
import {CanvasSpace, Num, Rectangle, Pt, Create, Color} from 'pts';

class Heading extends Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.state = {
            colours : [],
            fonts : []
        }
    }

    componentDidMount = () => {
        // this.canvas = React.createRef();
        const {colours} = this.state;

        const space = new CanvasSpace(this.refs.canvas);

        const form = space.getForm();

        let pts, follower;

        this.setState({
            fonts : Array(5).fill().map(x => sample(fonts)),
            colours : Array(5).fill().map(x => sample(colours)),
        }, () => {
            space.add({ 
                start: (bound) => {
                    pts = Create.gridCells(space.innerBound, 5, 13);
                    follower = space.center;
                },
    
                animate: (time, ftime) => {
                    follower = follower.add(space.pointer.$subtract(follower).divide(5));
    
                    // calculate the size and color of each cell based on its distance to the pointer
                    pts.forEach(p => {
                        const mag = follower.$subtract(Rectangle.center(p)).magnitude();
                        const scale = Math.min(1, Math.abs(1 - (0.8 * mag / space.center.y)));
                        const r = Rectangle.fromCenter(Rectangle.center(p), Rectangle.size(p));
    
                        form.fill(colours[Math.floor(scale * colours.length)]).rect(r);
                    })
                }
            });

            space.bindMouse().bindTouch().play();

        })
    }

    render() {
        return (
            <div className="grid-sidebar">
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
                <div className="grid-sidebar-canvas">
                    <canvas ref="canvas" style={{width : '100%', height : '100%'}}>

                    </canvas>
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