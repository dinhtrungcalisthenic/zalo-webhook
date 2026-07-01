export default function handler(req, res) {
  const { challenge } = req.query;
  
  if (challenge) {
    // Zalo might need JSON response
    return res.status(200).json({ challenge });
  }
  
  res.status(200).json({ message: "OK" });
}
