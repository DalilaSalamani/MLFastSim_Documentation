// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ML4Sim', 
  tagline: 'Machine Learning for Fast Shower Simulation in High Energy Physics',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'ignore', 
  onBrokenMarkdownLinks: 'warn', 
  favicon: 'img/favicon.ico',
  organizationName: 'CERN', 
  projectName: 'ML4Sim', 
  presets: [


    
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/DalilaSalamani/ML4Sim_Documentation.git',
        },
        /**
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        */
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'ML4Sim',
        logo: {
          alt: 'Logo',
          src: 'img/logo.png', 
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Get started',
          },
          /** {to: '/blog', label: 'Blog', position: 'left'}, */
          /**{to: '/help', label: 'Help', position: 'left'},  to add new item */
          {
            href: 'https://github.com/DalilaSalamani/ML4Sim_Documentation.git',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get started',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'ML4Sim',
                href: 'https://indico.cern.ch/category/13860/',
              },
              {
                label: 'Mattermost',
                href: 'https://mattermost.web.cern.ch/ml4sim/channels/town-square',
              },
            ],
          },
          {
            title: 'More',
            items: [
              /** {
                label: 'Blog',
                to: '/blog',
              },*/
              {
                label: 'GitHub',
                href: 'https://github.com/DalilaSalamani/ML4Sim_Documentation.git',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}, CERN`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
