import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import {Content, Main, Heading, Detail, Opener, Paragraph, LinkedBulletedTitle, LinkedMeta, Meta, TransitionContainer, SuperTitle} from '../../styled-components'
import '../../style/default-styles.css';
import Transition from '../../components/Transition';
import { GameContext } from '../../contexts/GameContext';
import BlogPosts from '../../components/BlogPosts';

export default class IndexPage extends React.Component {
    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;
        const { title } = data.site.siteMetadata;

        return (
            <GameContext.Consumer>
                {({colours}) => {
                    return <Main><TransitionContainer>
                        <SuperTitle
                            colour={colours[title.length]}
                        >
                            Blog...
                        </SuperTitle>
                        <BlogPosts 
                            posts={posts}
                            colours={colours}
                            title={title}
                        />
                    </TransitionContainer></Main>
                }}
            </GameContext.Consumer>
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
    query BlogQuery {
        site {
            siteMetadata {
                title
            }
        }
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
