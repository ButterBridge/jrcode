import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';
import Content, { HTMLContent } from '../components/Content';
import Image from '../components/Image';
import { Main, BulletedTitle, Opener, Subtitle, Meta, List, LinkedListItem, Centraliser, Option, Detail, TransitionContainer } from '../styled-components';
import { GameContext } from '../contexts/GameContext';

export const BlogPostTemplate = ({
    content,
    contentComponent : PostContent = Content,
    siteTitle,
    images,
    frontmatter : {description, tags, title, caption, date, formattedDate}
}) => {

    tags.sort((a, b) => {
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    })

    return (
        <GameContext.Consumer>
            {({colours}) => {
                return <Main
                    colour={colours[siteTitle.length]}
                >
                    <Helmet title={`${siteTitle} - blog - ${title}`} />
                    <TransitionContainer>
                        <BulletedTitle
                            addition="title"
                            componentContent={title}
                            colour={colours[siteTitle.length]}
                            classTag={'post'}
                        />
                        <Meta
                            colour={colours[siteTitle.length]}
                        >
                            <Detail>
                                {formattedDate}
                            </Detail>
                        </Meta>
                        <Opener>{description}</Opener>
                        <PostContent content={content} />
                        {images && <Centraliser>
                            <Image 
                                images={images}
                                caption={caption}
                                colour={colours[siteTitle.length]}
                            />
                        </Centraliser>}
                        {tags && tags.length && (
                            <Meta
                                colour={colours[siteTitle.length]}
                            >
                                <Subtitle>Tags</Subtitle>
                                <List>
                                    {tags.map(tag => (
                                    <LinkedListItem
                                        key={tag}
                                        colour={colours[siteTitle.length]}
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
            }}
        </GameContext.Consumer>
    );
}

BlogPostTemplate.propTypes = {
    content: PropTypes.string.isRequired,
    contentComponent: PropTypes.func,
    frontmatter: PropTypes.object.isRequired,
    helmet: PropTypes.object,
}

const BlogPost = ({data}) => {
    const { markdownRemark: post, allFile : {edges}} = data;
    const linkedImage = edges.find(edge => edge.node.childImageSharp.sizes.originalImg.includes(kebabCase(post.frontmatter.title)));
    return (
        <BlogPostTemplate
            content={post.html}
            contentComponent={HTMLContent}
            siteTitle={data.site.siteMetadata.title}
            frontmatter={post.frontmatter}
            images={linkedImage ? linkedImage.node.childImageSharp : null}
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
                formattedDate : date(formatString: "MMMM DD, YYYY")
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