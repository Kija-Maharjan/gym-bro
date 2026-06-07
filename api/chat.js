// ─── api/chat.js — Vercel Serverless Function ────────────────────────────────
// The browser calls /api/chat → this function → Anthropic API
// Your API key NEVER touches the browser. It lives only in Vercel env vars.
//
// HOW TO ADD YOUR API KEY:
// 1. Go to vercel.com → your project → Settings → Environment Variables
// 2. Add:  Name = CLAUDE_API_KEY   Value = sk-ant-api03-xxxx...
// 3. Redeploy. Done.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.CLAUDE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: {
        message: 'CLAUDE_API_KEY not set. Go to Vercel → Settings → Environment Variables and add it.'
      }
    });
  }

  try {
    const { messages, system } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: { message: 'Invalid request — messages array required' } });
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: system || '',
        messages: messages,
      }),
    });

    const data = await anthropicRes.json();
    return res.status(anthropicRes.status).json(data);

  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ error: { message: 'Server error: ' + error.message } });
  }
}
