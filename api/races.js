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
      const [{ data: races, error: racesError }, { data: drivers }] = await Promise.all([
        supabase.from('races').select('*').order('round', { ascending: true }),
        supabase.from('drivers').select('*'),
      ]);
      if (racesError) throw racesError;

      const driverMap = new Map((drivers || []).map((d) => [d.id, d]));
      const enriched = (races || []).map((r) => ({
        ...r,
        winner: r.winner_id ? driverMap.get(r.winner_id) || null : null,
      }));

      return res.status(200).json(enriched);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
