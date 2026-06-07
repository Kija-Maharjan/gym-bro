// ─── api/chat.js — Vercel Serverless Function ────────────────────────────────
// The browser calls /api/chat → this function → Google Gemini API
// Your API key NEVER touches the browser. It lives only in Vercel env vars.
//
// HOW TO ADD YOUR API KEY:
// 1. Go to vercel.com → your project → Settings → Environment Variables
// 2. Add:  Name = GEMINI_API_KEY   Value = AIzaSy...
// 3. Redeploy. Done.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: {
        message: 'GEMINI_API_KEY not set. Go to Vercel → Settings → Environment Variables and add it.'
      }
    });
  }

  try {
    const { messages, system } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: { message: 'Invalid request — messages array required' } });
    }

    // Map frontend messages to Gemini format
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const body = {
      system_instruction: system ? { parts: [{ text: system }] } : undefined,
      contents,
      generationConfig: { maxOutputTokens: 1024 },
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      const msg = data.error?.message || data.error || 'Gemini API error';
      return res.status(geminiRes.status).json({ error: { message: msg } });
    }

    // Transform Gemini response to match frontend's expected format
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({
      content: [{ text }]
    });

  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ error: { message: 'Server error: ' + error.message } });
  }
}
