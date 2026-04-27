import { useTranslation } from 'react-i18next';
import SocialIcons from './SocialIcons';

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white/90 py-8 dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-4 sm:px-6 md:flex-row lg:px-8">
        <p className="text-sm text-slate-600 dark:text-slate-400">{t('footer.copyright', { year })}</p>
        <SocialIcons />
      </div>
    </footer>
  );
}

export default Footer;
