import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { projects } from '../data/projects';

function Projects() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="projects"
      className="section-wrap"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <h2 className="section-title">{t('projects.title')}</h2>
      <p className="section-subtitle">{t('projects.subtitle')}</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: 0.42, delay: index * 0.07 }}
            whileHover={{ y: -5 }}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-soft transition dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={t(`projects.items.${project.id}.title`)}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {t(`projects.items.${project.id}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t(`projects.items.${project.id}.description`)}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                >
                  <FiGithub />
                  {t('projects.github')}
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
                >
                  <FiArrowUpRight />
                  {t('projects.liveDemo')}
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;
