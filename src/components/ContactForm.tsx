import { FormEvent, useState } from 'react';
import { Check, Copy, Instagram, ArrowUpRight } from 'lucide-react';
import { BRAND, PROGRAMMES } from '../data/scribblesData';

interface FormState {
  parentName: string;
  email: string;
  programme: string;
  format: 'Online Learning' | 'Offline Learning (Lucknow)' | 'Not sure yet';
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    parentName: '',
    email: '',
    programme: 'Phonics',
    format: 'Online Learning',
    message: '',
  });
  const [error, setError] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = form.parentName.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName) {
      setError('Please enter your name so we know how to address you.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    const formatted = [
      `Hello Scribbles team!`,
      `Parent/Guardian Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Preferred Programme: ${form.programme}`,
      `Preferred Format: ${form.format}`,
      form.message.trim() ? `Message: ${form.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    setSubmittedMessage(formatted);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 sm:p-10 space-y-6">
      <div className="space-y-2">
        <p className="font-hand text-2xl text-[#466B56]">Admissions Enquiry</p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
          Prepare your message for Instagram DM
        </h2>
        <p className="text-sm sm:text-base text-[#4B5D55]">
          Fill in your details below to format a ready-to-send enquiry message for{' '}
          <span className="font-semibold text-[#26352F]">{BRAND.instagramHandle}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="parentName" className="block text-sm font-semibold text-[#26352F]">
              Parent / Guardian Name
            </label>
            <input
              id="parentName"
              type="text"
              required
              value={form.parentName}
              onChange={(e) => setForm({ ...form, parentName: e.target.value })}
              placeholder="Your full name"
              className="w-full rounded-xl border border-[#26352F]/20 bg-white/80 px-4 py-3 text-sm text-[#26352F] placeholder:text-[#4B5D55]/60"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-[#26352F]">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-[#26352F]/20 bg-white/80 px-4 py-3 text-sm text-[#26352F] placeholder:text-[#4B5D55]/60"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="programme" className="block text-sm font-semibold text-[#26352F]">
              Preferred Programme
            </label>
            <select
              id="programme"
              value={form.programme}
              onChange={(e) => setForm({ ...form, programme: e.target.value })}
              className="w-full rounded-xl border border-[#26352F]/20 bg-white/80 px-4 py-3 text-sm text-[#26352F]"
            >
              {PROGRAMMES.map((p) => (
                <option key={p.id} value={p.title}>
                  {p.title} ({p.format})
                </option>
              ))}
              <option value="Reading Detective Practice Sheet">
                Reading Detective Practice Sheet (Ages 4–7)
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="format" className="block text-sm font-semibold text-[#26352F]">
              Preferred Learning Format
            </label>
            <select
              id="format"
              value={form.format}
              onChange={(e) =>
                setForm({
                  ...form,
                  format: e.target.value as FormState['format'],
                })
              }
              className="w-full rounded-xl border border-[#26352F]/20 bg-white/80 px-4 py-3 text-sm text-[#26352F]"
            >
              <option value="Online Learning">Online Learning</option>
              <option value="Offline Learning (Lucknow)">Offline Learning (Lucknow)</option>
              <option value="Not sure yet">Not sure yet — looking for guidance</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-sm font-semibold text-[#26352F]">
            Optional Message
          </label>
          <textarea
            id="message"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Share anything you would like Scribbles to know about your child’s learning journey..."
            className="w-full rounded-xl border border-[#26352F]/20 bg-white/80 px-4 py-3 text-sm text-[#26352F] placeholder:text-[#4B5D55]/60"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-semibold text-[#9A3412]">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[#466B56] px-7 py-3.5 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors cursor-pointer"
        >
          Format Enquiry for Instagram DM
        </button>
      </form>

      {submittedMessage && (
        <div className="rounded-2xl border border-[#466B56]/30 bg-[#DDE9D9]/55 p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-display text-lg font-semibold text-[#26352F]">
              Your enquiry message is ready
            </h3>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#26352F]/20 bg-[#FFF8ED] px-3.5 py-1.5 text-xs font-bold text-[#26352F] hover:bg-[#F6ECD9] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#466B56]" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>

          <pre className="whitespace-pre-wrap rounded-xl bg-[#FFF8ED] p-4 font-sans text-sm leading-relaxed text-[#26352F] border border-[#26352F]/10">
            {submittedMessage}
          </pre>

          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#26352F] px-6 py-3 text-sm font-semibold text-[#FFF8ED] hover:bg-[#466B56] transition-colors"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            <span>Open {BRAND.instagramHandle} on Instagram to Send DM</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
