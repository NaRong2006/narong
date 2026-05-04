import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import profilePlaceholder from '../assets/ChatGPT Image May 4, 2026, 08_36_51 PM.png';

function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="section-wrap flex min-h-[84vh] items-center">
      <div className="grid w-full gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="inline-flex rounded-full border border-slate-300/80 bg-slate-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            {t('hero.badge')}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[4.15rem] lg:leading-[1.06]">
            {t('hero.name')}
          </h1>
          <p className="mt-4 text-xl font-semibold text-cyan-700 dark:text-cyan-300 sm:text-2xl">
            {t('hero.title')}
          </p>
          <p className="max-w-xl mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t('hero.intro')}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <motion.a
              href="#projects"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 text-sm font-semibold text-white transition shadow-lg rounded-xl bg-cyan-600 shadow-cyan-600/30 hover:bg-cyan-500"
            >
              {t('hero.viewProjects')}
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 text-sm font-semibold transition bg-white border rounded-xl border-slate-300 text-slate-800 hover:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
            >
              {t('hero.contact')}
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-3xl bg-white/85 shadow-[0_32px_70px_-38px_rgba(15,23,42,0.9)] backdrop-blur-sm dark:bg-slate-900/70 sm:max-w-[22rem] lg:justify-self-end"
        >
          <div className="relative overflow-hidden bg-slate-950">
            <img
              src={profilePlaceholder}
              alt={t('hero.name')}
              className="h-[24rem] w-full object-cover object-[center_16%] sm:h-[27rem]"
              loading="eager"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/5" />
          </div>

          <div className="flex items-center gap-3 px-4 py-3 bg-white/90 dark:bg-slate-950/70">
            <span className="w-1 rounded-full h-9 bg-cyan-500" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('hero.name')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('hero.title')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
