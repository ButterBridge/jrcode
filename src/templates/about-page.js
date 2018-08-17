import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'
import { Main, Container, Title } from '../styled-components';
import Transition from '../components/Transition';

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
    const PageContent = contentComponent || Content;

    return (
        <Main>
            <Container>
                <Title>
                    {title}
                </Title>
                <PageContent content={content} />
            </Container>
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
        <Transition>
            <AboutPageTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.html}
            />
        </Transition>
    )
}

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AboutPage;

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
            }
        }
    }
`
