export async function GET() {
  const robotsTxt = `# Fraterny.us - Robots.txt for SEO Optimization
# Website: https://fraterny.us
# Generated: ${new Date().toISOString().split('T')[0]}

# Host specification
Host: fraterny.us

# Allow all web crawlers with crawl delay
User-agent: *
Allow: /
Crawl-delay: 1

# Specific bot instructions
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Sitemap locations
Sitemap: https://fraterny.us/sitemap-us.xml
Sitemap: https://fraterny.us/sitemap-enhanced.xml

# Prevent crawling of private routes
Disallow: /auth/
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /node_modules/

# Prevent crawling of tracking URLs and parameters
Disallow: /*?*utm_*
Disallow: /*?*fbclid=*
Disallow: /*?*gclid=*
Disallow: /*?*msclkid=*
Disallow: /*?*ref=*

# Allow crawling of important static assets
Allow: /assets/
Allow: /images/
Allow: /static/
Allow: *.css
Allow: *.js
Allow: *.webp
Allow: *.jpg
Allow: *.png
Allow: *.svg`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
