export default async function handler(request) {
  const FIREBASE_URL = process.env.FIREBASE_DATABASE_URL;
  const FIREBASE_SECRET = process.env.FIREBASE_SECRET;
  const DB_PATH = process.env.DB_PATH || 'scores';

  try {
    const response = await fetch(`${FIREBASE_URL}/${DB_PATH}.json?auth=${FIREBASE_SECRET}`);
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    
    if (!data) return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });

    // Convert to array and sort by score descending
    const scores = Object.entries(data).map(([id, score]) => ({
      id,
      ...score
    }));

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    // Take top 50
    const topScores = scores.slice(0, 50);

    return new Response(JSON.stringify(topScores), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
