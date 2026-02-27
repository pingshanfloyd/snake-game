// 使用 Node.js 运行时，不是 Edge Runtime
export const config = {
  runtime: 'nodejs'
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const data = req.body;
    
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
    
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
