export default async function handler(request) {
  const FIREBASE_URL = process.env.FIREBASE_DATABASE_URL;
  const FIREBASE_SECRET = process.env.FIREBASE_SECRET;

  try {
    const response = await fetch(`${FIREBASE_URL}/scores.json?auth=${FIREBASE_SECRET}&orderBy="score"&limitToLast=10`);
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    const scores = [];
    
    for (const key in data) {
      scores.push(data[key]);
    }
    
    scores.sort((a, b) => b.score - a.score);
    
    return new Response(JSON.stringify(scores), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

