import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';
  
  // Determine domain
  let domain = 'fraterny.in';
  let domainLabel = 'Fraterny';
  
  if (host.includes('fraterny.us')) {
    domain = 'fraterny.us';
    domainLabel = 'Fraterny.us';
  } else if (host.includes('fraterny.com')) {
    domain = 'fraterny.com';
    domainLabel = 'Fraterny.com';
  }
  
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>Google Site Verification - ${domainLabel}</title>
    <meta name="description" content="Google Search Console verification for ${domain}">
</head>
<body>
    <h1>Google Site Verification for ${domainLabel}</h1>
    <p>This file is used to verify ownership of ${domain} with Google Search Console.</p>
    <p>Replace this content with the verification file provided by Google Search Console.</p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
