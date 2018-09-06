import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash';
import { window } from 'browser-monads';
import MediaQuery from 'react-responsive';
import Link from 'gatsby-link'
import Transition from '../components/Transition';
import { GameContext } from '../contexts/GameContext';
import { Main, Opener, TransitionContainer, SuperTitle, Option, Container } from '../styled-components'
import '../style/default-styles.css';
import BlogPosts from '../components/BlogPosts';

export default class IndexPage extends React.Component {
    state = {
        innerWidth: window.innerWidth
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.debouncedUpdateResize);
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.debouncedUpdateResize);
    }

    debouncedUpdateResize = debounce(() => {
        this.setState({
            innerWidth: window.innerWidth
        })
    }, 100)


    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;
        const { title } = data.site.siteMetadata;

        return (
            <GameContext.Consumer>
                {({colours}) => {
                    return <Main><TransitionContainer>
                        <Container>
                            <Opener>
                                Hello. Thanks for coming.
                            </Opener>
                            <SuperTitle
                                colour={colours[title.length]}
                            >
                                Latest blog posts...
                            </SuperTitle>
                            <BlogPosts
                                posts={posts}
                                colours={colours}
                                title={title}
                            />
                            <Link to="/blog">
                                <Option>See all posts</Option>
                            </Link>
                        </Container>
                        <Container>
                            <SuperTitle
                                colour={colours[title.length]}
                            >
                                Game Progress
                            </SuperTitle>
                        </Container>
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
    query IndexQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark (
            sort: { order: DESC, fields: [frontmatter___date] },
            limit: 3,
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
                        tags
                    }
                }
            }
        }
    }
`
