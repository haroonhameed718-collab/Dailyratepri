/**
 * CompoundInterestCalculator
 * --------------------------
 * Compound interest calculator using the standard formula:
 *
 *   A = P × (1 + r/n)^(n × t)
 *
 * where:
 *   A = final amount (principal + interest)
 *   P = principal amount
 *   r = annual interest rate (decimal, e.g. 0.05 for 5%)
 *   n = compounding frequency per year
 *   t = time in years
 *
 * Compound Interest = A − P
 */

import { useMemo, useState } from 'react';
import { Percent, Wallet, Coins, Calendar, RotateCcw, RefreshCw } from 'lucide-react';
import Slider from '../components/Slider';
import ResultCard from '../components/ResultCard';
import ToolContent from '../components/ToolContent';
import HowToUse from '../components/HowToUse';
import ToolDescription from '../components/ToolDescription';
import FAQ from '../components/FAQ';
import RelatedTools from '../components/RelatedTools';
import AdSlot from '../components/AdSlot';
import { useSEO } from '../hooks/useSEO';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(v);

const COMPOUNDING_OPTIONS = [
  { label: 'Annually (1×/yr)', value: 1 },
  { label: 'Semi-Annually (2×/yr)', value: 2 },
  { label: 'Quarterly (4×/yr)', value: 4 },
  { label: 'Monthly (12×/yr)', value: 12 },
  { label: 'Daily (365×/yr)', value: 365 },
];

