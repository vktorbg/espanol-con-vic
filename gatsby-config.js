/**
 * @type {import('gatsby').GatsbyConfig}
 */


require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Spanish Fluency School`,
    siteUrl: `https://spanishfluencyschool.com`, // Asegúrate de que esta URL sea correcta
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
        name: `Spanish Fluency School`,
        short_name: `SFS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ff914d`,
        display: `standalone`,
        icon: `static/images/Logo-libro.png`, // Ruta al ícono
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`, // Genera el sitemap en esta ruta
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }], // Permite el acceso a todo el sitio
        sitemap: 'https://spanishfluencyschool.com/sitemap.xml', // URL del sitemap
      },
    },
  ],
};