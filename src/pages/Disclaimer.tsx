/**
 * Disclaimer
 * -----------
 * Professional disclaimer page covering the limitations of the
 * financial calculators, accuracy of results, and no-liability terms.
 */

import PageShell from '../components/PageShell';
import { useSEO } from '../hooks/useSEO';

const LAST_UPDATED = 'July 2026';

export default function Disclaimer() {
  useSEO({
    title: 'Disclaimer | Daily Rate Pro',
  });
  return (
    <PageShell
      title="Disclaimer"
      subtitle={`Last updated: ${LAST_UPDATED}`}
    >
      <div className="space-y-8 text-navy-200">
        <section>
          <h2 className="font-display text-xl font-bold text-white">
            1. General Information Only
          </h2>
          <p className="mt-3 leading-relaxed">
            The information and tools provided on Daily Rate Pro are for general
            informational and educational purposes only. All calculators,
            results, and content are intended to help you understand financial
            concepts but should not be relied upon as the sole basis for making
            financial decisions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            2. Not Financial Advice
          </h2>
          <p className="mt-3 leading-relaxed">
            Nothing on this website constitutes financial, investment, legal, tax,
            or professional advice. You should consult a qualified financial
            advisor or other appropriate professional before making any decisions
            based on the results from our calculators. Daily Rate Pro is not
            liable for any losses or damages resulting from the use of this
            information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            3. Accuracy of Calculations
          </h2>
          <p className="mt-3 leading-relaxed">
            While we strive to keep our calculators accurate and up to date, we
            make no warranties or representations regarding the accuracy,
            completeness, or reliability of any results. Financial calculations
            may involve rounding, assumptions, and simplifications that affect the
            output. Always verify results with your financial institution or
            advisor.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            4. Currency Exchange Rates
          </h2>
          <p className="mt-3 leading-relaxed">
            Currency conversion rates displayed on this site are fetched from
            third-party data providers and may not reflect real-time rates
            offered by banks or financial institutions. Exchange rates fluctuate
            frequently, and we do not guarantee the accuracy or timeliness of any
            rate shown. Always confirm rates with your bank or currency provider
            before making transactions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            5. Third-Party Advertising
          </h2>
          <p className="mt-3 leading-relaxed">
            This website may display advertisements from third-party networks
            such as Google AdSense. We do not endorse and are not responsible
            for the content, products, or services advertised. Any interactions
            with advertisers are solely between you and the advertiser.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            6. External Links
          </h2>
          <p className="mt-3 leading-relaxed">
            Our website may contain links to external websites that are not
            operated by us. We have no control over and assume no responsibility
            for the content, privacy policies, or practices of any third-party
            sites or services.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            7. Limitation of Liability
          </h2>
          <p className="mt-3 leading-relaxed">
            To the fullest extent permitted by applicable law, Daily Rate Pro and
            its operators shall not be liable for any direct, indirect,
            incidental, consequential, or punitive damages arising from your
            use of, or inability to use, this website or its tools.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            8. Changes to This Disclaimer
          </h2>
          <p className="mt-3 leading-relaxed">
            We reserve the right to update or modify this Disclaimer at any time.
            Changes will be posted on this page with an updated revision date.
            Your continued use of the site constitutes acceptance of the updated
            Disclaimer.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-white">
            9. Contact
          </h2>
          <p className="mt-3 leading-relaxed">
            If you have questions about this Disclaimer, please visit our{' '}
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
