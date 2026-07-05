/**
 * TermsOfService
 * --------------
 * Standard terms of service page. Covers acceptable use, disclaimer
 * of financial advice, limitation of liability, and governing terms.
 */

import PageShell from '../components/PageShell';
import { useSEO } from '../hooks/useSEO';

const LAST_UPDATED = 'July 2026';

export default function TermsOfService() {
  useSEO({
    title: 'Terms of Service | Daily Rate Pro',
  });
  return (
    <PageShell
      title="Terms of Service"
      subtitle={`Last updated: ${LAST_UPDATED}`}
    >
      <div className="space-y-8 text-navy-200">
        <section>
          <h2 className="font-display text-xl font-bold text-white">
            1. Acceptance of Terms
          </h2>
          <p className="mt-3 leading-relaxed">
            By accessing or using Daily Rate Pro, you agree to be bound by these
            Terms of Service. If you do not agree with any part of these terms,
            please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            2. Use of Our Services
          </h2>
          <p className="mt-3 leading-relaxed">
            You may use our calculators for personal, non-commercial purposes.
            You agree not to misuse the site, attempt to disrupt its operation,
            or use automated tools to access it in a way that sends more
            requests than a human reasonably could.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            3. Disclaimer of Financial Advice
          </h2>
          <p className="mt-3 leading-relaxed">
            All calculators and content on Daily Rate Pro are provided for
            informational and educational purposes only. They do not constitute
            financial, investment, legal, or tax advice. You should consult a
            qualified professional before making any financial decisions based
            on results from this site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            4. Accuracy of Information
          </h2>
          <p className="mt-3 leading-relaxed">
            We strive to keep our calculators accurate, but we make no
            warranties regarding the completeness, reliability, or accuracy of
            any results. Any reliance on such information is strictly at your
            own risk.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            5. Intellectual Property
          </h2>
          <p className="mt-3 leading-relaxed">
            The design, text, and code of this website are owned by Daily Rate Pro
            and protected by applicable intellectual property laws. You may not
            reproduce or redistribute our content without permission.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            6. Third-Party Advertising
          </h2>
          <p className="mt-3 leading-relaxed">
            This site may display third-party advertisements. We are not
            responsible for the content of these ads or the products and
            services they promote. Interactions with advertisers are solely
            between you and the advertiser.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            7. Limitation of Liability
          </h2>
          <p className="mt-3 leading-relaxed">
            To the fullest extent permitted by law, Daily Rate Pro shall not be
            liable for any direct, indirect, incidental, or consequential
            damages arising from your use of, or inability to use, this
            website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            8. Changes to These Terms
          </h2>
          <p className="mt-3 leading-relaxed">
            We reserve the right to modify these Terms at any time. Continued
            use of the site after changes constitutes acceptance of the updated
            Terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            9. Contact
          </h2>
          <p className="mt-3 leading-relaxed">
            Questions about these Terms? Please reach out via our{' '}
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
