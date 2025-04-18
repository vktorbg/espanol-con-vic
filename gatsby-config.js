/**
 * @type {import('gatsby').GatsbyConfig}
 */


require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Español-con-Vic`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        "accessToken": process.env.CONTENTFUL_ACCESS_TOKEN,
        "spaceId": process.env.CONTENTFUL_SPACE_ID
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Español con Vic`,
        short_name: `ECV`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ff914d`,
        display: `standalone`,
        icon: `static/images/Logo-libro.png`, // Ruta al ícono
      },
    },
  ]
};