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

  try {
    console.log('🔄 Mengambil data databases dan targets dari Supabase...');

    // Ambil databases dengan targets
    const { data: databases, error } = await supabase
      .from('databases')
      .select(`
        id,
        name,
        is_active,
        created_at,
        users!inner(username),
        targets(
          id,
          jid,
          template_id,
          created_at
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    // Format response
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        databases: databases.map(db => ({
          id: db.id,
          name: db.name,
          owner: db.users.username,
          is_active: db.is_active,
          created_at: db.created_at,
          targets: db.targets.map(t => ({
            jid: t.jid,
            template_id: t.template_id,
            created_at: t.created_at
          })),
          target_count: db.targets.length
        })),
        summary: {
          total_databases: databases.length,
          total_targets: databases.reduce((total, db) => total + db.targets.length, 0),
          active_databases: databases.filter(db => db.is_active).length
        }
      }
    };

    // Pretty print JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(JSON.stringify(response, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
    
    const errorResponse = {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(500).send(JSON.stringify(errorResponse, null, 2));
  }
}
