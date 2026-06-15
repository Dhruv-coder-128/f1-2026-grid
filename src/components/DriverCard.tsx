import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Driver } from '../types';
import { getPositionSuffix } from '../lib/utils';
import { ChevronRight } from 'lucide-react';

interface DriverCardProps {
  driver: Driver;
  index: number;
}

export default function DriverCard({ driver, index }: DriverCardProps) {
  const teamColor = driver.teams?.color || '#e10600';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/drivers/${driver.id}`} className="block h-full group">
        <div className="driver-card rounded-2xl overflow-hidden h-full flex flex-col relative">

          <div
            className="h-1.5 w-full"
            style={{ backgroundColor: teamColor }}
          />

          <div className="p-4 flex flex-col h-full">

            {/* Driver Image Section */}
            <div className="relative h-[220px] mb-4 overflow-hidden rounded-xl">

              <span className="absolute top-2 right-3 text-7xl font-black text-white/5 z-10 select-none">
                {driver.position}
              </span>

              {driverImage && (
                <img
                  src={driverImage}
                  alt={`${driver.first_name} ${driver.last_name}`}
                  className="
absolute
top-2
left-1/2
-translate-x-1/2
w-[80%]
h-auto
object-contain
"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Driver Code */}
              <div className="absolute top-3 left-3 z-20">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-display font-black text-xl border-2"
                  style={{
                    borderColor: teamColor,
                    backgroundColor: `${teamColor}20`,
                  }}
                >
                  {driver.code}
                </div>
              </div>

              {/* Name */}
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-display font-bold text-white text-lg leading-tight">
                  {driver.first_name}
                </p>

                <p
                  className="font-display font-black text-2xl"
                  style={{ color: teamColor }}
                >
                  {driver.last_name}
                </p>
              </div>
            </div>


            {/* Driver Details */}
            <div className="space-y-4 mt-auto">

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">
                  {driver.nationality}
                </span>

                <span className="font-display font-black text-white text-3xl">
                  #{driver.number}
                </span>
              </div>

              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl border"
                style={{
                  backgroundColor: `${teamColor}10`,
                  borderColor: `${teamColor}30`,
                }}
              >
                <span className="text-xs text-gray-300 uppercase tracking-wider font-bold">
                  {driver.teams?.name}
                </span>

                <span className="font-display font-bold text-white">
                  {driver.points} PTS
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  {getPositionSuffix(driver.position)} in standings
                </span>

                <ChevronRight
                  size={18}
                  className="text-f1-red group-hover:translate-x-1 transition-transform"
                />
              </div>

            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}