import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import Link from "gatsby-link";
import BlogPosts from "../components/BlogPosts";
import { GameContext } from "../contexts/GameContext";
import {
  Main,
  Opener,
  TransitionContainer,
  SuperTitle,
  Option,
  Container,
  FlexContainer
} from "../styled-components";
import roundWidgetGetters from "../components/collections/round-widgets";
import { fillNewEmptyArray } from "../utils/helpers";
import "../style/default-styles.css";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { title } = data.site.siteMetadata;
    return (
      <GameContext.Consumer>
        {({ colours, round }) => (
          <Main>
            <TransitionContainer>
              <Container>
                <Opener>Hello. Thanks for coming.</Opener>
                <SuperTitle colour={colours[title.length]}>
                  Latest blog posts...
                </SuperTitle>
                <BlogPosts posts={posts} colours={colours} title={title} />
                <div className="grid-doublecolumn">
                  <Link to="/blog">
                    <Option>See all posts</Option>
                  </Link>
                  <Link to="/tags">
                    <Option>See all tags</Option>
                  </Link>
                </div>
              </Container>
              <Container>
                <SuperTitle colour={colours[title.length]}>
                  Game Progress
                </SuperTitle>
                <FlexContainer>
                  <MediaQuery maxWidth={760}>
                    {isSmall =>
                      fillNewEmptyArray(round + 1, (_, i) => {
                        const Widget = roundWidgetGetters[i];
                        console.log(Widget);
                        return (
                          <Widget isSmall={isSmall} withFeedback key={i} />
                        );
                      })
                    }
                  </MediaQuery>
                </FlexContainer>
              </Container>
            </TransitionContainer>
          </Main>
        )}
      </GameContext.Consumer>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
            formattedDate: date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`;
