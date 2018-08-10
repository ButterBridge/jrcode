import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { ListItem, Main, Container, Detail, Subtitle, List, Opener, Option, LinkedListItem} from '../styled-components';

class TagRoute extends React.Component {
    render() {
        const {tag} = this.props.pathContext;
        const {title} = this.props.data.site.siteMetadata;
        const {totalCount, edges : posts} = this.props.data.allMarkdownRemark;
        const tagHeader = 
            `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with “${tag}”`;

        return (
            <Main>
                <Helmet title={`${tag} @ ${title}`} />
                <Container>
                    <Subtitle>{tagHeader}</Subtitle>
                    <List>
                        {posts.map(post => {
                            return <LinkedListItem 
                                key={post.node.fields.slug}
                                linkTo={post.node.fields.slug}
                            >
                                <Option>{post.node.frontmatter.title}</Option>
                            </LinkedListItem>
                        })}
                    </List>
                    <Detail>
                        <Link to="/tags/">Browse all tags</Link>
                    </Detail>
                </Container>
            </Main>
        );
    }
}

export default TagRoute;

export const tagPageQuery = graphql`
    query TagPage($tag: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
