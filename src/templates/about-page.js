import React from 'react'
import PropTypes from 'prop-types'
import {sample} from 'lodash';
import Content, { HTMLContent } from '../components/Content'
import { Main, Title, TransitionContainer, SuperTitle } from '../styled-components';
import Transition from '../components/Transition';
import Brand from '../components/Brand';
import {colours} from '../style';

export const AboutPageTemplate = ({ title, content, contentComponent : PageContent = Content }) => {

    console.log(title);

    return (
        <Main>
            <TransitionContainer>
                <SuperTitle
                    colour={sample(colours)}
                >
                    {title}
                </SuperTitle>
                <PageContent content={content} />
            </TransitionContainer>
        </Main>
    )
}

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
}

const AboutPage = ({data}) => {
    const { markdownRemark: post } = data;
    return (
        <AboutPageTemplate
            contentComponent={HTMLContent}
            title={data.site.siteMetadata.title}
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
