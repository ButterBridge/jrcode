import React from 'react';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';
import MediaQuery from 'react-responsive';
import Transition from './Transition';
import { Content, Detail, Paragraph, LinkedBulletedTitle, Meta, LinkedMeta, List, LinkedListItem, Option } from '../styled-components'
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
                        colour="black"
                        linkTo={`/tags/${kebabCase(tag)}/`}
                        key={tag}
                      >
                        <Option mini>{removeHyphens(tag)}</Option>
                      </LinkedListItem>
                    })}
                  </List>
                </Meta>
                <Paragraph
                  className={`grid-postcard-excerpt${isSmall ? '-mini' : ''}`}
                >
                  {post.excerpt}
                </Paragraph>
                <div className={`grid-postcard-nav${isSmall ? '-mini' : ''}`}>
                  <LinkedMeta
                    linkTo={post.fields.slug}
                    colour={colours[title.length]}
                  >
                    <Detail>Keep Reading →</Detail>
                  </LinkedMeta>
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