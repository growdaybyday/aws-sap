import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import sidebars from './sidebars';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AWS Pro Architect Prep',
  tagline: 'Master AWS and pass the AWS Certified Solutions Architect – Professional exam',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://growdaybyday.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/aws-sap/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'growdaybyday', // Usually your GitHub org/user name.
  projectName: 'aws-sap', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // English is the source language; Korean is a translation served under /ko/.
  // Docs without a Korean translation fall back to the English original.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      ko: {
        label: '한국어',
        htmlLang: 'ko-KR',
      },
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: ({locale, versionDocsDirPath, docPath}) => {
            // Korean pages should link to the translation file, not the English source.
            if (locale !== 'en') {
              return `https://github.com/growdaybyday/aws-sap/edit/main/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`;
            }
            return `https://github.com/growdaybyday/aws-sap/edit/main/${versionDocsDirPath}/${docPath}`;
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
      
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // Build a separate index per locale so Korean pages are searchable too.
        language: ['en', 'ko'],
      }),
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AWS Pro Architect Prep',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          // Points at the upstream project, not this fork — the navbar link
          // credits where the content comes from.
          href: 'https://github.com/adavoudi/aws-sap',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'Original project by adavoudi',
              href: 'https://github.com/adavoudi/aws-sap',
            },
            {
              label: 'License: CC BY 4.0',
              href: 'https://creativecommons.org/licenses/by/4.0/',
            },
          ],
        },
      ],
      // No dynamic year here: the translated copyright in i18n/*/docusaurus-theme-classic/footer.json
      // is a static string, so an interpolated year would silently go stale in other locales.
      copyright: `Copyright © AWS Pro Architect Prep. Adapted from <a href="https://github.com/adavoudi/aws-sap">adavoudi/aws-sap</a> under CC BY 4.0. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
