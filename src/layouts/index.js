import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import MediaQuery from 'react-responsive';
import Navbar from '../components/Navbar'
import Brand from '../components/Brand';
import '../style/grid.sass';
import { GameProvider, GameContext } from '../contexts/GameContext';
import Streamer from '../components/Streamer';

const TemplateWrapper = (props) => {
    const { children, data } = props;
    const siteName = 'jrcode';
    return <GameProvider>
        <GameContext.Consumer>
            {(gameProps) => (
                <Fragment>
                    <Helmet title={siteName} />
                    <MediaQuery maxWidth={760}>
                        {(isSmall) => {
                            return <Fragment>
                                <Brand 
                                    siteName={siteName}
                                    isSmall={isSmall}
                                    {...gameProps}
                                />
                                <div className={`grid-main${isSmall ? '-mini' : ''}`}>
                                    <div className="grid-main-navbar">
                                        <div style={{
                                            position : 'fixed',
                                            zIndex : 1,
                                            background: 'linear-gradient(0deg, rgba(255,255,255,0) 15%, rgba(255,255,255,1) 15%)'

                                        }}>
                                            <Navbar 
                                                colour={gameProps.colours[siteName.length]}
                                            />
                                            <Streamer
                                                colours={gameProps.colours.slice(0, -1)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid-main-content">
                                        {children()}
                                    </div>
                                </div>
                            </Fragment>
                        }}
                    </MediaQuery>
                </Fragment>
            )}
        </GameContext.Consumer>
    </GameProvider>
}

TemplateWrapper.propTypes = {
    children: PropTypes.func,
}

export default TemplateWrapper;