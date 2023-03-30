// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ML4Sim', 
  tagline: 'Machine Learning for Fast Shower Simulation in High Energy Physics',
  url: 'https://g4fastsim.web.cern.ch',
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
	  remarkPlugins: [math],
	  rehypePlugins: [katex],
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
stylesheets: [
  {
    href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
    type: 'text/css',
    integrity:
      'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
    crossorigin: 'anonymous',
  },
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
          {
            type: 'doc',
            docId: 'MetaHEP/Step00_overview',
            position: 'left',
            label: 'MetaHEP',
          },
          /** {to: '/blog', label: 'Blog', position: 'left'}, */
          /**{to: '/help', label: 'Help', position: 'left'},  to add new item */
          {
            href: 'https://github.com/DalilaSalamani/ML4Sim_Documentation.git',
            label: 'Webpage GitHub',
            position: 'right',
          },
          {
            href: 'https://gitlab.cern.ch/fastsim',
            label: 'Project repositories on GitLab',
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
              {
                label: 'MetaHEP',
                to: '/docs/MetaHEP/Step00_overview',
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
                label: 'GitLab Repositories',
                href: 'https://gitlab.cern.ch/fastsim',
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
