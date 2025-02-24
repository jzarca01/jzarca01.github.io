// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react';
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'

const LLMRegex = [
  'ChatGPT-User',
  'Claude-Web',
  'ClaudeBot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Crawlspace',
  'Diffbot',
  'DuckAssistBot',
  'FacebookBot',
  'FriendlyCrawler',
  'Google-Extended',
  'GoogleOther',
  'GoogleOther-Image',
  'GoogleOther-Video',
  'GPTBot',
  'iaskspider/2.0',
  'ICC-Crawler',
  'ImagesiftBot',
  'img2dataset',
  'ISSCyberRiskCrawler',
  'Kangaroo Bot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'OAI-SearchBot',
  'omgili',
  'omgilibot',
  'PanguBot',
  'PerplexityBot',
  'PetalBot',
  'Scrapy',
  'SemrushBot-OCOB',
  'Semrush-SWA',
  'Sidetrade indexer bot',
  'Timpibot',
  'VelenPublicWebCrawler',
  'Webzio-Extended',
  'YouBot',
]

// https://astro.build/config
export default defineConfig({
  site: 'https://jzarca01.github.io',
  base: '/',
  integrations: [
    mdx(),
    sitemap(),
    robotsTxt({
      policy: [
        ...LLMRegex.map(llm => ({
          userAgent: llm,
          disallow: '/',
        })),
        {
          userAgent: '*',
          allow: '/',
          cleanParam: 'ref /blog/',
        },
      ],
    }),
    react({
      include: ['**/react/*'],
    }),
  ],
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
})
