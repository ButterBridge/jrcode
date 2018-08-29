import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import MediaQuery from 'react-responsive';
import Brand from '../components/Brand';
import '../style/grid.sass';
import { GameProvider, GameContext } from '../contexts/GameContext';
import Streamer from '../components/Streamer';
import Header from '../components/Header';

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
                            return <div className={`grid-main${isSmall ? '-mini' : ''}`}>
                                <Brand 
                                    siteName={siteName}
                                    isSmall={isSmall}
                                    {...gameProps}
                                />
                                <div className="grid-main-header">
                                    <Header 
                                        colours={gameProps.colours}
                                        siteName={siteName}
                                    />
                                </div>
                                <div className="grid-main-content">
                                    {children()}
                                </div>
                            </div>
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