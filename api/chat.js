/**
 * Vercel Serverless Function Proxy for OpenRouter
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, model } = req.body;
    const API_KEY = process.env.OPENROUTER_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'API key not configured on server' });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": req.headers.host || "resume-rd.vercel.app",
                "X-Title": "Ranadeep Portfolio Proxy"
            },
            body: JSON.stringify({
                model: model || "openrouter/free",
                messages: messages
            })
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        console.error("Proxy Error:", error);
        return res.status(500).json({ error: 'Failed to connect to OpenRouter' });
    }
}
