export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const FIREBASE_URL = process.env.FIREBASE_DATABASE_URL;
  const FIREBASE_SECRET = process.env.FIREBASE_SECRET;

  try {
    const data = await request.json();
    
    const response = await fetch(`${FIREBASE_URL}/scores.json?auth=${FIREBASE_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: Date.now()
      })
    });

    if (!response.ok) throw new Error('Failed to save');
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}