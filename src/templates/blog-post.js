import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase, sample } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Content, { HTMLContent } from '../components/Content';
import Image from '../components/Image';
import { Main, Container, Title, Opener, Subtitle, Meta, List, ListItem, Centraliser } from '../styled-components';
import {colours} from '../style';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  images,
  caption
}) => {
  const PostContent = contentComponent || Content;
  const sampleColour = sample(colours);

  return (
    <Main
        colour={sampleColour}
    >
      {helmet || ''}
      <Container>
        <Title>
            {title}
        </Title>
        <Opener>{description}</Opener>
        <PostContent content={content} />
        <Centraliser>
            <Image images={images} caption={caption} sampleColour={sampleColour}/>
        </Centraliser>
        {tags && tags.length && (
            <Meta
                colour={sampleColour}
            >
                <Subtitle>Tags</Subtitle>
                <List>
                    {tags.map(tag => (
                    <ListItem key={tag} colour={sampleColour}>
                        <Link to={`/tags/${kebabCase(tag)}/`}><Opener>{tag}</Opener></Link>
                    </ListItem>
                    ))}
                </List>
            </Meta>
        )}
      </Container>
    </Main>
  );
}

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  helmet: PropTypes.object,
}

const BlogPost = (props) => {
  const { markdownRemark: post, allFile : {edges}} = props.data;
  const linkedImage = edges.find(edge => edge.node.childImageSharp.sizes.originalImg.includes(kebabCase(post.frontmatter.title)));
  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`JR->JS Blog ${post.frontmatter.title}`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      caption={post.frontmatter.caption}
      images={linkedImage.node.childImageSharp}
    />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  })
}

export default BlogPost;

export const pageQuery = graphql`
  query ImagePageAndBlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        caption
      }
    }
    allFile(filter : {extension : {eq : "png"}}) {
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
`