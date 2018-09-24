import React from 'react';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';
import MediaQuery from 'react-responsive';
import Transition from './Transition';
import { Content, Detail, ParagraphExcerpt, LinkedBulletedTitle, Meta, LinkedMeta, List, LinkedListItem, Option, LinkedParagraphEnder } from '../styled-components'
import { removeHyphens } from '../utils/helpers';


const BlogPosts = ({ posts, colours, title }) => {
  return (
    posts.map(({ node: post }, index) => (
      <Transition
        key={post.id}
        additionalTimeout={index * 200}
        actions={['fade', 'slide']}
      >
        <Content>
          <MediaQuery maxWidth={1000}>
            {(isSmall) => {
              return <div className={`grid-postcard${isSmall ? '-mini' : ''}`}>
                <div className={`grid-postcard-title${isSmall ? '-mini' : ''}`}>
                  <LinkedBulletedTitle
                    addition="title"
                    linkTo={post.fields.slug}
                    componentContent={post.frontmatter.title}
                    colour={colours[title.length]}
                  />
                </div>
                <div className={`grid-postcard-date${isSmall ? '-mini' : ''}`}>
                  <Option mini>{post.frontmatter.formattedDate}</Option>
                </div>
                <Meta
                  className={`grid-postcard-tags${isSmall ? '-mini' : ''}`}
                  colour={colours[title.length]}
                >
                  <List>
                    {post.frontmatter.tags.map(tag => {
                      return <LinkedListItem
                        background="transparent"
                        colour="black"
                        linkTo={`/tags/${kebabCase(tag)}/`}
                        key={tag}
                      >
                        <Option mini colour="whitesmoke">{removeHyphens(tag)}</Option>
                      </LinkedListItem>
                    })}
                  </List>
                </Meta>
                <div className={`grid-postcard-excerpt${isSmall ? '-mini' : ''}`}>
                  <ParagraphExcerpt>
                    {post.excerpt}
                  </ParagraphExcerpt>
                  <LinkedParagraphEnder
                    linkTo={post.fields.slug}
                    colour={colours[title.length]}
                  >
                      {` read more`}
                  </LinkedParagraphEnder>
                </div>
              </div>
            }}
          </MediaQuery>
        </Content>
      </Transition>
    ))
  );
};

export default BlogPosts;