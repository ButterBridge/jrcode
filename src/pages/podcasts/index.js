import React, { Component } from "react";
import PT from "prop-types";
import { HTMLContent } from "../../components/Content";
import { Main, TransitionContainer } from "../../styled-components";

const episodes = [];

class PodcastsTemplate extends Component {
  state = {
    selectedEpisode: 1
  };

  render() {
    const { podcastDetails } = this.props;
    const { selectedEpisode } = this.state;
    const {
      node: { html }
    } = podcastDetails.find(
      podcast => +podcast.node.frontmatter.episode === selectedEpisode
    );
    const episode = episodes[selectedEpisode];
    return (
      <Main>
        <TransitionContainer>
          <audio controls>
            <source src={episode} />
          </audio>
          <HTMLContent content={html} />
        </TransitionContainer>
      </Main>
    );
  }
}

PodcastsTemplate.propTypes = {
  podcastDetails: PT.arrayOf(PT.object).isRequired
};

const Podcasts = ({ data }) => {
  const {
    allMarkdownRemark: { edges: podcastDetails }
  } = data;
  return <PodcastsTemplate podcastDetails={podcastDetails} />;
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
            src
          }
        }
      }
    }
  }
`;
