// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'g4fastsim', 
  tagline: 'Machine Learning for Fast Shower Simulation in High Energy Physics',
  url: 'https://g4fastsim.web.cern.ch',
  baseUrl: '/',
  onBrokenLinks: 'ignore', 
  onBrokenMarkdownLinks: 'warn', 
  favicon: 'img/favicon.ico',
  organizationName: 'CERN', 
  projectName: 'g4fastsim', 
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
        title: 'g4fastsim',
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
          {
            type: 'doc',
            docId: 'ml_workflow',
            position: 'left',
            label: 'ML fast simulation',
          },
          {
            type: 'doc',
            docId: 'G4_Inference/from_training_to_inference',
            position: 'left',
            label: 'Inference within Geant4',
          },
          /** {to: '/blog', label: 'Blog', position: 'left'}, */
          /**{to: '/help', label: 'Help', position: 'left'},  to add new item */
          {
            href: 'https://github.com/DalilaSalamani/ML4Sim_Documentation.git',
            label: 'Webpage GitHub',
            position: 'right',
          },
          {
            href: 'https://github.com/DalilaSalamani/MLFastSim',
            label: 'ML tools GitHub',
            position: 'right',
          },
          {
            href: 'https://gitlab.cern.ch/azaborow/geant4_par04',
            label: 'Par04 GitLab',
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
              {
                label: 'ML fast simulation',
                to: '/docs/ml_workflow',
              },
              {
                label: 'Inference within Geant4',
                to: '/docs/G4_Inference/from_training_to_inference',
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
              {
                label: 'CaloChallenge',
                  href: 'https://calochallenge.github.io/homepage/',
              },
            ],
          },
          {
            title: 'Useful links',
            items: [
              /** {
                label: 'Blog',
                to: '/blog',
              },*/
              {
                label: 'Webpage GitHub',
                href: 'https://github.com/DalilaSalamani/ML4Sim_Documentation.git',
              },
              {
                label: 'ML tools GitHub',
                href: 'https://github.com/DalilaSalamani/MLFastSim',
              },
              {
                label: 'Par04 GitLab',
                href: 'https://gitlab.cern.ch/azaborow/geant4_par04',
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
