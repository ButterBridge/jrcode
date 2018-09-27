import React, { Component } from "react";
import { window } from "browser-monads";
import PT from "prop-types";
import { sample } from "lodash";
import Sidebar from "./canvases/Sidebar";
import Transition from "./Transition";
import { HeadLetter } from "../styled-components";
import { fonts as fontStyles } from "../style";
import { fillNewEmptyArray } from "../utils/helpers";

class Brand extends Component {
  state = {
    fonts: []
  };

  componentDidMount = () => {
    const { siteName, generateRandomColours } = this.props;
    const brandLength = siteName.length + 1;
    generateRandomColours(brandLength);
    this.setState({
      fonts: fillNewEmptyArray(brandLength, () => sample(fontStyles))
    });
  };

  changeFont = targetindex => {
    const { fonts } = this.state;
    this.setState({
      fonts: fonts.map((font, index) => {
        return index === targetindex ? sample(fontStyles) : font;
      })
    });
  };

  render() {
    const { fonts } = this.state;
    const {
      siteName,
      isSmall,
      isAlone,
      colours,
      onMouseOverHeadLetter,
      progressing
    } = this.props;
    if (!colours.length) return null;
    const adjustedColours = isSmall ? ["", ...colours.slice(0, -1)] : colours;

    return (
      <div className={`grid-sidebar${isSmall ? "-mini" : ""}`}>
        {`${isSmall ? " " : ""}${siteName}`.split("").map((char, i) => (
          <HeadLetter
            gridCols={{ from: isSmall ? 1 : i + 1, to: isSmall ? 2 : i + 2 }}
            key={i}
            font={fonts[i]}
            colour={adjustedColours[i]}
            onMouseEnter={() => {
              this.changeFont(i);
              if (!progressing) onMouseOverHeadLetter(isSmall ? i - 1 : i);
            }}
          >
            {char}
          </HeadLetter>
        ))}
        {!isSmall &&
          !isAlone && (
            <div className="grid-sidebar-canvas">
              {!!window.Pts && (
                <Transition
                  additionalTimeout={600}
                  actions={["descend"]}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Sidebar
                    colours={colours}
                    dimensions={[siteName.length, 13]}
                    progressing={progressing}
                  />
                </Transition>
              )}
            </div>
          )}
      </div>
    );
  }
}

Brand.propTypes = {
  siteName: PT.string.isRequired,
  isSmall: PT.bool.isRequired,
  isAlone: PT.bool,
  colours: PT.arrayOf(PT.string).isRequired,
  onMouseOverHeadLetter: PT.func.isRequired,
  generateRandomColours: PT.func.isRequired,
  progressing: PT.oneOfType([PT.string, PT.bool]).isRequired
};

export default Brand;
