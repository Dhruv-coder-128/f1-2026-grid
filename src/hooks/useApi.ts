import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions<T> {
  fetchFn: () => Promise<T>;
  fallback: T;
  deps?: React.DependencyList;
}

export function useApi<T>({ fetchFn, fallback, deps = [] }: UseApiOptions<T>) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      console.error('API fetch failed, using fallback:', err);
      setError('Unable to load live data. Showing cached data.');
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, loading, error, refetch: fetchData };
}
