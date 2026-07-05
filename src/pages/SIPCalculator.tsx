/**
 * SIPCalculator
 * -------------
 * SIP (Systematic Investment Plan) calculator using the future value
 * formula for a series of regular monthly investments:
 *
 *   FV = P × [((1 + r)^n − 1) / r] × (1 + r)
 *
 * where:
 *   P = monthly investment amount
 *   r = monthly rate of return (annual rate / 12 / 100)
 *   n = total number of monthly installments (years × 12)
 *
 * Total Invested = P × n
 * Estimated Returns = FV − Total Invested
 */

import { useMemo, useState } from 'react';
import { TrendingUp, Wallet, Coins, Calendar, RotateCcw, Percent } from 'lucide-react';
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

export default function SIPCalculator() {
  useSEO({
    title: 'SIP Calculator | Systematic Investment Plan Returns Calculator',
    description: 'Calculate your EMI, manage loans, and convert currencies instantly with our easy-to-use financial tools. Get accurate, real-time results for personal finance, mortgage planning, and global exchange rates. Trusted by users worldwide and in Pakistan.',
    keywords: 'SIP calculator, investment planner, mutual fund calculator, systematic investment plan, financial planner, compound interest, monthly investment, free online finance tools, PK finance',
  });
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    if (monthlyRate === 0) {
      return {
        futureValue: monthly * months,
        totalInvested: monthly * months,
        estimatedReturns: 0,
      };
    }

    const fv = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvested = monthly * months;
    const estimatedReturns = fv - totalInvested;

    return { futureValue: fv, totalInvested, estimatedReturns };
  }, [monthly, rate, years]);

  const reset = () => {
    setMonthly(5000);
    setRate(12);
    setYears(10);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-glass">
          <TrendingUp className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white">
          SIP Calculator
        </h1>
        <p className="mt-2 text-navy-200 max-w-xl mx-auto">
          Plan your systematic investment plan and see how your monthly
          contributions grow over time.
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
            label="Monthly Investment"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={1000000}
            step={500}
            formatValue={formatCurrency}
            icon={<Wallet className="h-4 w-4 text-gold-400" />}
          />

          <Slider
            label="Expected Return Rate (annual %)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.5}
            formatValue={(v) => `${v.toFixed(1)}%`}
            icon={<TrendingUp className="h-4 w-4 text-gold-400" />}
          />

          <Slider
            label="Investment Period (years)"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            formatValue={(v) => `${v} yr`}
            icon={<Calendar className="h-4 w-4 text-gold-400" />}
          />

          <button onClick={reset} className="btn-secondary text-sm">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Results sidebar */}
        <aside className="space-y-4">
          <ResultCard
            label="Future Value"
            value={formatCurrency(results.futureValue)}
            icon={TrendingUp}
            accent="text-gold-400"
          />
          <ResultCard
            label="Total Invested"
            value={formatCurrency(results.totalInvested)}
            icon={Wallet}
          />
          <ResultCard
            label="Estimated Returns"
            value={formatCurrency(results.estimatedReturns)}
            icon={Coins}
          />

          {/* AdSense Sidebar */}
          <AdSlot slotId="AdSense_Sidebar" label="Sponsored" className="h-48" />
        </aside>
      </div>

      {/* AdSense Middle */}
      <div className="mt-8">
        <AdSlot slotId="AdSense_Middle" className="h-28" />
      </div>

      {/* What is SIP Calculator */}
      <ToolDescription
        title="What is a SIP Calculator?"
        description="A SIP (Systematic Investment Plan) calculator is a free online financial tool that helps you estimate the future value of your regular monthly investments. By entering your monthly investment amount, the expected annual return rate, and the investment duration, the calculator uses the future value formula for a series of regular investments to show you how much your total investment will be worth at the end of the period. It clearly separates your total invested capital from the estimated returns, so you can see exactly how much growth your investment generates through the power of compounding. SIPs are one of the most disciplined and effective ways to build wealth over time, as they invest a fixed amount at regular intervals regardless of market conditions, benefiting from rupee or dollar cost averaging. This calculator makes it easy to visualize how small, regular investments can grow into substantial wealth and helps you set realistic financial goals for retirement, education, or major purchases. It is completely free, requires no registration, and works on all devices."
      />

      <HowToUse
        steps={[
          { icon: Wallet, title: 'Set Monthly Investment', description: 'Enter the amount you plan to invest every month in your SIP.' },
          { icon: Percent, title: 'Enter Expected Returns', description: 'Set the annual return rate you expect (e.g., 12% for equity mutual funds).' },
          { icon: Calendar, title: 'Choose Investment Period', description: 'Select how many years you plan to continue the SIP.' },
          { icon: TrendingUp, title: 'See Your Wealth Growth', description: 'View the total invested amount, estimated returns, and final maturity value instantly.' },
        ]}
        seoTitle="SIP Calculator — Grow Your Wealth with Systematic Investment Plans"
        seoParagraphs={[
          'A Systematic Investment Plan (SIP) is one of the most disciplined and effective ways to build wealth over time. Our SIP Calculator helps you estimate the future value of your monthly mutual fund investments, taking into account your investment amount, expected rate of return, and investment duration. This tool makes it easy to visualize how small, regular investments can grow into substantial wealth through the power of compounding.',
          'SIPs work by investing a fixed amount at regular intervals, regardless of market conditions. This approach, known as rupee cost averaging, helps reduce the impact of market volatility over time. When markets are low, you buy more units; when markets are high, you buy fewer units. Over the long term, this strategy tends to smooth out returns and reduce investment risk.',
          'Use this calculator to experiment with different investment amounts and time horizons. You will discover that increasing your monthly investment by even a small amount, or extending your investment period by a few years, can dramatically increase your final corpus. This insight motivates consistent investing and helps you set realistic financial goals for retirement, education, or major purchases.',
        ]}
      />

      {/* Educational content */}
      <ToolContent
        paragraphs={[
          'A Systematic Investment Plan (SIP) is one of the most disciplined and effective ways to build wealth over time. By investing a fixed amount at regular intervals — typically monthly — you benefit from the power of compounding and rupee (or dollar) cost averaging, without needing to time the market. The SIP Calculator helps you visualize the future value of your investments based on three simple inputs: your monthly contribution, the expected annual return rate, and the investment duration. This allows you to set realistic financial goals and track your progress toward them.',
          'The calculator uses the future value formula for a series of regular investments, which accounts for the fact that each contribution compounds for a different length of time. Your first installment grows for the entire period, while your last installment only benefits from one month of returns. This is why the results often surprise new investors — even a modest monthly investment, sustained over 15 or 20 years, can grow into a substantial corpus thanks to the compounding effect. The tool clearly separates your total invested capital from the estimated returns, so you can see exactly how much growth your investment generates.',
          'One of the most powerful ways to use this calculator is to experiment with different scenarios. Try increasing your monthly investment by just 10% or extending your investment period by a few years, and observe the dramatic difference in the final amount. This demonstrates why financial advisors consistently recommend starting early and increasing contributions gradually. Even a five-year head start can add hundreds of thousands of dollars to your final corpus, because the earliest contributions have the longest time to compound. The calculator makes this abstract concept tangible and actionable.',
          'It is important to understand that the expected return rate you enter is an assumption, not a guarantee. Real-world returns fluctuate year to year, especially in equity-linked investments. The calculator provides a projection based on a constant rate to help you plan, but actual results will vary. Use conservative return estimates (8–12% for equity, 6–8% for debt) to set a baseline, and consider consulting a qualified financial advisor for personalized guidance. This tool is designed to educate and inform, helping you make better investment decisions with confidence and clarity.',
        ]}
      />

      {/* FAQ */}
      <FAQ
        items={[
          { question: 'What is a SIP and how does it work?', answer: 'A Systematic Investment Plan (SIP) is a method of investing a fixed amount at regular intervals (typically monthly) in mutual funds or other investment products. It helps build wealth through disciplined investing and the power of compounding, without needing to time the market.' },
          { question: 'How is SIP returns calculated?', answer: 'SIP returns are calculated using the future value formula for a series of regular investments: FV = P × [((1 + r)^n − 1) / r] × (1 + r), where P is the monthly investment, r is the monthly rate of return, and n is the total number of monthly installments.' },
          { question: 'What is a good expected return rate for SIP?', answer: 'For equity mutual funds, a conservative estimate is 10–12% annually. For debt funds, use 6–8%. These are estimates, not guarantees. Actual returns depend on market performance and fund selection.' },
          { question: 'Is the SIP calculator free to use?', answer: 'Yes, our SIP calculator is 100% free, requires no sign-up, and works on all devices including mobile phones, tablets, and desktop computers.' },
          { question: 'Can I change the monthly investment amount over time?', answer: 'This calculator assumes a fixed monthly amount. For step-up SIPs (where you increase the amount annually), you can run multiple calculations with different amounts to estimate the combined result.' },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          { label: 'EMI Calculator', href: '#/emi', icon: Wallet },
          { label: 'Compound Interest', href: '#/compound-interest', icon: Percent },
          { label: 'Currency Converter', href: '#/currency-converter', icon: Coins },
          { label: 'Discount Calculator', href: '#/discount', icon: TrendingUp },
        ]}
      />
    </div>
  );
}
