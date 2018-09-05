import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Main, Content, Title, List, ListItem, Opener, Option, TransitionContainer, SuperTitle } from '../../styled-components';
import { GameContext } from '../../contexts/GameContext';

class TagsPage extends React.Component {
    state = {
        sortBy : 'use'
    }

    render () {
        const {data} = this.props;
        const {title} = data.site.siteMetadata;
        const {group} = data.allMarkdownRemark;
        const {sortBy} = this.state;
    
        group.sort((a, b) => {
            if (sortBy === 'use') {
                if (b.totalCount - a.totalCount < 0) return -1;
                if (b.totalCount - a.totalCount > 0) return 1;
                if(a.fieldValue.toLowerCase() < b.fieldValue.toLowerCase()) return -1;
                if(a.fieldValue.toLowerCase() > b.fieldValue.toLowerCase()) return 1;
            } else {
                if(a.fieldValue.toLowerCase() < b.fieldValue.toLowerCase()) return -1;
                if(a.fieldValue.toLowerCase() > b.fieldValue.toLowerCase()) return 1;
                return 0;
            }
        });
            
        return <Main>
            <Helmet title={`Tags | ${title}`} />
            <GameContext.Consumer>
                {({colours}) => {
                    return <TransitionContainer>
                        <SuperTitle
                            colour={colours[title.length]}
                        >
                            Tags
                        </SuperTitle>
                        <List>
                            {group.map(tag => (
                                <ListItem key={tag.fieldValue}>
                                    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                        <Option>{tag.fieldValue} ({tag.totalCount})</Option>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </TransitionContainer>
                }}
            </GameContext.Consumer>
        </Main>

    }
}

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
