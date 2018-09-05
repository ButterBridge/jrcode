import React from 'react';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';
import Transition from './Transition';
import { Content, Detail, Paragraph, LinkedBulletedTitle, LinkedMeta, LinkedListItem } from '../styled-components'
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
                    <LinkedBulletedTitle
                        addition="title"
                        linkTo={post.fields.slug} 
                        componentContent={post.frontmatter.title}
                        colour={colours[title.length]}
                    />
                    <Paragraph>{post.excerpt}</Paragraph>
                    <LinkedMeta
                        linkTo={post.fields.slug}
                        colour={colours[title.length]}
                    >
                        <Detail>Keep Reading →</Detail>
                    </LinkedMeta>
                    <Detail
                        colour={colours[title.length]}
                    >
                        {post.frontmatter.formattedDate}
                    </Detail>
                    <Detail
                        colour={colours[title.length]}
                    >
                        Tagged: {post.frontmatter.tags.map(tag => {
                            return <LinkedListItem colour="black" linkTo={`/tags/${kebabCase(tag)}/`}>{removeHyphens(tag)}</LinkedListItem>
                        })}
                    </Detail>
                </Content>
            </Transition>
        ))
    );
};

export default BlogPosts;