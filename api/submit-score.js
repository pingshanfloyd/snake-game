export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const FIREBASE_URL = process.env.FIREBASE_DATABASE_URL;
  const FIREBASE_SECRET = process.env.FIREBASE_SECRET;
  const DB_PATH = process.env.DB_PATH || 'scores';

  try {
    const data = await request.json();
    
    // 添加超时控制
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5秒超时
    
    const response = await fetch(`${FIREBASE_URL}/${DB_PATH}.json?auth=${FIREBASE_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: Date.now()
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeout);

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
