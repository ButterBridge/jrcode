import React, { Component } from "react";
import PT from "prop-types";
import { HTMLContent } from "../../components/Content";
import { Main, TransitionContainer } from "../../styled-components";

class PodcastsTemplate extends Component {
  state = {
    selectedEpisode: 1
  };

  render() {
    const { podcasts } = this.props;
    const { selectedEpisode } = this.state;
    const {
      node: { html, frontmatter }
    } = podcasts.find(
      podcast => +podcast.node.frontmatter.episode === selectedEpisode
    );
    return (
      <Main>
        <TransitionContainer>
          <HTMLContent content={html} />
        </TransitionContainer>
      </Main>
    );
  }
}

PodcastsTemplate.propTypes = {
  podcasts: PT.arrayOf(PT.object).isRequired
};

const Podcasts = ({ data }) => {
  const {
    allMarkdownRemark: { edges }
  } = data;
  return <PodcastsTemplate podcasts={edges} />;
};

Podcasts.propTypes = {
  data: PT.object.isRequired
};

export default Podcasts;

export const pageQuery = graphql`
  query AudioQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "podcast-post" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            date
            formattedDate: date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            episode
          }
        }
      }
    }
  }
`;
