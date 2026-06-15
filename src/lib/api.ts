// Helper to add cache-busting timestamp
const addCacheBuster = (url: string) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_t=${Date.now()}`;
};

export async function fetchTeams() {
  const res = await fetch(addCacheBuster('/api/teams'), { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  if (!res.ok) throw new Error('Failed to fetch teams');
  return res.json();
}

export async function fetchDrivers(team?: string, sort?: string) {
  const params = new URLSearchParams();
  if (team) params.set('team', team);
  if (sort) params.set('sort', sort);
  const url = `/api/drivers?${params.toString()}`;
  const res = await fetch(addCacheBuster(url), { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  if (!res.ok) throw new Error('Failed to fetch drivers');
  return res.json();
}

export async function fetchDriver(id: string) {
  const url = `/api/drivers?id=${id}`;
  const res = await fetch(addCacheBuster(url), { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  if (!res.ok) throw new Error('Failed to fetch driver');
  return res.json();
}

export async function fetchRaces() {
  const res = await fetch(addCacheBuster('/api/races'), { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  if (!res.ok) throw new Error('Failed to fetch races');
  return res.json();
}

export async function fetchResults(race?: string) {
  const params = race ? `?race=${race}` : '';
  const url = `/api/results${params}`;
  const res = await fetch(addCacheBuster(url), { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  if (!res.ok) throw new Error('Failed to fetch results');
  return res.json();
}

export async function fetchStandings() {
  const res = await fetch(addCacheBuster('/api/standings'), { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  if (!res.ok) throw new Error('Failed to fetch standings');
  return res.json();
}
