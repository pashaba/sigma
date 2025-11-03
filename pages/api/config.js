import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { db_id } = req.query;

  if (!db_id) {
    return res.status(400).json({ error: 'db_id parameter required' });
  }

  try {
    // Get database with targets
    const { data: database, error } = await supabase
      .from('databases')
      .select(`
        *,
        targets (*)
      `)
      .eq('id', db_id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!database) {
      return res.status(404).json({ error: 'Database not found' });
    }

    // Format response sesuai kebutuhan bot
    const config = {
      targets: database.targets.map(target => [target.jid, target.template_id.toString()]),
      settings: { 
        active: database.is_active,
        name: database.name
      }
    };

    console.log(`✅ Config delivered for DB ${db_id}: ${config.targets.length} targets`);
    
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).json(config);

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
