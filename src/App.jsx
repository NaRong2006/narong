import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FlowerSnow from './components/FlowerSnow';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import ScrollToTopButton from './components/ScrollToTopButton';
import Skills from './components/Skills';

const THEME_STORAGE_KEY = 'theme';
const LANGUAGE_STORAGE_KEY = 'language';
const FLOWER_FALL_STORAGE_KEY = 'flower-fall-enabled';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) {
    return savedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
};

const getInitialFlowerFall = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  const savedState = window.localStorage.getItem(FLOWER_FALL_STORAGE_KEY);
  if (savedState === null) {
    return true;
  }

  return savedState === 'true';
};

function App() {
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [isFlowerFallEnabled, setIsFlowerFallEnabled] = useState(getInitialFlowerFall);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language === 'kh' ? 'km' : 'en';
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [i18n, language]);

  useEffect(() => {
    window.localStorage.setItem(FLOWER_FALL_STORAGE_KEY, String(isFlowerFallEnabled));
  }, [isFlowerFallEnabled]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <FlowerSnow
        isRunning={isFlowerFallEnabled}
        onToggle={() => setIsFlowerFallEnabled((previous) => !previous)}
        showControl
      />
      <ScrollToTopButton />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#020b27_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-size:44px_44px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] dark:opacity-[0.08]" />
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/18" />
        <div className="absolute bottom-[-8rem] left-[-5rem] h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/20" />
      </div>

      <Navbar
        isDarkMode={isDarkMode}
        language={language}
        onLanguageChange={setLanguage}
        onToggleDarkMode={() => setIsDarkMode((previous) => !previous)}
      />

      <main className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}

export default App;
