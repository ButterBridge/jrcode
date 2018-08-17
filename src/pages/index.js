import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import {Content, Main, Heading, Detail, Paragraph, LinkedBulletedTitle, LinkedMeta, Meta, TransitionContainer} from '../styled-components'
import {colours} from '../style';
import '../style/default-styles.css';
import { sample } from 'lodash';
import Transition from '../components/Transition';

export default class IndexPage extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;
        const sampleColour = sample(colours);

        return (
            <Main><TransitionContainer>
                {posts.map(({ node: post }, index) => (
                    <Transition
                        key={post.id}
                        additionalTimeout={index * 200}
                    >
                        <Content>
                            <LinkedBulletedTitle
                                addition="title"
                                linkTo={post.fields.slug} 
                                componentContent={post.frontmatter.title}
                                colour={sampleColour}
                            />
                            <Paragraph>{post.excerpt}</Paragraph>
                            <LinkedMeta
                                colour={sampleColour}
                            >
                                <Detail>{post.frontmatter.formattedDate}</Detail>
                            </LinkedMeta>
                            <LinkedMeta
                                linkTo={post.fields.slug}
                                colour={sampleColour}
                            >
                                <Detail>Keep Reading →</Detail>
                            </LinkedMeta>
                        </Content>
                    </Transition>
                ))}
            </TransitionContainer></Main>
        )
    }
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark (
            sort: { order: DESC, fields: [frontmatter___date] },
            filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
        ) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        templateKey
                        formattedDate : date(formatString: "MMMM DD, YYYY")
                    }
                }
            }
        }
    }
`
