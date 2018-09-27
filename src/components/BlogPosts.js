import React from "react";
import PT from "prop-types";
import { kebabCase } from "lodash";
import MediaQuery from "react-responsive";
import Transition from "./Transition";
import {
  Content,
  ParagraphExcerpt,
  LinkedBulletedTitle,
  Meta,
  List,
  LinkedListItem,
  Option,
  LinkedParagraphEnder
} from "../styled-components";
import { removeHyphens } from "../utils/helpers";

class BlogPosts extends React.Component {
  state = {
    active: false
  };

  toggleActive = toggle => {
    this.setState({
      active: toggle
    });
  };

  render() {
    const { posts, colours, title } = this.props;
    const { active } = this.state;
    return posts.map(({ node: post }, index) => (
      <Transition
        key={post.id}
        additionalTimeout={index * 200}
        actions={["fade", "slide"]}
      >
        <Content>
          <MediaQuery maxWidth={1000}>
            {isSmall => (
              <div className={`grid-postcard${isSmall ? "-mini" : ""}`}>
                <div
                  className={`grid-postcard-title${isSmall ? "-mini" : ""}`}
                  onMouseEnter={() => this.toggleActive(true)}
                  onMouseLeave={() => this.toggleActive(false)}
                >
                  <LinkedBulletedTitle
                    active={active}
                    addition="title"
                    linkTo={post.fields.slug}
                    componentContent={post.frontmatter.title}
                    colour={colours[title.length]}
                  />
                </div>
                <div className={`grid-postcard-date${isSmall ? "-mini" : ""}`}>
                  <Option mini>{post.frontmatter.formattedDate}</Option>
                </div>
                <Meta
                  className={`grid-postcard-tags${isSmall ? "-mini" : ""}`}
                  colour={colours[title.length]}
                >
                  <List>
                    {post.frontmatter.tags.map(tag => (
                      <LinkedListItem
                        background="transparent"
                        colour="black"
                        linkTo={`/tags/${kebabCase(tag)}/`}
                        key={tag}
                      >
                        <Option mini colour="whitesmoke">
                          {removeHyphens(tag)}
                        </Option>
                      </LinkedListItem>
                    ))}
                  </List>
                </Meta>
                <div
                  className={`grid-postcard-excerpt${isSmall ? "-mini" : ""}`}
                >
                  <ParagraphExcerpt>{post.excerpt}</ParagraphExcerpt>
                  <LinkedParagraphEnder
                    linkTo={post.fields.slug}
                    colour={colours[title.length]}
                  >
                    {` read more`}
                  </LinkedParagraphEnder>
                </div>
              </div>
            )}
          </MediaQuery>
        </Content>
      </Transition>
    ));
  }
}

BlogPosts.propTypes = {
  posts: PT.arrayOf(PT.object).isRequired,
  colours: PT.arrayOf(PT.string).isRequired,
  title: PT.string.isRequired
};

export default BlogPosts;
