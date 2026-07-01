import crypto from 'crypto';

export default function handler(req, res) {
  // Get signature from Zalo
  const signature = req.headers['x-zalo-request-signature'];
  const appSecret = process.env.APP_SECRET;
  
  // For verification, just return HTML (signature check optional on first verify)
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  return res.status(200).send(`<!DOCTYPE html>
<html>
<head>
    <meta name="zalo-domain-verification" content="VJEY2hNYTon4dVaEmA921lHgAnYFs_1nyCpGs" />
</head>
<body></body>
</html>`);
}
