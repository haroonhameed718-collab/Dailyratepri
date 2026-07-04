/**
 * Home
 * ----
 * Landing page for Daily Rate Pro. Features a premium hero section,
 * the main calculator tool cards, a 2x2 features grid, and reserved
 * AdSense ad slots (top, middle, sidebar) that do not disrupt the
 * user experience.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Calculator, TrendingUp, Percent, Coins, ArrowRight, CheckCircle2,
  Sparkles, Star, MessageSquare, Send, Tag, Zap, ShieldCheck, Smartphone,
} from 'lucide-react';
import AdSlot from '../components/AdSlot';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { supabase } from '../lib/supabase';
import { useSEO } from '../hooks/useSEO';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: typeof Calculator;
  accent: string;
}

const TOOLS: Tool[] = [
  {
    title: 'EMI Calculator',
    description:
      'Calculate your monthly loan installment, total interest, and repayment schedule for any loan amount.',
    href: '#/emi',
    icon: Calculator,
    accent: 'from-navy-600 to-navy-800',
  },
  {
    title: 'SIP Calculator',
    description:
      'Plan your systematic investment plan and see how your monthly contributions grow over time.',
    href: '#/sip',
    icon: TrendingUp,
    accent: 'from-gold-500 to-gold-700',
  },
  {
    title: 'Compound Interest',
    description:
      'Visualize the power of compounding with flexible principal, rate, and time inputs.',
    href: '#/compound-interest',
    icon: Percent,
    accent: 'from-navy-600 to-navy-800',
  },
  {
    title: 'Currency Converter',
    description:
      'Convert between major world currencies with up-to-date exchange rates instantly.',
    href: '#/currency-converter',
    icon: Coins,
    accent: 'from-gold-500 to-gold-700',
  },
  {
    title: 'Discount Calculator',
    description:
      'Calculate the final price after a discount and see exactly how much you save on any purchase.',
    href: '#/discount',
    icon: Tag,
    accent: 'from-navy-600 to-navy-800',
  },
];

const FEATURES = [
  { icon: Zap, title: '100% Free', description: 'All calculators are completely free to use with no hidden charges.' },
  { icon: ShieldCheck, title: 'No Sign-Up', description: 'No registration or account needed. Just open and start calculating.' },
  { icon: CheckCircle2, title: 'Instant Results', description: 'Get accurate, real-time results the moment you adjust any input.' },
  { icon: Smartphone, title: 'Mobile-Friendly', description: 'Fully responsive design that works perfectly on any device.' },
];

export default function Home() {
  useSEO({
    title: 'Daily Rate Pro | Free Financial Calculators & Live Currency Converter',
  });
  const { settings } = useSiteSettings();

  return (
    <div className="animate-fade-in">
      {/* ===== Hero ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Trusted financial calculators & live rates
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Smart financial decisions,
            <span className="block text-shimmer">made simple.</span>
          </h1>
          <p className="mt-6 text-lg text-navy-200 max-w-2xl mx-auto">
            Plan your loans, investments, and currency exchanges with {settings.site_name}'s
            suite of free, accurate, and easy-to-use financial calculators.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#tools" className="btn-gold">
              Explore Calculators
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#/emi"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-6 py-3 font-semibold text-navy-50 border border-gold-400/30 shadow-glass-sm transition-all duration-300 hover:bg-gold-400/10 hover:border-gold-400/50 hover:shadow-gold-glow hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-navy-900"
            >
              Try EMI Calculator
            </a>
          </div>
        </div>
      </section>

      {/* ===== Features — 2x2 Grid ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/20 hover:shadow-gold-glow"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-navy-200 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AdSense Top ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <AdSlot slotId="AdSense_Top" className="h-28" />
      </section>

      {/* ===== Tools grid + sidebar ===== */}
      <section
        id="tools"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white heading-accent inline-block">
              Our Calculators
            </h2>
            <p className="mt-4 text-navy-200">
              Choose a tool below to get started. Each calculator is designed to
              be fast, accurate, and easy to understand.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {TOOLS.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="group glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/20 hover:shadow-gold-glow"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.accent} text-white shadow-glass-sm transition-transform group-hover:scale-110 group-hover:shadow-gold-glow`}
                  >
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-200 leading-relaxed">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-400 group-hover:text-gold-300 transition-colors">
                    Open calculator
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>

            {/* AdSense Middle */}
            <div className="mt-10">
              <AdSlot slotId="AdSense_Middle" className="h-32" />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-white">
                Why {settings.site_name}?
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Accurate, time-tested formulas',
                  'Clean, distraction-free interface',
                  'Works on any device',
                  'No data stored or shared',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-navy-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* AdSense Sidebar */}
            <AdSlot
              slotId="AdSense_Sidebar"
              label="Sponsored"
              className="h-64"
            />
          </aside>
        </div>
      </section>

      {/* ===== Testimonials / User Reviews ===== */}
      <TestimonialsSection />
    </div>
  );
}

/* ============================================================
   Testimonials Section — User Reviews with Star Ratings
   ============================================================ */

function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_reviews')
      .select('id, name, rating, comment, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(12);

    if (!error && data) {
      setReviews(data as Review[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);
    setError('');

    const { error: insertError } = await supabase
      .from('user_reviews')
      .insert({
        name: name.trim(),
        rating,
        comment: comment.trim(),
      });

    if (insertError) {
      setError('Failed to submit review. Please try again.');
    } else {
      setSuccess(true);
      setName('');
      setComment('');
      setRating(5);
      fetchReviews();
      setTimeout(() => setSuccess(false), 4000);
    }
    setSubmitting(false);
  };

  const displayRating = hoverRating || rating;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white heading-accent inline-block">
          What Our Users Say
        </h2>
        <p className="mt-4 text-navy-200 max-w-2xl mx-auto">
          Real reviews from people who use our calculators to make smarter financial decisions.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Reviews list */}
        <div>
          {loading ? (
            <div className="glass rounded-2xl p-8 text-center text-navy-200">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <MessageSquare className="mx-auto h-10 w-10 text-navy-300/50" />
              <p className="mt-3 text-navy-200">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="glass rounded-2xl p-5 transition-all duration-300 hover:border-gold-400/20 hover:shadow-gold-glow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-800 text-sm font-bold text-gold-400">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{review.name}</p>
                        <p className="text-xs text-navy-300/60">
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-gold-400 text-gold-400'
                              : 'text-navy-300/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-navy-200 leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review form */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-lg font-bold text-white">
            Leave a Review
          </h3>
          <p className="mt-1 text-sm text-navy-200">
            Share your experience with our calculators.
          </p>

          {success && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              Review submitted! Thank you.
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="review-name" className="block text-sm font-semibold text-white">
                Name
              </label>
              <input
                id="review-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={50}
                className="input-premium mt-1.5"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white">
                Rating
              </label>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                    aria-label={`${i + 1} star${i > 0 ? 's' : ''}`}
                  >
                    <Star
                      className={`h-7 w-7 ${
                        i < displayRating
                          ? 'fill-gold-400 text-gold-400'
                          : 'text-navy-300/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review-comment" className="block text-sm font-semibold text-white">
                Comment
              </label>
              <textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                maxLength={300}
                rows={3}
                className="input-premium mt-1.5"
                placeholder="Tell us about your experience..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
