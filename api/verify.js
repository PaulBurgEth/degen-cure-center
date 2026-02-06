export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { tg_id, wallet } = req.body;

    if (!tg_id) {
        return res.status(400).json({ error: 'Missing tg_id' });
    }

    if (!wallet) {
        return res.status(400).json({ error: 'Missing wallet' });
    }

    const SECRET_KEY = process.env.VERIFICATION_SECRET;
    const BOT_URL = process.env.BOT_URL;

    if (!SECRET_KEY || !BOT_URL) {
        console.error('Missing server-side configuration');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        // Forward the verification to the Telegram Bot (HTTP - no SSL on VPS)
        const botResponse = await fetch(`http://${BOT_URL}/api/verify-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-secret-key': SECRET_KEY
            },
            body: JSON.stringify({
                tg_id: Number(tg_id),
                status: "verified",
                wallet: wallet
            })
        });

        if (!botResponse.ok) {
            const errorText = await botResponse.text();
            console.error('Bot API Error:', errorText);
            return res.status(botResponse.status).json({ error: `Bot Verification Failed: ${errorText}` });
        }

        const data = await botResponse.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
