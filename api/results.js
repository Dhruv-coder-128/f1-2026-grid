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
      const { race } = req.query;
      let query = supabase.from('results').select('*').order('position', { ascending: true });
      if (race) query = query.eq('race_id', race);

      const { data: results, error: resultsError } = await query;
      if (resultsError) throw resultsError;

      const [{ data: drivers }, { data: races }, { data: teams }] = await Promise.all([
        supabase.from('drivers').select('*'),
        supabase.from('races').select('*'),
        supabase.from('teams').select('*'),
      ]);

      const driverMap = new Map((drivers || []).map((d) => [d.id, d]));
      const raceMap = new Map((races || []).map((r) => [r.id, r]));
      const teamMap = new Map((teams || []).map((t) => [t.id, t]));

      const enriched = (results || []).map((r) => {
        const driver = driverMap.get(r.driver_id);
        return {
          ...r,
          drivers: driver ? { ...driver, teams: teamMap.get(driver.team_id) || null } : null,
          races: raceMap.get(r.race_id) || null,
        };
      });

      return res.status(200).json(enriched);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
