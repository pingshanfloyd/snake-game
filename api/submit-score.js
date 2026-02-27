import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const data = await request.json();
    
    const { error } = await supabase
      .from('scores')
      .insert([{
        name: data.name,
        score: data.score,
        difficulty: data.difficulty,
        difficulty_name: data.difficultyName,
        wall_mode: data.wallMode,
        game_mode: data.gameMode,
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;
    
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
