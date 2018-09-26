import React from "react";
import PT from "prop-types";
import Helmet from "react-helmet";
import {
  Main,
  Subtitle,
  List,
  Option,
  BulletedOption,
  LinkedListItem,
  LinkedMeta,
  TransitionContainer,
  SuperTitle
} from "../styled-components";
import { GameContext } from "../contexts/GameContext";

class TagRoute extends React.Component {
  render() {
    const { pathContext, data } = this.props;
    const { tag } = pathContext;
    const { title } = data.site.siteMetadata;
    const { totalCount, edges: posts } = data.allMarkdownRemark;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;

    return (
      <GameContext.Consumer>
        {({ colours }) => (
          <Main>
            <Helmet title={`${tag} @ ${title}`} />
            <TransitionContainer>
              <SuperTitle colour={colours[title.length]}>Tags</SuperTitle>
              <Subtitle>{tagHeader}</Subtitle>
              <List>
                {posts.map(post => (
                  <LinkedListItem
                    key={post.node.fields.slug}
                    linkTo={post.node.fields.slug}
                  >
                    <BulletedOption
                      addition="option"
                      componentContent={post.node.frontmatter.title}
                      colour={colours[title.length]}
                    />
                  </LinkedListItem>
                ))}
              </List>
              <LinkedMeta linkTo="/tags/">
                <Option>All tags →</Option>
              </LinkedMeta>
            </TransitionContainer>
          </Main>
        )}
      </GameContext.Consumer>
    );
  }
}

TagRoute.propTypes = {
  pathContext: PT.object.isRequired,
  data: PT.object.isRequired
};

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
