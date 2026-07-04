/**
 * PrivacyPolicy
 * -------------
 * Standard privacy policy page. Describes what data is and is not
 * collected, how cookies/advertising work, and user rights.
 */

import PageShell from '../components/PageShell';
import { useSEO } from '../hooks/useSEO';

const LAST_UPDATED = 'July 2026';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | Daily Rate Pro',
  });
  return (
    <PageShell
      title="Privacy Policy"
      subtitle={`Last updated: ${LAST_UPDATED}`}
    >
      <div className="space-y-8 text-navy-200">
        <section>
          <h2 className="font-display text-xl font-bold text-white">
            1. Introduction
          </h2>
          <p className="mt-3 leading-relaxed">
            Daily Rate Pro (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we handle information when you use our website and financial
            calculators. By using our site, you agree to the practices described
            below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            2. Information We Collect
          </h2>
          <p className="mt-3 leading-relaxed">
            Our calculators run entirely in your browser. We do not require you
            to create an account, and we do not collect the values you enter
            into any calculator. We may collect anonymous, aggregated usage
            statistics (such as page views) to improve our service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            3. Cookies
          </h2>
          <p className="mt-3 leading-relaxed">
            We may use cookies and similar technologies to enhance your
            experience and to understand how the site is used. You can control
            cookies through your browser settings. Third-party advertising
            partners may also use cookies as described below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            4. Advertising &amp; Google AdSense
          </h2>
          <p className="mt-3 leading-relaxed">
            We may display advertisements served by Google AdSense. Third-party
            vendors, including Google, use cookies to serve ads based on your
            prior visits to this and other websites. Google&apos;s use of
            advertising cookies enables it and its partners to serve ads based
            on your visit to our site and/or other sites on the Internet.
          </p>
          <p className="mt-3 leading-relaxed">
            You may opt out of personalized advertising by visiting Google&apos;s
            Ads Settings. For more information about how Google uses data, visit
            Google&apos;s privacy &amp; terms page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            5. Third-Party Links
          </h2>
          <p className="mt-3 leading-relaxed">
            Our site may contain links to external websites. We are not
            responsible for the privacy practices or content of those sites. We
            encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            6. Data Security
          </h2>
          <p className="mt-3 leading-relaxed">
            We take reasonable measures to protect the information we hold.
            However, no method of transmission over the Internet is completely
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            7. Your Rights
          </h2>
          <p className="mt-3 leading-relaxed">
            You have the right to request access to, correction of, or deletion
            of any personal data we hold about you. Since we do not collect
            personal data through our calculators, such requests are generally
            not applicable, but you may contact us with any concerns.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            8. Changes to This Policy
          </h2>
          <p className="mt-3 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            9. Contact Us
          </h2>
          <p className="mt-3 leading-relaxed">
            If you have questions about this Privacy Policy, please visit our{' '}
            <a href="#/contact-us" className="font-semibold text-gold-400 underline">
              Contact Us
            </a>{' '}
            page.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
