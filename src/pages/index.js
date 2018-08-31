import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import {debounce} from 'lodash';
import MediaQuery from 'react-responsive';
import {Content, Main, Heading, Detail, Opener, Paragraph, LinkedBulletedTitle, LinkedMeta, Meta, TransitionContainer, SuperTitle, Option, LinkedTitle} from '../styled-components'
import '../style/default-styles.css';
import Transition from '../components/Transition';
import { GameContext } from '../contexts/GameContext';

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
                        <Opener>
                            Hello. Thanks for coming.
                        </Opener>
                        <SuperTitle
                            colour={colours[title.length]}
                        >
                            Latest blog posts...
                        </SuperTitle>
                        {posts.map(({ node: post }, index) => (
                            <Transition
                                key={post.id}
                                additionalTimeout={index * 200}
                                actions={['fade', 'slide']}
                            >
                                <Content>
                                    <LinkedBulletedTitle
                                        addition="title"
                                        linkTo={post.fields.slug} 
                                        componentContent={post.frontmatter.title}
                                        colour={colours[title.length]}
                                    />
                                    <Paragraph>{post.excerpt}</Paragraph>
                                    <LinkedMeta
                                        linkTo={post.fields.slug}
                                        colour={colours[title.length]}
                                    >
                                        <Detail>Keep Reading →</Detail>
                                    </LinkedMeta>
                                    <Detail
                                        colour={colours[title.length]}
                                    >
                                        {post.frontmatter.formattedDate}
                                    </Detail>
                                </Content>
                            </Transition>
                        ))}
                    </TransitionContainer>
                        <Link to="/blog">
                            <Option>See all posts</Option>
                        </Link>
                    </Main>
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
                    }
                }
            }
        }
    }
`
