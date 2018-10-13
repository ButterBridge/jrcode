import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { kebabCase } from "lodash";
import Content, { HTMLContent } from "../components/Content";
import Image from "../components/Image";
import {
  Main,
  BulletedTitle,
  Subtitle,
  Meta,
  List,
  LinkedListItem,
  Centraliser,
  Option,
  Detail,
  TransitionContainer
} from "../styled-components";
import { GameContext } from "../contexts/GameContext";

export const BlogPostTemplate = ({
  content,
  contentComponent: PostContent = Content,
  siteTitle,
  images,
  frontmatter: { description, tags, title, caption, formattedDate, canonical }
}) => {
  tags.sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
  });

  return (
    <GameContext.Consumer>
      {({ colours }) => {
        const themeColour = colours[siteTitle.length];
        if (!colours.length) return null;
        return (
          <Main colour={themeColour}>
            <Helmet>
              <title>{`${siteTitle} - blog - ${title}`}</title>
              <meta rel="canonical" href={canonical} />
            </Helmet>
            <TransitionContainer>
              <BulletedTitle
                addition="title"
                componentContent={title}
                colour={themeColour}
                classTag="post"
              />
              <Meta colour={themeColour}>
                <Detail>{formattedDate}</Detail>
              </Meta>
              <Subtitle>{description}</Subtitle>
              <PostContent content={content} />
              {images && (
                <Centraliser>
                  <Image
                    images={images}
                    caption={caption}
                    colour={themeColour || colours[0]}
                  />
                </Centraliser>
              )}
              {tags &&
                tags.length && (
                  <Meta colour={themeColour}>
                    <Subtitle>Tags</Subtitle>
                    <List>
                      {tags.map(tag => (
                        <LinkedListItem
                          key={tag}
                          colour={themeColour}
                          linkTo={`/tags/${kebabCase(tag)}/`}
                        >
                          <Option>{tag}</Option>
                        </LinkedListItem>
                      ))}
                    </List>
                  </Meta>
                )}
            </TransitionContainer>
          </Main>
        );
      }}
    </GameContext.Consumer>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  frontmatter: PropTypes.object.isRequired,
  siteTitle: PropTypes.string.isRequired,
  images: PropTypes.object.isRequired
};

const BlogPost = ({ data }) => {
  const {
    markdownRemark: post,
    allFile: { edges }
  } = data;
  const linkedImage = edges.find(edge =>
    edge.node.childImageSharp.sizes.originalImg.includes(
      kebabCase(post.frontmatter.title)
    )
  );
  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      siteTitle={data.site.siteMetadata.title}
      frontmatter={post.frontmatter}
      images={linkedImage ? linkedImage.node.childImageSharp : null}
    />
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query ImagePageAndBlogPostByID($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date
        formattedDate: date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        caption
        canonical
      }
    }
    allFile(filter: { extension: { eq: "png" } }) {
      edges {
        node {
          childImageSharp {
            sizes {
              originalImg
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
