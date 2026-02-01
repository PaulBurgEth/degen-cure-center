export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets/|style.css).*)',
  ],
};

export default async function middleware(req) {
  const userAgent = req.headers.get('user-agent')?.toLowerCase();

  // List of bots to prerender for
  const bots = [
    'googlebot',
    'yahoo! slurp',
    'bingbot',
    'yandex',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
    'slackbot',
    'vkshare',
    'w3c_validator',
    'redditbot',
    'applebot',
    'whatsapp',
    'flipboard',
    'tumblr',
    'bitlybot',
    'skypeuripreview',
    'nuzzel',
    'discordbot',
    'google page speed',
    'qwantify',
    'pinterest',
    'bitrix',
    'xing-contenttabreceiver',
    'telegrambot',
    'discord'
  ];

  const isBot = userAgent && bots.some(bot => userAgent.includes(bot));

  // Skip if not a bot
  if (!isBot) {
    // For standard requests on static sites, just returning nothing allows Vercel to continue
    return;
  }

  try {
    const token = process.env.PRERENDER_TOKEN;

    if (token) {
      const prerenderUrl = `https://service.prerender.io/${req.url}`;

      const prerenderResponse = await fetch(prerenderUrl, {
        headers: {
          'X-Prerender-Token': token,
          'User-Agent': req.headers.get('user-agent'),
        },
      });

      if (prerenderResponse.ok) {
        return new Response(prerenderResponse.body, {
          status: prerenderResponse.status,
          statusText: prerenderResponse.statusText,
          headers: prerenderResponse.headers,
        });
      }
    }
  } catch (e) {
    console.error('Prerender Middleware Error:', e);
  }
}
