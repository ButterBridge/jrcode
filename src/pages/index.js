import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import {Content, Main, Container, Heading, Title, Detail, Paragraph} from '../styled-components'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Main>
        <Container>
          {posts
            .map(({ node: post }) => (
              <Content
                key={post.id}
              >
                <Link to={post.fields.slug}>
                    <Title>{post.frontmatter.title}</Title>
                </Link>
                <Detail>{post.frontmatter.date}</Detail>
                <Paragraph>{post.excerpt}</Paragraph>
                <Link to={post.fields.slug}>
                    <Detail>Keep Reading →</Detail>
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
          excerpt(pruneLength: 400)
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
