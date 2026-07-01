export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  return res.status(200).send(`<!DOCTYPE html>
<html>
<head>
    <meta name="zalo-domain-verification" content="VJEY2hNYTon4dVaEmA921lHgAnYFs_1nyCpGs" />
</head>
<body>
    <h1>Zalo Webhook Server</h1>
</body>
</html>`);
}
