module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const FIREBASE_URL = process.env.FIREBASE_DATABASE_URL;
  const FIREBASE_SECRET = process.env.FIREBASE_SECRET;

  // 检查环境变量
  if (!FIREBASE_URL || !FIREBASE_SECRET) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  try {
    const response = await fetch(`${FIREBASE_URL}/scores.json?auth=${FIREBASE_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...req.body,
        timestamp: Date.now()
      })
    });

    if (!response.ok) throw new Error('Failed to save');
    
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
