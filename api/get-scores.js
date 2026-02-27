// 使用 Node.js 运行时，不是 Edge Runtime
export const config = {
  runtime: 'nodejs'
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
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

    return res.status(200).json(scores);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
