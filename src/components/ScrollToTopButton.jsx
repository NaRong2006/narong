import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowUp } from 'react-icons/fi';

const SCROLL_THRESHOLD = 320;

function ScrollToTopButton() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed bottom-24 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-lg text-slate-700 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
      aria-label={t('effects.scrollToTop')}
      title={t('effects.scrollToTop')}
    >
      <FiArrowUp />
    </motion.button>
  );
}

export default ScrollToTopButton;
