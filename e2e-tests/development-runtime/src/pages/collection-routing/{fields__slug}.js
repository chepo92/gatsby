import React from "react"
import { createPagesFromData, Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

function BlogPost({ data: { post } }) {
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <h1>{post.frontmatter.title}</h1>
      <h2 data-testid="slug">{post.fields.slug}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <Link to="/">Back to home</Link>
    </Layout>
  )
}

export default createPagesFromData(BlogPost, `MarkdownRemark`)

export const blogPostQuery = graphql`
  query GetBlogPostBySlugCollection($fields__slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $fields__slug } }) {
      fields {
        slug
      }
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
    }
  }
`