import crypto from 'crypto';

const ZALO_ACCESS_TOKEN = process.env.ZALO_ACCESS_TOKEN;
const ZALO_GROUP_ID = process.env.ZALO_GROUP_ID;
const APP_SECRET = process.env.APP_SECRET;

function verifySignature(body, signature, secret) {
    const hash = crypto.createHmac('sha256', secret).update(body).digest('hex');
    return hash === signature;
}

async function sendToZalo(message) {
    try {
          const response = await fetch('https://openapi.zalo.me/v3/official/conversation/send', {
                  method: 'POST',
                  headers: {
                            'Authorization': `Bearer ${ZALO_ACCESS_TOKEN}`,
                            'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                            recipient: { conversation_id: ZALO_GROUP_ID },
                            message: { text: message },
                  }),
          });
          const data = await response.json();
          console.log('Zalo response:', data);
          return data;
    } catch (error) {
          console.error('Error sending to Zalo:', error);
          throw error;
    }
}

export default async function handler(req, res) {
    // GET: Zalo webhook verification
  if (req.method === 'GET') {
        const { challenge } = req.query;
        if (challenge) {
                return res.status(200).json({ data: challenge });
        }
        return res.status(200).json({ status: 'Zalo Webhook OK' });
  }

  // POST: Process webhook event
  if (req.method === 'POST') {
        try {
                const signature = req.headers['x-zalo-signature'];
                const body = JSON.stringify(req.body);

          if (APP_SECRET && signature) {
                    if (!verifySignature(body, signature, APP_SECRET)) {
                                return res.status(401).json({ error: 'Invalid signature' });
                    }
          }

          const event = req.body;
                console.log('Webhook received:', JSON.stringify(event));

          return res.status(200).json({ success: true });
        } catch (error) {
                console.error('Error processing webhook:', error);
                return res.status(500).json({ error: 'Internal server error' });
        }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
