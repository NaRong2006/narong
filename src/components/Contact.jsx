import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SocialIcons from './SocialIcons';

const initialFormState = {
  name: '',
  email: '',
  message: '',
};

function Contact() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState(initialFormState);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
    const hasPlaceholderValue = [serviceId, templateId, publicKey].some(
      (value) => value?.includes('your_'),
    );

    if (!serviceId || !templateId || !publicKey || hasPlaceholderValue) {
      setStatus({
        type: 'error',
        message: t('contact.form.missingConfig'),
      });
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formState.name,
          user_name: formState.name,
          from_name: formState.name,
          email: formState.email,
          user_email: formState.email,
          from_email: formState.email,
          reply_to: formState.email,
          message: formState.message,
          to_name: 'Boeun Narong',
        },
        {
          publicKey,
        },
      );

      setStatus({
        type: 'success',
        message: t('contact.form.success'),
      });
      setFormState(initialFormState);
    } catch (error) {
      const reason = [error?.status, error?.text].filter(Boolean).join(' - ');
      console.error('EmailJS send failed:', error);
      setStatus({
        type: 'error',
        message: reason ? `${t('contact.form.error')} (${reason})` : t('contact.form.error'),
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="section-wrap"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <h2 className="section-title">{t('contact.title')}</h2>
      <p className="section-subtitle">{t('contact.subtitle')}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/70 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
        >
          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                {t('contact.form.name')}
              </span>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                {t('contact.form.email')}
              </span>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                {t('contact.form.message')}
              </span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900/40"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="mt-6 inline-flex items-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSending ? t('contact.form.sending') : t('contact.form.send')}
          </button>

          {status.type !== 'idle' && (
            <p
              className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
                  : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-300'
              }`}
            >
              {status.message}
            </p>
          )}
        </motion.form>

        <motion.aside
          className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/70 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{t('contact.socialTitle')}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t('contact.socialSubtitle')}
          </p>
          <SocialIcons className="mt-6" withLabels />
        </motion.aside>
      </div>
    </motion.section>
  );
}

export default Contact;
