import React, { Component } from 'react';
import {CanvasSpace, Num, Rectangle, Pt, Create, Color} from 'pts';

class Sidebar extends Component {
    render() {
        return (
            <canvas ref="canvas" style={{width : '100%', height : '100%'}} />
        );
    }

    componentDidMount = () => {
        const space = new CanvasSpace(this.refs.canvas);
        const form = space.getForm();

        let pts, follower;
       
        space.add({ 
            start: (bound) => {
                pts = Create.gridCells(space.innerBound, ...this.props.dimensions);
                follower = space.center;
            },

            animate: (time, ftime) => {
                follower = follower.add(space.pointer.$subtract(follower).divide(5));

                pts.forEach((p, i) => {
                    const mag = Math.min(follower.$subtract(Rectangle.center(p)).magnitude(), 750);
                    const scale = Math.min(1, Math.abs(1 - (0.4 * mag / space.center.y)));
                    const r = Rectangle.fromCenter(Rectangle.center(p), Rectangle.size(p));
                    const {colours} = this.props;
                    form.fill(colours[Math.floor(scale * colours.length)]).rect(r);
                })
            }
        });

        space.bindMouse().bindTouch().play();
    }
}

export default Sidebar;