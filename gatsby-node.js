const { get, kebabCase } = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const generateBabelConfig = require('gatsby/dist/utils/babel-config');

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            tags
                            templateKey
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()));
            return Promise.reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach(edge => {
            const id = edge.node.id;
            createPage({
                path: edge.node.fields.slug,
                tags: edge.node.frontmatter.tags,
                component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
                context: {
                    id
                },
            })
        })

        const tags = posts.reduce((acc, post) => {
            if (get(post, 'node.frontmatter.tags')) {
                post.node.frontmatter.tags.forEach(tag => {
                    if (!acc.includes(tag)) {
                        acc.push(tag);
                    }
                })
            }
            return acc;
        }, []);

        tags.forEach(tag => {
            const tagPath = `/tags/${kebabCase(tag)}/`;
            createPage({
                path: tagPath,
                component: path.resolve(`src/templates/tags.js`),
                context: {
                    tag
                }
            })
        })
    })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
    const { createNodeField } = boundActionCreators

    if (node.internal.type === 'MarkdownRemark') {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: 'slug',
            node,
            value,
        })
    }
}

exports.modifyWebpackConfig = ({ config, stage }) => {
    return Promise.all([
        config.merge({
            resolve: {
                alias: {
                    'react': __dirname + '/node_modules/react',
                }
            }
        }),
        config.merge({
            resolve: {
                alias: {
                    'react-dom': __dirname + '/node_modules/react-dom',
                }
            }
        })
    ]);
};
