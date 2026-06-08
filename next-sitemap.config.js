/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://sarahchenrealty.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    additionalSitemaps: [
      'https://sarahchenrealty.com/sitemap.xml',
    ],
  },
  exclude: ['/privacy-policy', '/terms'],
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => [
    await config.transform(config, '/listings/tarrytown'),
  ],
}

module.exports = config;
