import React, { Component } from 'react';
import {sample} from 'lodash';
import {colours} from '../../style';

class Sidebar extends Component {
    render() {
        return (
            <canvas ref={(el) => this.canvas = el} style={{width : '100%', height : '100%'}} />
        );
    }

    componentDidMount = () => {
        const {CanvasSpace, Rectangle, Create} = Pts;
        const space = new CanvasSpace(this.canvas);
        const form = space.getForm();

        let pts, follower, count = 0;

        const colourRef = {
            random : () => sample(colours),
            flash : ({colours}) => Math.floor(count / 5) % 2 ? colours[0] : '#fff'
        }
       
        space.add({ 
            start: (bound) => {
                pts = Create.gridCells(space.innerBound, ...this.props.dimensions);
                follower = space.center;
            },

            animate: (time, ftime) => {
                follower = follower.add(space.pointer.$subtract(follower).divide(5));
                count++;
                const {colours, progressing} = this.props;
                pts.forEach((p, i) => {
                    const mag = Math.min(follower.$subtract(Rectangle.center(p)).magnitude(), 750);
                    const scale = Math.min(1, Math.abs(1 - (0.4 * mag / space.center.y)));
                    const r = Rectangle.fromCenter(Rectangle.center(p), Rectangle.size(p));
                    const colourFill = progressing ? 
                        colourRef[progressing]({colours}) :
                        colours[Math.floor(scale * colours.length)]
                    form.fill(colourFill).rect(r);
                })
            }
        });

        space.bindMouse().bindTouch().play();
    }
}

export default Sidebar;