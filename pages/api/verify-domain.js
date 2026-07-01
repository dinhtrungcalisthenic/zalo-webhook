export default function handler(req, res) {
  const { challenge } = req.query;
  
  if (challenge) {
    return res.status(200).json({ challenge });
  }
  
  res.status(200).json({ message: "Verify endpoint OK" });
}
