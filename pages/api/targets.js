export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { db_id } = req.query;

  if (!db_id) {
    return res.status(400).json({ error: 'db_id parameter required' });
  }

  try {
    if (req.method === 'GET') {
      // Get targets for specific database
      const targets = [
        { id: '1', jid: '120363401455900532@newsletter', template_id: 7 },
        { id: '2', jid: '120363421526426474@g.us', template_id: 1 },
        { id: '3', jid: '120363419506559832@g.us', template_id: 2 }
      ];

      res.status(200).json({ success: true, targets });

    } else if (req.method === 'POST') {
      // Add new target
      const { jid, template_id } = req.body;
      
      if (!jid || !template_id) {
        return res.status(400).json({ error: 'jid and template_id required' });
      }

      // Simulate adding to database
      const newTarget = {
        id: 'target-' + Date.now(),
        jid,
        template_id: parseInt(template_id),
        created_at: new Date().toISOString()
      };

      res.status(201).json({ success: true, target: newTarget });

    } else if (req.method === 'DELETE') {
      // Delete target
      const { target_id } = req.body;
      
      if (!target_id) {
        return res.status(400).json({ error: 'target_id required' });
      }

      res.status(200).json({ success: true, message: 'Target deleted' });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
