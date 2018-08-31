import React from 'react'
import PropTypes from 'prop-types'
// import {sample} from 'lodash';
import Content, { HTMLContent } from '../components/Content'
import { Main, Title, TransitionContainer, SuperTitle } from '../styled-components';
import Transition from '../components/Transition';
import Brand from '../components/Brand';
import { GameProvider, GameContext } from '../contexts/GameContext';
// import {colours} from '../style';

export const AboutPageTemplate = ({ title, content, contentComponent : PageContent = Content }) => {
    return (
        <GameContext.Consumer>
            {({colours}) => {
                return <Main>
                    <TransitionContainer>
                        <SuperTitle
                            colour={colours[title.length]}
                        >
                            {title}
                        </SuperTitle>
                        <PageContent content={content} />
                    </TransitionContainer>
                </Main>
            }}
        </GameContext.Consumer>
    )
}

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
}

const AboutPage = (props) => {
    const { markdownRemark: post } = props.data;
    return (
        <AboutPageTemplate
            contentComponent={HTMLContent}
            title={props.data.site.siteMetadata.title}
            content={post.html}
        />
    )
}

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AboutPage;

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(id: { eq: $id }) {
            html
        }
    }
`
