import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="about"
      className="section-wrap"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <h2 className="section-title">{t('about.title')}</h2>
      <p className="section-subtitle">{t('about.summary1')}</p>
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
        {t('about.summary2')}
      </p>
    </motion.section>
  );
}

export default About;
