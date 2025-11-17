export async function GET() {
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>Google Site Verification - Fraterny.com</title>
    <meta name="description" content="Google Search Console verification for fraterny.com">
</head>
<body>
    <h1>Google Site Verification for Fraterny.com</h1>
    <p>This file is used to verify ownership of fraterny.com with Google Search Console.</p>
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
