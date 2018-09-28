import React from "react";
import PropTypes from "prop-types";
import { Main, TransitionContainer, SuperTitle } from "../../styled-components";
import "../../style/default-styles.css";
import { GameContext } from "../../contexts/GameContext";
import BlogPosts from "../../components/BlogPosts";

export default class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { title } = data.site.siteMetadata;

    return (
      <GameContext.Consumer>
        {({ colours }) => (
          <Main>
            <TransitionContainer>
              <SuperTitle colour={colours[title.length]}>Blog...</SuperTitle>
              <BlogPosts posts={posts} colours={colours} title={title} />
            </TransitionContainer>
          </Main>
        )}
      </GameContext.Consumer>
    );
  }
}

BlogIndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query BlogQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
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
