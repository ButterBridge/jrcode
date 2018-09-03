import React from 'react';
import Transition from './Transition';
import { Content, Detail, Paragraph, LinkedBulletedTitle, LinkedMeta } from '../styled-components'


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
                </Content>
            </Transition>
        ))
    );
};

export default BlogPosts;