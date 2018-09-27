import React from "react";
import PT from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import {
  Main,
  List,
  ListItem,
  Option,
  TransitionContainer,
  SuperTitle,
  Window,
  Button
} from "../../styled-components";
import { GameContext } from "../../contexts/GameContext";
import { removeHyphens } from "../../utils/helpers";

class TagsPage extends React.Component {
  state = {
    sortBy: "use"
  };

  handleSortClick = method => {
    this.setState({
      sortBy: method
    });
  };

  render() {
    const { data } = this.props;
    const { title } = data.site.siteMetadata;
    const { group: tags } = data.allMarkdownRemark;
    const { sortBy } = this.state;

    tags.sort((a, b) => {
      if (sortBy === "use") {
        if (b.totalCount - a.totalCount < 0) return -1;
        if (b.totalCount - a.totalCount > 0) return 1;
        if (a.fieldValue.toLowerCase() < b.fieldValue.toLowerCase()) return -1;
        if (a.fieldValue.toLowerCase() > b.fieldValue.toLowerCase()) return 1;
      } else {
        if (a.fieldValue.toLowerCase() < b.fieldValue.toLowerCase()) return -1;
        if (a.fieldValue.toLowerCase() > b.fieldValue.toLowerCase()) return 1;
        return 0;
      }
      return 0;
    });

    return (
      <Main>
        <Helmet title={`Tags | ${title}`} />
        <GameContext.Consumer>
          {({ colours }) => {
            const colour = colours[title.length];
            return (
              <TransitionContainer>
                <SuperTitle colour={colour}>Tags</SuperTitle>
                <div className="grid-doublecolumn">
                  <Button onClick={() => this.handleSortClick("use")}>
                    <Window colour={sortBy === "use" ? colour : "white"}>
                      <Option>1, 2, 3</Option>
                    </Window>
                  </Button>
                  <Button onClick={() => this.handleSortClick("alphabet")}>
                    <Window colour={sortBy === "alphabet" ? colour : "white"}>
                      <Option>A, B, C</Option>
                    </Window>
                  </Button>
                </div>
                <List>
                  {tags.map(tag => (
                    <ListItem key={tag.fieldValue}>
                      <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                        <Option>
                          {`${removeHyphens(tag.fieldValue)} • ${
                            tag.totalCount
                          }`}
                        </Option>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </TransitionContainer>
            );
          }}
        </GameContext.Consumer>
      </Main>
    );
  }
}

TagsPage.propTypes = {
  data: PT.object.isRequired
};

export default TagsPage;

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
`;
