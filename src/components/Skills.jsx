import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const skillGroups = [
  {
    key: 'frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap CSS','React.js', 'Tailwind CSS', 'Ant Design'],
  },
  {
    key: 'backend',
    items: ['PHP Laravel', 'C# ASP.NET Core', 'Node.js Express.js', 'Java Spring Boot', 'Python Flask'],
  },
  {
    key: 'database',
    items: ['MySQL', 'SQLite', 'PostgreSQL', 'Oracle DB', 'MongoDB', 'MsSQL Server Express', 'Firebase'],
  },
];

function Skills() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="skills"
      className="section-wrap"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <h2 className="section-title">{t('skills.title')}</h2>
      <p className="section-subtitle">{t('skills.subtitle')}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.key}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-soft transition dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t(`skills.${group.key}`)}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export default Skills;
