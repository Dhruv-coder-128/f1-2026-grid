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
      const [{ data: drivers }, { data: teams }] = await Promise.all([
        supabase.from('drivers').select('*').order('points', { ascending: false }),
        supabase.from('teams').select('*').order('points', { ascending: false }),
      ]);

      const teamMap = new Map((teams || []).map((t) => [t.id, t]));
      const enrichedDrivers = (drivers || []).map((d) => ({
        ...d,
        teams: teamMap.get(d.team_id) || null,
      }));

      return res.status(200).json({ drivers: enrichedDrivers, teams: teams || [] });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
