import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import {Content, Main, Container, Heading, Title, Detail, Paragraph, Meta, Bullet} from '../styled-components'
import {colours} from '../style';
import '../style/default-styles.css';
import { sample } from 'lodash';
import { withBullet } from '../components/with/withBullet';

const BulletedTitle = withBullet(Title);

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const sampleColour = sample(colours);

    return (
      <Main>
        <Container>
          {posts
            .map(({ node: post }) => (
              <Content
                key={post.id}
              >
                <Link to={post.fields.slug}>
                <BulletedTitle 
                    componentContent={post.frontmatter.title}
                    colour={sampleColour}
                />
                </Link>
                <Detail>{post.frontmatter.date}</Detail>
                <Paragraph>{post.excerpt}</Paragraph>
                <Link to={post.fields.slug}>
                <Meta colour={sampleColour}>
                    <Detail>Keep Reading →</Detail>
                </Meta>
                </Link>
              </Content>
            ))}
        </Container>
      </Main>
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
