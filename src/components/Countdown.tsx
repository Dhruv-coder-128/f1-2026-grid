import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map((unit) => (
        <motion.div
          key={unit.label}
          whileHover={{ scale: 1.05, borderColor: 'rgba(225, 6, 0, 0.4)' }}
          className="bg-black/60 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm transition-colors"
        >
          <div className="font-display font-black text-2xl sm:text-3xl text-white">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1 font-bold">{unit.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
