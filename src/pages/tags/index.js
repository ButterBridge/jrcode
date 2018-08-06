import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Main, Content, Title, List, ListItem, Opener } from '../../styled-components';

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <Main>
    <Helmet title={`Tags | ${title}`} />
    <Content>
        <Title>Tags</Title>
        <List>
        {group.map(tag => (
            <ListItem key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                <Opener>{tag.fieldValue} ({tag.totalCount})</Opener>
            </Link>
            </ListItem>
        ))}
        </List>
    </Content>
  </Main>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
