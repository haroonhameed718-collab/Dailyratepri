/**
 * AboutUs
 * -------
 * Company information page describing the mission, values, and purpose
 * of Daily Rate Pro. Uses the PageShell layout for consistency with
 * other static pages.
 */

import { Target, Eye, Heart, ShieldCheck, Zap, Globe } from 'lucide-react';
import PageShell from '../components/PageShell';
import { useSEO } from '../hooks/useSEO';

export default function AboutUs() {
  useSEO({
    title: 'About Us | Daily Rate Pro',
  });

  return (
    <PageShell title="About Us" subtitle="Learn about our mission to make financial tools accessible to everyone.">
      <div className="space-y-8">
        {/* Mission */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="mt-4 text-navy-200 leading-relaxed">
            At Daily Rate Pro, our mission is to empower individuals and businesses
            with free, accurate, and easy-to-use financial calculators. We believe
            that everyone deserves access to the tools they need to make informed
            financial decisions, whether they are planning a loan, investing for the
            future, or converting currencies for an international transaction. By
            removing barriers like paywalls, sign-ups, and complex interfaces, we
            strive to make financial literacy accessible to all, regardless of
            background or location.
          </p>
        </section>

        {/* Vision */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400">
              <Eye className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-white">Our Vision</h2>
          </div>
          <p className="mt-4 text-navy-200 leading-relaxed">
            We envision a world where financial planning is not reserved for
            experts with expensive software, but is something anyone can do
            confidently from their phone, tablet, or computer. We are
            continuously expanding our suite of tools to cover more financial
            scenarios, from loans and investments to currency exchange and
            shopping discounts, all designed with the same commitment to
            simplicity, accuracy, and accessibility.
          </p>
        </section>

        {/* Values */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400">
              <Heart className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-white">Our Values</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="glass rounded-2xl p-5">
              <ShieldCheck className="h-6 w-6 text-gold-400" />
              <h3 className="mt-3 font-semibold text-white">Accuracy</h3>
              <p className="mt-2 text-sm text-navy-200 leading-relaxed">
                We use time-tested financial formulas and reliable data sources to
                ensure our calculators deliver accurate results every time.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <Zap className="h-6 w-6 text-gold-400" />
              <h3 className="mt-3 font-semibold text-white">Simplicity</h3>
              <p className="mt-2 text-sm text-navy-200 leading-relaxed">
                Our tools are designed to be intuitive and distraction-free, so
                anyone can use them without prior financial knowledge.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <Globe className="h-6 w-6 text-gold-400" />
              <h3 className="mt-3 font-semibold text-white">Accessibility</h3>
              <p className="mt-2 text-sm text-navy-200 leading-relaxed">
                All our calculators are 100% free, require no sign-up, and work
                seamlessly on any device, anywhere in the world.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section>
          <h2 className="font-display text-xl font-bold text-white">Our Story</h2>
          <p className="mt-4 text-navy-200 leading-relaxed">
            Daily Rate Pro was created to bridge the gap between complex financial
            concepts and everyday users. We noticed that many online calculators
            were either hidden behind paywalls, cluttered with ads, or difficult
            to use on mobile devices. We set out to build a better alternative — a
            clean, fast, and reliable platform that anyone can use with confidence.
            Today, our tools are used by people worldwide, from students planning
            their first investment to business owners managing international
            transactions. We are proud to serve our growing community and remain
            committed to continuous improvement.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
