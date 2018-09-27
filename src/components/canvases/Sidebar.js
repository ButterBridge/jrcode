import React, { Component } from "react";
import PT from "prop-types";
import { window } from "browser-monads";
import { sample } from "lodash";
import { colours as styleColours } from "../../style";

class Sidebar extends Component {
  componentDidMount = () => {
    const { CanvasSpace, Rectangle, Create } = window.Pts;
    const space = new CanvasSpace(this.canvas);
    const form = space.getForm();

    let gridCells;
    let follower;
    let count = 0;

    const colourRef = {
      random: () => sample(styleColours),
      flash: ({ colours }) => (Math.floor(count / 5) % 2 ? colours[0] : "#fff")
    };

    space.add({
      start: () => {
        const { dimensions } = this.props;
        gridCells = Create.gridCells(space.innerBound, ...dimensions);
        follower = space.center;
      },

      animate: () => {
        follower = follower.add(space.pointer.$subtract(follower).divide(5));
        count += 1;
        const { colours, progressing } = this.props;
        gridCells.forEach(point => {
          const mag = Math.min(
            follower.$subtract(Rectangle.center(point)).magnitude(),
            750
          );
          const scale = Math.min(1, Math.abs(1 - (0.4 * mag) / space.center.y));
          const r = Rectangle.fromCenter(
            Rectangle.center(point),
            Rectangle.size(point)
          );
          const colourFill = progressing
            ? colourRef[progressing]({ colours })
            : colours[Math.floor(scale * colours.length)];
          form.fill(colourFill).rect(r);
        });
      }
    });

    space
      .bindMouse()
      .bindTouch()
      .play();
  };

  render() {
    return (
      <canvas
        ref={el => {
          this.canvas = el;
        }}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}

Sidebar.propTypes = {
  dimensions: PT.arrayOf(PT.number).isRequired,
  colours: PT.arrayOf(PT.string).isRequired,
  progressing: PT.bool.isRequired
};

export default Sidebar;
