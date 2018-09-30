import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import MediaQuery from "react-responsive";
import { window } from "browser-monads";
import { GameProvider, GameContext } from "../contexts/GameContext";
import { ScrollProvider, ScrollContext } from "../contexts/ScrollContext";
import Brand from "../components/Brand";
import Header from "../components/Header";
import Transition from "../components/Transition";
import "../style/grid.sass";
import "../style/code-style.css";

class TemplateWrapper extends Component {
  state = {
    useFocusRings: false
  };

  componentDidMount = () => {
    window.addEventListener("keyup", e => {
      if (e.which === 9) {
        this.setState({
          useFocusRings: true
        });
      }
    });
  };

  render() {
    const { useFocusRings } = this.state;
    const { children, data, location } = this.props;
    const siteName = data.site.siteMetadata.title;
    return (
      <GameProvider>
        <GameContext.Consumer>
          {gameProps => (
            <Fragment>
              <Helmet title={siteName} />
              <ScrollProvider>
                <ScrollContext.Consumer>
                  {({ scrollDir, scrollY, forceReveal, toggleForceReveal }) => {
                    const isHeaderRevealed =
                      scrollDir === "up" || scrollY === 0 || forceReveal;
                    return (
                      <MediaQuery maxWidth={760}>
                        {isSmall => (
                          <div
                            className={`grid-main${isSmall ? "-mini" : ""}  ${
                              useFocusRings ? "" : "no-focus-outline"
                            }`}
                          >
                            <Brand
                              siteName={siteName}
                              isSmall={isSmall}
                              {...gameProps}
                            />
                            <div className="grid-main-header">
                              <Header
                                siteName={siteName}
                                isSmall={isSmall}
                                location={location}
                                isHeaderRevealed={isHeaderRevealed}
                                toggleForceReveal={toggleForceReveal}
                                {...gameProps}
                              />
                            </div>
                            <div className="grid-main-content">
                              <Transition
                                actions={[isHeaderRevealed ? "dip" : "undip"]}
                              >
                                {children()}
                              </Transition>
                            </div>
                          </div>
                        )}
                      </MediaQuery>
                    );
                  }}
                </ScrollContext.Consumer>
              </ScrollProvider>
            </Fragment>
          )}
        </GameContext.Consumer>
      </GameProvider>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

export const layoutPageQuery = graphql`
  query layoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
