import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CircleFlag } from 'react-circle-flags';
import { FiChevronDown, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';

const linkIds = ['home', 'about', 'skills', 'projects', 'contact'];
const languageOptions = [
  { code: 'en', countryCode: 'us', label: 'English' },
  { code: 'kh', countryCode: 'kh', label: 'Khmer' },
];

function LanguageDropdown({ language, onLanguageChange, align = 'right', direction = 'down' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const currentLanguage = languageOptions.find((option) => option.code === language) || languageOptions[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelectLanguage = (code) => {
    onLanguageChange(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white/85 px-3 text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <CircleFlag
          countryCode={currentLanguage.countryCode}
          height={22}
          width={22}
          aria-hidden="true"
          alt=""
          className="pointer-events-none rounded-full"
        />
        <FiChevronDown
          className={`text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute z-50 w-40 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-soft backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 ${
              direction === 'up' ? 'bottom-full mb-2' : 'mt-2'
            } ${
              align === 'left' ? 'left-0' : 'right-0'
            }`}
          >
            {languageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => handleSelectLanguage(option.code)}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                  language === option.code
                    ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <CircleFlag
                  countryCode={option.countryCode}
                  height={20}
                  width={20}
                  aria-hidden="true"
                  alt=""
                  className="pointer-events-none rounded-full"
                />
                <span>{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar({ isDarkMode, language, onLanguageChange, onToggleDarkMode }) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = linkIds.map((id) => ({
    id,
    label: t(`nav.${id}`),
  }));

  const navLinkClass =
    'text-sm font-medium text-slate-700 transition-colors hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-400';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Narong<span className="text-cyan-600 dark:text-cyan-400">.dev</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={navLinkClass}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            aria-label={isDarkMode ? 'Enable light mode' : 'Enable dark mode'}
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>

          <LanguageDropdown language={language} onLanguageChange={onLanguageChange} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            aria-label={isDarkMode ? 'Enable light mode' : 'Enable dark mode'}
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/90 md:hidden"
          >
            <div className="mx-auto w-full max-w-6xl px-4 pb-5 pt-4 sm:px-6">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${navLinkClass} rounded-lg px-2 py-2 hover:bg-cyan-50 dark:hover:bg-slate-900`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <LanguageDropdown
                  language={language}
                  onLanguageChange={onLanguageChange}
                  align="left"
                  direction="up"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
