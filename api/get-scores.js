import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(request) {
  try {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(50);

    if (error) throw error;
    
    // 转换格式兼容前端
    const scores = data.map(item => ({
      name: item.name,
      score: item.score,
      difficulty: item.difficulty,
      difficultyName: item.difficulty_name,
      wallMode: item.wall_mode,
      gameMode: item.game_mode,
      timestamp: new Date(item.created_at).getTime()
    }));

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
