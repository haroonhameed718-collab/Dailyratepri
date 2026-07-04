/**
 * ContactUs
 * ----------
 * Contact page with a simple, accessible form and direct contact
 * information. Form submission is handled client-side (no backend)
 * since no data persistence is required for this static page.
 */

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import PageShell from '../components/PageShell';
import { useSEO } from '../hooks/useSEO';

export default function ContactUs() {
  useSEO({
    title: 'Contact Us | Daily Rate Pro',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageShell
      title="Contact Us"
      subtitle="Have a question, suggestion, or feedback? We'd love to hear from you."
    >
      <div className="grid gap-10 md:grid-cols-[1fr_280px]">
        {/* Form */}
        <div>
          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-gold-400/20 p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-gold-400" />
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                Message Sent
              </h3>
              <p className="mt-2 text-sm text-navy-200">
                Thank you for reaching out. We&apos;ll get back to you as soon as
                possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary mt-6"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-premium mt-1.5"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-premium mt-1.5"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="input-premium mt-1.5"
                  placeholder="How can we help?"
                />
              </div>

              <button type="submit" className="btn-gold w-full sm:w-auto">
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact info sidebar */}
        <aside className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gold-400" />
              <h3 className="font-display text-base font-bold text-white">Email</h3>
            </div>
            <p className="mt-2 text-sm text-navy-200">support@dailyratepro.example</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gold-400" />
              <h3 className="font-display text-base font-bold text-white">Response Time</h3>
            </div>
            <p className="mt-2 text-sm text-navy-200">
              We typically respond within 1–2 business days.
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
