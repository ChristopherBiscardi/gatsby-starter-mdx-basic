import safeGet from 'lodash.get'
import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

const Image = ({ src = 'gatsby-astronaut.png', ...props }) => {
  console.table(props)
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)

  const match = useMemo(
    () => data.allFile.nodes.find(({ relativePath }) => src === relativePath),
    [data, src]
  )

  const fluid = safeGet(match, 'childImageSharp.fluid')

  return fluid ? <Img fluid={fluid} Tag="div" {...props} /> : null
}

export default Image
