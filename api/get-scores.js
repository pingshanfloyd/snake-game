module.exports = async (req, res) => {
  const FIREBASE_URL = process.env.FIREBASE_DATABASE_URL;
  const FIREBASE_SECRET = process.env.FIREBASE_SECRET;

  if (!FIREBASE_URL || !FIREBASE_SECRET) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  try {
    const response = await fetch(`${FIREBASE_URL}/scores.json?auth=${FIREBASE_SECRET}`);
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    const scores = Object.values(data || {});
    scores.sort((a, b) => b.score - a.score);
    
    return res.json(scores.slice(0, 10));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
