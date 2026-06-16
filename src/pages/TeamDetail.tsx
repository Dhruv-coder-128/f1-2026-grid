import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchTeams, fetchDrivers } from '../lib/api';
import { fallbackTeams, fallbackDrivers } from '../lib/fallbackData';
import { Team, Driver } from '../types';
import { ArrowLeft, Trophy, Users, MapPin, Building2, Calendar, TrendingUp } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-f1-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Hero */}
        <div 
          className="relative rounded-3xl overflow-hidden mb-10 border border-white/10"
          style={{ background: `linear-gradient(135deg, ${teamColor}20 0%, #050505 70%)` }}
        >
          <div 
            className="absolute inset-0 opacity-20 blur-3xl"
            style={{ backgroundColor: teamColor }}
          />
          
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2"
                style={{ borderColor: teamColor, backgroundColor: `${teamColor}20` }}
              >
                {team.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
              </div>
              <div>
                <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Constructor</p>
                <h1 className="font-display font-black text-4xl lg:text-6xl text-white">{team.full_name}</h1>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                <p className="font-black text-3xl text-white">{team.points}</p>
                <p className="text-xs uppercase text-gray-500">2026 Points</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                <p className="font-black text-3xl text-white">{team.position}{['st','nd','rd','th'][Math.min(team.position - 1, 3)]}</p>
                <p className="text-xs uppercase text-gray-500">Standing</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                <p className="font-black text-3xl text-white">{team.wins}</p>
                <p className="text-xs uppercase text-gray-500">Wins</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
                <p className="font-black text-3xl text-white">{team.championships}</p>
                <p className="text-xs uppercase text-gray-500">Titles</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Team Info */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
              <SectionHeader title="Team" highlight="Details" />
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
                  <TrendingUp size={20} className="text-f1-red" />
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

            {/* Drivers */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
              <SectionHeader title="Race" highlight="Drivers" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {teamDrivers.map((driver, idx) => (
                  <Link 
                    key={driver.id} 
                    to={`/drivers/${driver.id}`}
                    className="bg-black/40 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black border-2"
                        style={{ borderColor: teamColor, backgroundColor: `${teamColor}20` }}
                      >
                        {driver.code}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">#{driver.number}</p>
                        <p className="text-lg font-bold text-white group-hover:text-white">
                          {driver.first_name} <span style={{ color: teamColor }}>{driver.last_name}</span>
                        </p>
                        <p className="text-xs text-gray-500">{driver.points} pts</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-white mb-4">Constructor Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Podiums</span>
                  <span className="font-display font-bold text-white">{team.podiums}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Wins</span>
                  <span className="font-display font-bold text-white">{team.wins}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Championships</span>
                  <span className="font-display font-bold text-white">{team.championships}</span>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-gray-400">Points</span>
                  <span className="font-display font-bold text-white">{team.points}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
