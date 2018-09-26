import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import { Main, TransitionContainer, SuperTitle } from "../styled-components";
import { GameContext } from "../contexts/GameContext";

export const AboutPageTemplate = ({
  title,
  content,
  contentComponent: PageContent = Content
}) => (
  <GameContext.Consumer>
    {({ colours }) => (
      <Main>
        <TransitionContainer>
          <SuperTitle colour={colours[title.length]}>{title}</SuperTitle>
          <PageContent content={content} />
        </TransitionContainer>
      </Main>
    )}
  </GameContext.Consumer>
);

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={data.site.siteMetadata.title}
      content={post.html}
    />
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`;
