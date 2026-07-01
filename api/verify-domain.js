export default function handler(req, res) {
  const { challenge } = req.query;
  
  if (challenge) {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(challenge);
  }
  
  res.status(200).json({ message: "OK" });
}