export default function CompoundInterestCalculator() {
  useSEO({
    title: 'Compound Interest Calculator | Free Investment Growth Calculator',
    description: 'Calculate your EMI, manage loans, and convert currencies instantly with our easy-to-use financial tools. Get accurate, real-time results for personal finance, mortgage planning, and global exchange rates. Trusted by users worldwide and in Pakistan.',
    keywords: 'compound interest calculator, investment calculator, savings growth calculator, financial planner, free online finance tools, PK finance, how to calculate compound interest',
  });
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState(12);

  const results = useMemo(() => {
    const r = rate / 100;
    const amount = principal * Math.pow(1 + r / freq, freq * years);
    const interest = amount - principal;
    return { amount, interest };
  }, [principal, rate, years, freq]);

  const reset = () => {
    setPrincipal(100000);
    setRate(8);
    setYears(10);
    setFreq(12);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-glass">
          <Percent className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white">
          Compound Interest Calculator
        </h1>
        <p className="mt-2 text-navy-200 max-w-xl mx-auto">
          Visualize the power of compounding with flexible principal, rate, and
          time inputs.
        </p>
      </div>

      {/* AdSense Top */}
      <div className="mt-8">
        <AdSlot slotId="AdSense_Top" className="h-24" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Calculator inputs */}
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
          <Slider
            label="Principal Amount"
            value={principal}
            onChange={setPrincipal}
            min={1000}
            max={10000000}
            step={1000}
            formatValue={formatCurrency}
            icon={<Wallet className="h-4 w-4 text-gold-400" />}
          />

          <Slider
            label="Interest Rate (annual %)"
            value={rate}
            onChange={setRate}
            min={0.1}
            max={30}
            step={0.1}
            formatValue={(v) => `${v.toFixed(1)}%`}
            icon={<Percent className="h-4 w-4 text-gold-400" />}
          />

          <Slider
            label="Time Period (years)"
            value={years}
            onChange={setYears}
            min={1}
            max={50}
            step={1}
            formatValue={(v) => `${v} yr`}
            icon={<Calendar className="h-4 w-4 text-gold-400" />}
          />

          {/* Compounding frequency selector */}
          <div>
            <label className="text-sm font-semibold text-white">Compounding Frequency</label>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COMPOUNDING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFreq(opt.value)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                    freq === opt.value
                      ? 'border-gold-400/50 bg-white/10 text-white shadow-glass-sm'
                      : 'border-white/10 bg-white/5 text-navy-100 hover:border-white/20'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={reset} className="btn-secondary text-sm">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Results sidebar */}
        <aside className="space-y-4">
          <ResultCard
            label="Total Amount"
            value={formatCurrency(results.amount)}
            icon={Coins}
            accent="text-gold-400"
          />
          <ResultCard
            label="Compound Interest"
            value={formatCurrency(results.interest)}
            icon={Percent}
          />

          {/* AdSense Sidebar */}
          <AdSlot slotId="AdSense_Sidebar" label="Sponsored" className="h-48" />
        </aside>
      </div>

      {/* AdSense Middle */}
      <div className="mt-8">
        <AdSlot slotId="AdSense_Middle" className="h-28" />
      </div>

      {/* What is Compound Interest Calculator */}
      <ToolDescription
        title="What is a Compound Interest Calculator?"
        description="A compound interest calculator is a free online financial tool that shows you how your money grows when interest is reinvested over time. Unlike simple interest, which only earns returns on the original principal, compound interest earns returns on both the principal and the accumulated interest from previous periods, creating an exponential growth curve that accelerates dramatically over time. This calculator uses the standard compound interest formula — A = P(1 + r/n)^(nt) — where P is the principal, r is the annual interest rate, n is the compounding frequency, and t is the time in years. By adjusting these inputs, you can see exactly how much your investment will grow and how much of that growth comes from interest versus your original principal. The calculator also lets you compare different compounding frequencies — annually, semi-annually, quarterly, monthly, and daily — to see how more frequent compounding boosts your returns. This is essential for evaluating savings accounts, certificates of deposit, bonds, and other investment products. The tool is completely free, requires no registration, and works on all devices."
      />

      <HowToUse
        steps={[
          { icon: Wallet, title: 'Enter Principal Amount', description: 'Set the initial amount you want to invest or save.' },
          { icon: Percent, title: 'Set Interest Rate', description: 'Enter the annual interest rate offered by your bank or investment product.' },
          { icon: Calendar, title: 'Choose Time Period', description: 'Select how many years you plan to keep your money invested.' },
          { icon: RefreshCw, title: 'Pick Compounding Frequency', description: 'Choose how often interest is compounded — annually, monthly, or daily for maximum growth.' },
        ]}
        seoTitle="Compound Interest Calculator — See How Your Money Grows Over Time"
        seoParagraphs={[
          'Compound interest is one of the most powerful concepts in finance, often called the eighth wonder of the world. It is the mechanism by which your money earns returns not just on the original principal, but also on the accumulated interest from previous periods. This creates an exponential growth curve that accelerates dramatically over time. Our Compound Interest Calculator lets you harness this concept by inputting your principal amount, annual interest rate, investment duration, and compounding frequency.',
          'The compounding frequency you select has a meaningful impact on your final returns. Interest that compounds monthly grows faster than interest that compounds annually, because each month\'s earnings begin generating their own returns sooner. While the difference may seem small in the short term, over 20 or 30 years it can amount to a significant sum. This calculator lets you switch between annual, semi-annual, quarterly, monthly, and daily compounding to compare outcomes.',
          'Understanding compound interest is essential for evaluating savings accounts, certificates of deposit, bonds, and other investment products. Use this free calculator to experiment with different scenarios and see how even small changes in rate, time, or compounding frequency can dramatically affect your final balance. This knowledge empowers you to make smarter financial choices and take full advantage of the most powerful wealth-building tool available.',
        ]}
      />

      {/* Educational content */}
      <ToolContent
        paragraphs={[
          'Compound interest is often called the eighth wonder of the world, and for good reason. It is the mechanism by which your money earns returns not just on the original principal, but also on the accumulated interest from previous periods. This creates an exponential growth curve that accelerates dramatically over time. The Compound Interest Calculator lets you harness this concept by inputting your principal amount, annual interest rate, investment duration, and compounding frequency to see exactly how much your money can grow. The results clearly separate your original investment from the interest earned, making the power of compounding visible and tangible.',
          'The compounding frequency you select has a meaningful impact on your final returns. Interest that compounds monthly grows faster than interest that compounds annually, because each month\'s earnings begin generating their own returns sooner. While the difference may seem small in the short term, over 20 or 30 years it can amount to a significant sum. This calculator lets you switch between annual, semi-annual, quarterly, monthly, and daily compounding to compare the outcomes. Understanding this concept helps you evaluate different savings accounts, certificates of deposit, and investment products that advertise different compounding schedules.',
          'The most striking insight this tool reveals is the importance of time. Try running the same principal and rate over 10 years versus 30 years — the difference is not three times larger, but often six or seven times larger. This is because compounding is exponential, not linear. Every additional year of compounding builds on a larger base, so the later years contribute far more growth than the early years. This is why financial planners universally advise starting to save and invest as early as possible, even with small amounts. A person who invests $5,000 per year from age 25 to 35 and then stops will often end up with more money than someone who invests $5,000 per year from age 35 to 65.',
          'It is worth noting that this calculator assumes a constant interest rate throughout the entire period, which is useful for understanding the concept but rarely matches reality. In practice, investment returns fluctuate, savings account rates change, and inflation erodes purchasing power. Use this tool as a planning aid to understand the mechanics of compounding and to set savings goals, not as a guarantee of future returns. For real-world investment decisions, consider consulting a qualified financial advisor who can account for inflation, taxes, risk tolerance, and your specific financial situation. The calculator is an educational starting point that demystifies one of the most important concepts in personal finance.',
        ]}
      />

      {/* FAQ */}
      <FAQ
        items={[
          { question: 'What is compound interest?', answer: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This creates exponential growth, as your money earns returns on returns, not just on the original amount.' },
          { question: 'How is compound interest calculated?', answer: 'Compound interest is calculated using the formula A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate, n is the compounding frequency per year, and t is the time in years.' },
          { question: 'How does compounding frequency affect my returns?', answer: 'More frequent compounding (e.g., monthly vs. annually) results in higher returns because interest is reinvested sooner, starting to earn its own returns earlier. The difference grows over longer time periods.' },
          { question: 'Is the compound interest calculator free?', answer: 'Yes, our compound interest calculator is 100% free, requires no sign-up, and works on all devices including mobile phones, tablets, and desktop computers.' },
          { question: 'What compounding frequency should I choose?', answer: 'Match the compounding frequency to your actual investment product. Savings accounts typically compound daily or monthly, CDs may compound monthly or quarterly, and bonds often compound semi-annually or annually.' },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          { label: 'SIP Calculator', href: '#/sip', icon: Wallet },
          { label: 'EMI Calculator', href: '#/emi', icon: Percent },
          { label: 'Currency Converter', href: '#/currency-converter', icon: Coins },
          { label: 'Discount Calculator', href: '#/discount', icon: Calendar },
        ]}
      />
    </div>
  );
}
