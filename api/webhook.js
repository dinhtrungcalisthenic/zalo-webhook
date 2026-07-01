export default function handler(req, res) {
  console.log("Webhook received:", req.method, req.body);
  
  // Zalo verification (GET with challenge)
  const { challenge } = req.query;
  if (challenge) {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(challenge);
  }
  
  // Handle POST from Zalo
  if (req.method === 'POST') {
    // TODO: Process Zalo messages here
    return res.status(200).json({ success: true });
  }
  
  res.status(200).json({ message: "Webhook OK" });
}
