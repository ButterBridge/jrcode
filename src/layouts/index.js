import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import MediaQuery from 'react-responsive';
import Navbar from '../components/Navbar'
import Brand from '../components/Brand';
import '../style/grid.sass';
import { GameProvider, GameContext } from '../contexts/GameContext';

const TemplateWrapper = ({ children, data }) => {
    const siteName = 'jrcode';
    return <GameProvider>
        <GameContext.Consumer>
            {(gameProps) => (
                <Fragment>
                    <Helmet title={siteName} />
                    <MediaQuery maxWidth={760}>
                        {(isSmall) => {
                            return <div>
                                <Brand siteName={siteName} isSmall={isSmall} gameProps={gameProps}/>
                                <div className={`grid-main${isSmall ? '-mini' : ''}`}>
                                    <Navbar />
                                    <div className="grid-main-content">
                                        {children()}
                                    </div>
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