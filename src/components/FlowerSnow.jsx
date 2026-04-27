import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPause, FiPlay } from 'react-icons/fi';

const PARTICLE_COUNT = 18;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createParticles = () =>
  Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
    id: index,
    left: randomBetween(0, 100),
    duration: randomBetween(10, 20),
    delay: randomBetween(-20, 0),
    drift: randomBetween(40, 140),
    size: randomBetween(14, 30),
    opacity: randomBetween(0.3, 0.7),
  }));

function FlowerIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <ellipse cx="16" cy="35" rx="11.5" ry="8.8" transform="rotate(-18 16 35)" fill="#E9C158" />
      <ellipse cx="48" cy="35" rx="11.5" ry="8.8" transform="rotate(18 48 35)" fill="#E9C158" />
      <ellipse cx="32" cy="16" rx="8.8" ry="12.2" fill="#D7A520" />

      <ellipse cx="25" cy="30" rx="7.4" ry="6.1" transform="rotate(-24 25 30)" fill="#F3D474" />
      <ellipse cx="39" cy="30" rx="7.4" ry="6.1" transform="rotate(24 39 30)" fill="#F3D474" />
      <ellipse cx="32" cy="34.5" rx="8" ry="6.5" fill="#E4B947" />

      <ellipse cx="32" cy="35" rx="4.5" ry="3.6" fill="#AF6C15" />
      <ellipse cx="32.5" cy="36" rx="2.3" ry="1.8" fill="#7D4611" />
    </svg>
  );
}

function FlowerSnow({ isRunning, onToggle, showControl = false }) {
  const { t } = useTranslation();
  const particles = useMemo(() => createParticles(), []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
        {isRunning &&
          particles.map((particle) => (
            <span
              key={particle.id}
              className="flower-flake"
              style={{
                left: `${particle.left}%`,
                opacity: particle.opacity,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                '--drift': `${particle.drift}px`,
                '--size': `${particle.size}px`,
              }}
            >
              <FlowerIcon />
            </span>
          ))}
      </div>

      {showControl && (
        <button
          type="button"
          onClick={onToggle}
          className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
        >
          {isRunning ? <FiPause /> : <FiPlay />}
          {isRunning ? t('effects.stopFlowerFall') : t('effects.startFlowerFall')}
        </button>
      )}
    </>
  );
}

export default FlowerSnow;
