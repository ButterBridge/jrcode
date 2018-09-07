import React from 'react';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';
import Transition from './Transition';
import { Content, Detail, Paragraph, LinkedBulletedTitle, Meta, LinkedMeta, List, LinkedListItem, Option } from '../styled-components'
import { removeHyphens } from '../utils/helpers';


const BlogPosts = ({posts, colours, title}) => {
    return (
        posts.map(({ node: post }, index) => (
            <Transition
                key={post.id}
                additionalTimeout={index * 200}
                actions={['fade', 'slide']}
            >
                <Content>
                  <div className="grid-postcard">
                    <div className="grid-postcard-title" >
                      <LinkedBulletedTitle
                          addition="title"
                          linkTo={post.fields.slug} 
                          componentContent={post.frontmatter.title}
                          colour={colours[title.length]}
                      />

                    </div>
                      <Detail
                          className="grid-postcard-date"
                          colour={colours[title.length]}
                      >
                          {post.frontmatter.formattedDate}
                      </Detail>
                      <Meta
                        className="grid-postcard-tags"
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
                        className="grid-postcard-excerpt"
                      >
                        {post.excerpt}
                      </Paragraph>
                      <div className="grid-postcard-nav">
                        <LinkedMeta
                            linkTo={post.fields.slug}
                            colour={colours[title.length]}
                        >
                            <Detail>Keep Reading →</Detail>
                        </LinkedMeta>

                      </div>

                  </div>
                </Content>
            </Transition>
        ))
    );
};

export default BlogPosts;