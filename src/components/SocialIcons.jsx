import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaGithub, FaLinkedin, FaTelegram, FaTiktok } from 'react-icons/fa';
import { socialLinks } from '../data/socialLinks';

const socialItems = [
  {
    key: 'facebook',
    label: 'Facebook',
    icon: FaFacebook,
    hoverColorClass: 'hover:text-blue-600 dark:hover:text-blue-400',
  },
  {
    key: 'telegram',
    label: 'Telegram',
    icon: FaTelegram,
    hoverColorClass: 'hover:text-sky-500 dark:hover:text-sky-300',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: FaLinkedin,
    hoverColorClass: 'hover:text-blue-700 dark:hover:text-blue-300',
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: FaGithub,
    hoverColorClass: 'hover:text-slate-900 dark:hover:text-white',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    icon: FaTiktok,
    hoverColorClass: 'hover:text-rose-500 dark:hover:text-rose-300',
  },
];

function SocialIcons({ className = '', withLabels = false }) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>
      {socialItems.map((item) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.key}
            href={socialLinks[item.key]}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.label}
            title={t(`contact.tooltips.${item.key}`)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className={`group relative inline-flex items-center rounded-xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition-all duration-300 hover:border-cyan-300 ${item.hoverColorClass} dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-cyan-500 ${
              withLabels ? 'gap-2 px-3.5 py-2.5' : 'h-11 w-11 justify-center'
            }`}
          >
            <Icon className="text-lg" aria-hidden="true" />
            {withLabels && <span className="text-sm font-medium">{item.label}</span>}
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
              {t(`contact.tooltips.${item.key}`)}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default SocialIcons;
