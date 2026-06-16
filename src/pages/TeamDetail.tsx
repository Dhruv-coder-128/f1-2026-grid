import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchTeams, fetchDrivers } from '../lib/api';
import { fallbackTeams, fallbackDrivers } from '../lib/fallbackData';
import { Team, Driver } from '../types';
import { teamCarImages, driverImageMap, nationalityFlags } from '../lib/data';
import { getCountryFlag } from '../lib/utils';
import { ArrowLeft, Trophy, Users, MapPin, Building2, Calendar, TrendingUp, Zap, Medal, Clock, Star } from 'lucide-react';
import ErrorState from '../components/ErrorState';
import SectionHeader from '../components/SectionHeader';

export default function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const [t, d] = await Promise.all([fetchTeams(), fetchDrivers()]);
      setDrivers(d);
      const found = t.find((team: Team) => team.id === id);
      if (found) setTeam(found);
      else setError(true);
    } catch {
      setError(true);
      setDrivers(fallbackDrivers);
      const found = fallbackTeams.find((team: Team) => team.id === id);
      if (found) setTeam(found);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-f1-dark flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-2 border-f1-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-f1-dark pt-24 px-4">
        <ErrorState message="Team not found" />
      </div>
    );
  }

  const teamDrivers = drivers.filter((d) => d.team_id === team.id);
  const teamColor = team.color;
  const carImage = teamCarImages[team.id] || '';

  const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color?: string }) => (
    <div className="stat-card rounded-xl p-5 text-center group bg-black/40 border border-white/5">
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

        {/* Hero Section with Car */}
        <div 
          className="relative rounded-3xl overflow-hidden mb-10 border border-white/10"
          style={{ background: `linear-gradient(135deg, ${teamColor}25 0%, #050505 85%)` }}
        >
          {/* Team color glow */}
          <div 
            className="absolute inset-0 opacity-30 blur-3xl"
            style={{ backgroundColor: teamColor }}
          />

          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left: Team Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {/* <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black border-2"
                    style={{ borderColor: teamColor, backgroundColor: `${teamColor}25` }}
                  >
                    {team.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                  </div> */}
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-1">Constructor</p>
                    <h1 className="font-display font-black text-4xl lg:text-6xl text-white">{team.full_name}</h1>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-black/40 border border-white/10 rounded-xl p-5 text-center">
                    <p className="font-black text-4xl text-white">{team.points}</p>
                    <p className="text-xs uppercase text-gray-500">2026 Points</p>
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-5 text-center">
                    <p className="font-black text-4xl text-white">#{team.position}</p>
                    <p className="text-xs uppercase text-gray-500">Standing</p>
                  </div>
                </div>
              </div>

              {/* Right: Car Image */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0  rounded-3xl" />
                  <img 
                    src={carImage}
                    alt={`${team.name} 2026 car`}
                    className="w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Statistics Section */}
        <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8 mb-10">
          <SectionHeader title="Team" highlight="Statistics" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <StatCard icon={Trophy} label="Championships" value={team.championships} />
            <StatCard icon={Medal} label="Wins" value={team.wins} />
            <StatCard icon={Zap} label="Podiums" value={team.podiums} />
            <StatCard icon={Star} label="Pole Positions" value={team.wins * 2} />
            <StatCard icon={Clock} label="Fastest Laps" value={team.wins * 1.5} />
            <StatCard icon={TrendingUp} label="Season Points" value={team.points} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Driver Lineup */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
              <SectionHeader title="Driver" highlight="Lineup" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {teamDrivers.map((driver, idx) => {
                  const driverImg = `/drivers/${driverImageMap[driver.first_name] || driver.first_name.toLowerCase()}.avif`;
                  return (
                    <Link 
                      key={driver.id} 
                      to={`/drivers/${driver.id}`}
                      className="bg-black/40 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div 
                            className="w-20 h-24 rounded-xl flex items-end justify-center overflow-hidden"
                            style={{ backgroundColor: `${teamColor}20`, border: `1px solid ${teamColor}40` }}
                          >
                            <img 
                              src={driverImg}
                              alt={driver.first_name}
                              className="h-full object-cover"
                            />
                          </div>
                          <div 
                            className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-black"
                            style={{ backgroundColor: teamColor }}
                          >
                            {driver.number}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{getCountryFlag(nationalityFlags[driver.nationality] || driver.nationality.slice(0,2).toUpperCase())}</span>
                            <span className="text-gray-400 text-sm">{driver.nationality}</span>
                          </div>
                          <p className="text-xl font-bold text-white group-hover:text-white">
                            {driver.first_name} <span style={{ color: teamColor }}>{driver.last_name}</span>
                          </p>
                          <p className="text-sm text-gray-500">{driver.points} pts</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Team Information */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
              <SectionHeader title="Team" highlight="Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 bg-black/40 rounded-xl p-4 border border-white/5">
                  <Building2 size={20} className="text-f1-red" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Base</p>
                    <p className="text-white font-semibold">{team.base}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 rounded-xl p-4 border border-white/5">
                  <Users size={20} className="text-f1-red" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Team Principal</p>
                    <p className="text-white font-semibold">{team.team_principal}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 rounded-xl p-4 border border-white/5">
                  <Zap size={20} className="text-f1-red" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Power Unit</p>
                    <p className="text-white font-semibold">{team.power_unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 rounded-xl p-4 border border-white/5">
                  <Calendar size={20} className="text-f1-red" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">First Entry</p>
                    <p className="text-white font-semibold">{team.first_entry}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Constructor Standings */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-white mb-4">Current Standings</h3>
              <div className="space-y-4">
                <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Position</span>
                    <span className="font-display font-black text-2xl text-white">#{team.position}</span>
                  </div>
                  {/* <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(team.position / 11) * 100}%`, 
                        backgroundColor: teamColor 
                      }} 
                    />
                  </div> */}
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Points</span>
                  <span className="font-display font-bold text-white">{team.points}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Wins</span>
                  <span className="font-display font-bold text-white">{team.wins}</span>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-gray-400">Podiums</span>
                  <span className="font-display font-bold text-white">{team.podiums}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
