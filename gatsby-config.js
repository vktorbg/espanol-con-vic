/**
 * @type {import('gatsby').GatsbyConfig}
 */


require('dotenv').config({
  path: `.env`,
});

const supportedLanguages = ['en', 'es']; // Idiomas soportados
const defaultLanguage = 'en'; // Idioma por defecto

module.exports = {
  siteMetadata: {
    title: `Spanish Fluency School`,
    siteUrl: `https://spanishfluencyschool.com`,
    languages: {
      langs: supportedLanguages,
      defaultLangKey: defaultLanguage,
    },
  },
  plugins: [
    // Plugins básicos
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`, // Ruta a los archivos de traducción
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // Coincide con el 'name' de gatsby-source-filesystem
        languages: supportedLanguages,
        defaultLanguage: defaultLanguage,
        siteUrl: `https://spanishfluencyschool.com`,
        prefixDefault: false, // Inglés sin prefijo ('/'), Español con prefijo ('/es/')
        i18nextOptions: {
          debug: true,
          defaultNS: 'translation', // Namespace por defecto
        },
      },
    },
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
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', allow: '/es/' }, // Permite acceso a la versión en español
        ],
        sitemap: 'https://spanishfluencyschool.com/sitemap.xml', // URL del sitemap
      },
    },
  ],
};