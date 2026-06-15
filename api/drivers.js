import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { team, id, sort } = req.query;
      let query = supabase.from('drivers').select('*');
      if (team) query = query.eq('team_id', team);
      if (id) query = query.eq('id', id).single();
      if (sort === 'points') query = query.order('points', { ascending: false });
      else query = query.order('position', { ascending: true });

      const { data: drivers, error: driversError } = await query;
      if (driversError) throw driversError;

      const { data: teams } = await supabase.from('teams').select('*');
      const teamMap = new Map((teams || []).map((t) => [t.id, t]));

      const enriched = Array.isArray(drivers)
        ? drivers.map((d) => ({ ...d, teams: teamMap.get(d.team_id) || null }))
        : drivers
        ? { ...drivers, teams: teamMap.get(drivers.team_id) || null }
        : null;

      return res.status(200).json(enriched);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
