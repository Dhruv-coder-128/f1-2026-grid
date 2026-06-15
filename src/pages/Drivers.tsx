import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchDrivers, fetchTeams } from '../lib/api';
import { fallbackDrivers, fallbackTeams } from '../lib/fallbackData';
import { Driver, Team } from '../types';
import DriverCard from '../components/DriverCard';
import SectionHeader from '../components/SectionHeader';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';
import { Loader2, Search } from 'lucide-react';

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterTeam, setFilterTeam] = useState('all');
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const [d, t] = await Promise.all([fetchDrivers(), fetchTeams()]);
      setDrivers(d);
      setTeams(t);
    } catch {
      setError(true);
      setDrivers(fallbackDrivers);
      setTeams(fallbackTeams);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = drivers.filter((d) => {
    const matchesTeam = filterTeam === 'all' || d.team_id === filterTeam;
    const fullName = `${d.first_name} ${d.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase()) || d.code.toLowerCase().includes(search.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-f1-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="2026"
          highlight="Drivers"
          subtitle="Meet the 22 elite drivers competing in the 2026 FIA Formula One World Championship"
        />

        <div className="mt-10 flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search drivers by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-f1-card border border-f1 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-f1-red transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setFilterTeam('all')}
              className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                filterTeam === 'all' ? 'bg-f1-red text-white' : 'bg-f1-card border border-f1 text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => setFilterTeam(team.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  filterTeam === team.id
                    ? 'text-white border-f1-red'
                    : 'bg-f1-card border-f1 text-gray-400 hover:text-white'
                }`}
                style={filterTeam === team.id ? { backgroundColor: `${team.color}20` } : {}}
              >
                {team.name}
              </button>
            ))}
          </div>
        </div>

        {loading && <SkeletonLoader />}

        {!loading && error && (
          <div className="mb-8">
            <ErrorState message="Showing cached data - live connection unavailable" onRetry={load} />
          </div>
        )}

        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((driver, idx) => (
                <DriverCard key={driver.id} driver={driver} index={idx} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center text-gray-400 py-20">
                <p className="text-xl font-display font-bold">No drivers match your search</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
