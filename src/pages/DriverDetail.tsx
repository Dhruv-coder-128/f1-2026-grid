import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchDrivers, fetchDriver } from '../lib/api';
import { fallbackDrivers } from '../lib/fallbackData';
import { Driver } from '../types';
import { driverBios, driverStats, nationalityFlags } from '../lib/data';
import { getCountryFlag, getPositionSuffix } from '../lib/utils';
import { ArrowLeft, Trophy, Flag, Clock, Gauge, Award, Calendar, Star, TrendingUp, Activity } from 'lucide-react';
import ErrorState from '../components/ErrorState';

export default function DriverDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      // Fetch ALL drivers for the compare dropdown AND the specific driver
      const [allData, singleDriver] = await Promise.all([
        fetchDrivers(undefined, 'points'),
        id ? fetchDriver(id) : Promise.resolve(null)
      ]);
      setAllDrivers(allData);
      if (singleDriver) {
        setDriver(singleDriver);
      } else {
        const found = allData.find((d: Driver) => d.id === id);
        if (found) setDriver(found);
        else setError(true);
      }
    } catch (err) {
      console.error('DriverDetail load error:', err);
      setError(true);
      setAllDrivers(fallbackDrivers);
      const found = fallbackDrivers.find((d) => d.id === id);
      if (found) setDriver(found);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  useEffect(() => {
    const fav = localStorage.getItem('f1-favorite-driver');
    setFavorite(fav === id);
  }, [id]);

  const toggleFavorite = () => {
    if (favorite) {
      localStorage.removeItem('f1-favorite-driver');
      setFavorite(false);
    } else {
      localStorage.setItem('f1-favorite-driver', id || '');
      setFavorite(true);
    }
  };

  const compareDriver = compareId ? allDrivers.find((d) => d.id === compareId) : null;
  const stats = driver ? driverStats[`${driver.first_name.toLowerCase()}-${driver.last_name.toLowerCase()}`] : null;
  const compareStats = compareDriver ? driverStats[`${compareDriver.first_name.toLowerCase()}-${compareDriver.last_name.toLowerCase()}`] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-f1-dark flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-2 border-f1-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="min-h-screen bg-f1-dark pt-24 px-4">
        <ErrorState message="Driver not found" />
      </div>
    );
  }

  const teamColor = driver.teams?.color || '#e10600';
  const bio = driverBios[`${driver.first_name.toLowerCase()}-${driver.last_name.toLowerCase()}`] || `${driver.first_name} ${driver.last_name} competes in the 2026 Formula 1 World Championship with ${driver.teams?.name}.`;
  const flagCode = nationalityFlags[driver.nationality] || driver.nationality.slice(0, 2).toUpperCase();

  const imageMap: Record<string, string> = {
    'kimi-antonelli': '/drivers/kimi.avif',
    'lewis-hamilton': '/drivers/lewis.avif',
    'george-russell': '/drivers/george.avif',
    'charles-leclerc': '/drivers/charles.avif',
    'lando-norris': '/drivers/lando.avif',
    'oscar-piastri': '/drivers/oscar.avif',
    'max-verstappen': '/drivers/max.avif',
    'pierre-gasly': '/drivers/pierre.avif',
    'isack-hadjar': '/drivers/isack.avif',
    'liam-lawson': '/drivers/liam.avif',
    'oliver-bearman': '/drivers/oliver.avif',
    'franco-colapinto': '/drivers/franco.avif',
    'arvid-lindblad': '/drivers/arvid.avif',
    'carlos-sainz': '/drivers/carlos.avif',
    'alexander-albon': '/drivers/alexander.avif',
    'esteban-ocon': '/drivers/estaban.avif',
    'gabriel-bortoleto': '/drivers/gabriel.avif',
    'fernando-alonso': '/drivers/fernando.avif',
    'nico-hulkenberg': '/drivers/nico.avif',
    'valtteri-bottas': '/drivers/valtteri.avif',
    'sergio-perez': '/drivers/sergio.avif',
    'lance-stroll': '/drivers/lance.avif',
  };

  const driverImage = imageMap[driver.id];


  const StatBox = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color?: string }) => (
    <div className="stat-card rounded-xl p-5 text-center group">
      <Icon size={24} className="mx-auto mb-3 transition-colors" style={{ color: color || teamColor }} />
      <p className="font-display font-black text-2xl text-white mb-1">{value}</p>
      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-f1-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div
          className="relative rounded-3xl overflow-hidden mb-10 border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${teamColor}20 0%, #050505 70%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20 blur-3xl"
            style={{ backgroundColor: teamColor }}
          />

          <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 text-[180px] lg:text-[300px] font-black text-white/5 select-none">
            {driver.number}
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">

            <div className="flex justify-center">
              {driverImage && (
                <img
                  src={driverImage}
                  alt={`${driver.first_name} ${driver.last_name}`}
                  className="
            h-[400px]
            lg:h-[550px]
            object-contain
            drop-shadow-[0_0_50px_rgba(0,0,0,0.9)]
          "
                />
              )}
            </div>

            <div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">
                  {getCountryFlag(flagCode)}
                </span>
                <span className="uppercase tracking-[0.25em] text-gray-400 text-sm font-bold">
                  {driver.nationality}
                </span>
              </div>

              <h1 className="font-display font-black leading-none">
                <span className="block text-white text-5xl lg:text-7xl">
                  {driver.first_name}
                </span>

                <span
                  className="block text-6xl lg:text-8xl"
                  style={{ color: teamColor }}
                >
                  {driver.last_name}
                </span>
              </h1>

              <p className="mt-5 text-2xl font-semibold text-white">
                {driver.teams?.name}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                  <p className="font-black text-3xl text-white">
                    #{driver.number}
                  </p>
                  <p className="text-xs uppercase text-gray-500">
                    Number
                  </p>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                  <p className="font-black text-3xl text-white">
                    {driver.points}
                  </p>
                  <p className="text-xs uppercase text-gray-500">
                    Points
                  </p>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                  <p className="font-black text-3xl text-white">
                    {getPositionSuffix(driver.position)}
                  </p>
                  <p className="text-xs uppercase text-gray-500">
                    Position
                  </p>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                  <p className="font-black text-3xl text-white">
                    {driver.code}
                  </p>
                  <p className="text-xs uppercase text-gray-500">
                    Code
                  </p>
                </div>

              </div>



            </div>
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-white mb-4 flex items-center gap-2">
              <Activity size={24} className="text-f1-red" /> About
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">{bio}</p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatBox icon={Trophy} label="2026 Points" value={driver.points} />
              <StatBox icon={Award} label="Championship" value={getPositionSuffix(driver.position)} />
              <StatBox icon={Flag} label="Team" value={driver.teams?.name || ''} />
              <StatBox icon={Gauge} label="Wins" value={stats?.wins ?? 0} />
              <StatBox icon={Clock} label="Podiums" value={stats?.podiums ?? 0} />
              <StatBox icon={Calendar} label="GP Starts" value={stats?.gpStarts ?? 0} />
            </div>
          </div>

          {/* Compare Panel */}
          <div className="bg-f1-card border border-white/10 rounded-2xl p-6 h-fit">
            <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-f1-red" /> Compare Driver
            </h3>
            <select
              value={compareId || ''}
              onChange={(e) => setCompareId(e.target.value || null)}
              className="w-full bg-black border border-f1 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-f1-red transition-colors mb-6"
            >
              <option value="">Select a driver...</option>
              {allDrivers.filter((d) => d.id !== driver.id).map((d) => (
                <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
              ))}
            </select>

            {compareDriver && compareStats && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {[
                  { label: 'Driver', value: `${compareDriver.first_name} ${compareDriver.last_name}` },
                  { label: '2026 Points', value: compareDriver.points },
                  { label: 'Wins', value: compareStats.wins },
                  { label: 'Podiums', value: compareStats.podiums },
                  { label: 'Championships', value: compareStats.worldChampionships },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between pb-3 border-b border-white/10 last:border-0">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <span className="font-display font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Career Stats */}
        <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
          <h2 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-2">
            <Trophy size={24} className="text-f1-red" /> Career Statistics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'World Championships', value: stats?.worldChampionships ?? 0 },
              { label: 'Race Wins', value: stats?.wins ?? 0 },
              { label: 'Podiums', value: stats?.podiums ?? 0 },
              { label: 'Pole Positions', value: stats?.poles ?? 0 },
              { label: 'Fastest Laps', value: stats?.fastestLaps ?? 0 },
              { label: 'Grand Prix Starts', value: stats?.gpStarts ?? 0 },
              { label: '2026 Points', value: driver.points },
              { label: '2026 Position', value: getPositionSuffix(driver.position) },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-black/40 rounded-xl border border-white/5 hover:border-f1-red/30 transition-colors">
                <p className="font-display font-black text-3xl text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
