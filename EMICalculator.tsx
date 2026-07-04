/**
 * EMICalculator
 * ------------
 * EMI (Equated Monthly Installment) calculator using the standard
 * loan amortization formula:
 *
 *   EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
 *
 * where:
 *   P = principal loan amount
 *   r = monthly interest rate (annual rate / 12 / 100)
 *   n = total number of monthly installments (tenure in years × 12)
 *
 * Total Interest = EMI × n − P
 * Total Payment  = EMI × n
 */

import { useMemo, useState } from 'react';
import { Calculator, Wallet, TrendingUp, Receipt, RotateCcw, Banknote, Calendar, Percent } from 'lucide-react';
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

export default function EMICalculator() {
  useSEO({
    title: 'EMI Calculator Pakistan | Free Monthly Loan Payment Calculator',
    description: 'Calculate your EMI, manage loans, and convert currencies instantly with our easy-to-use financial tools. Get accurate, real-time results for personal finance, mortgage planning, and global exchange rates. Trusted by users worldwide and in Pakistan.',
    keywords: 'EMI calculator, loan calculator, monthly installment, personal loan, mortgage calculator, simple EMI tool, easy loan calculator, how to calculate EMI, debt calculator, free online finance tools, PK finance',
  });
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const results = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;

    if (monthlyRate === 0) {
      const emi = principal / months;
      return {
        emi,
        totalInterest: 0,
        totalPayment: principal,
      };
    }

    const factor = Math.pow(1 + monthlyRate, months);
    const emi = (principal * monthlyRate * factor) / (factor - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return { emi, totalInterest, totalPayment };
  }, [principal, rate, tenure]);

  const reset = () => {
    setPrincipal(500000);
    setRate(8.5);
    setTenure(20);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-glass">
          <Calculator className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white">
          EMI Calculator
        </h1>
        <p className="mt-2 text-navy-200 max-w-xl mx-auto">
          Calculate your monthly loan installment, total interest, and overall
          repayment amount.
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
            label="Loan Amount"
            value={principal}
            onChange={setPrincipal}
            min={10000}
            max={10000000}
            step={10000}
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
            icon={<TrendingUp className="h-4 w-4 text-gold-400" />}
          />

          <Slider
            label="Loan Tenure (years)"
            value={tenure}
            onChange={setTenure}
            min={1}
            max={30}
            step={1}
            formatValue={(v) => `${v} yr`}
            icon={<Receipt className="h-4 w-4 text-gold-400" />}
          />

          <button onClick={reset} className="btn-secondary text-sm">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Results sidebar */}
        <aside className="space-y-4">
          <ResultCard
            label="Monthly EMI"
            value={formatCurrency(results.emi)}
            icon={Wallet}
            accent="text-gold-400"
          />
          <ResultCard
            label="Total Interest"
            value={formatCurrency(results.totalInterest)}
            icon={TrendingUp}
          />
          <ResultCard
            label="Total Payment"
            value={formatCurrency(results.totalPayment)}
            icon={Receipt}
          />

          {/* AdSense Sidebar */}
          <AdSlot slotId="AdSense_Sidebar" label="Sponsored" className="h-48" />
        </aside>
      </div>

      {/* AdSense Middle */}
      <div className="mt-8">
        <AdSlot slotId="AdSense_Middle" className="h-28" />
      </div>

      {/* What is EMI Calculator */}
      <ToolDescription
        title="What is an EMI Calculator?"
        description="An EMI (Equated Monthly Installment) calculator is a free online financial tool that helps you calculate the fixed monthly payment you need to make when you take a loan. Whether you are planning a home loan, car loan, personal loan, or business loan, this calculator uses the standard amortization formula to determine your monthly installment based on three key inputs: the loan amount, the annual interest rate, and the loan tenure. It also breaks down the total interest payable and the overall cost of borrowing, giving you complete transparency into what your loan will actually cost you over its entire term. By adjusting these inputs, you can instantly see how each factor affects your monthly payment and total repayment, helping you choose a loan structure that fits your budget. This tool is especially useful for comparing loan offers from different banks and financial institutions, planning prepayments, and deciding on the right tenure. It is completely free, requires no registration, and works on all devices."
      />

      <HowToUse
        steps={[
          { icon: Banknote, title: 'Enter Loan Amount', description: 'Use the slider or input field to set the total amount you plan to borrow.' },
          { icon: Percent, title: 'Set Interest Rate', description: 'Enter the annual interest rate offered by your lender (e.g., 8.5%).' },
          { icon: Calendar, title: 'Choose Loan Tenure', description: 'Select the repayment period in years. Longer tenures mean lower EMIs but more total interest.' },
          { icon: Calculator, title: 'View Your Results', description: 'Instantly see your monthly EMI, total interest payable, and total repayment amount.' },
        ]}
        seoTitle="EMI Calculator — Plan Your Loan Repayments with Confidence"
        seoParagraphs={[
          'Our EMI Calculator is a free, easy-to-use tool that helps you calculate your Equated Monthly Installment for any loan. Whether you are planning a home loan, car loan, personal loan, or business loan, this calculator gives you instant, accurate results to help you make informed financial decisions. Simply enter your loan amount, interest rate, and tenure, and the calculator will show you exactly how much you need to pay each month.',
          'Understanding your EMI before taking a loan is crucial for financial planning. It helps you budget your monthly expenses, compare loan offers from different banks, and choose a tenure that balances affordability with total cost. A shorter tenure means higher monthly payments but lower total interest, while a longer tenure reduces your monthly burden but increases the overall cost of the loan.',
          'The calculator also breaks down the total interest you will pay over the loan period, helping you understand the true cost of borrowing. This transparency empowers you to negotiate better terms with your lender and make confident decisions about prepayments or refinancing. Use this tool as often as you like — it is completely free and requires no registration.',
        ]}
      />

      {/* Educational content */}
      <ToolContent
        paragraphs={[
          'The EMI Calculator is one of the most practical financial tools available to anyone considering a loan. Whether you are planning to buy a home, purchase a car, fund your education, or consolidate debt, understanding your monthly repayment obligation is the first step toward responsible borrowing. This calculator uses the standard loan amortization formula to give you an accurate monthly installment figure based on three key inputs: the loan amount, the annual interest rate, and the loan tenure. By adjusting these variables, you can instantly see how each factor affects your monthly payment and the total cost of borrowing over the life of the loan.',
          'One of the most valuable insights this tool provides is the breakdown between principal and interest. Many borrowers are surprised to discover how much of their total repayment goes toward interest, especially in the early years of a long-term loan. By experimenting with different tenure lengths, you can see the trade-off between lower monthly payments (longer tenure) and lower total interest paid (shorter tenure). This knowledge empowers you to choose a loan structure that fits your monthly budget while minimizing the overall cost of borrowing.',
          'The calculator also helps you compare offers from different lenders. Since interest rates and terms vary between banks and financial institutions, you can plug in different rates to see exactly how much you would save or pay extra with each option. Even a small difference in the interest rate can translate to thousands of dollars over a 20-year mortgage. Additionally, if you are considering making a larger down payment to reduce your loan amount, the calculator shows you the direct impact on your monthly EMI and total interest.',
          'For first-time borrowers, this tool removes the guesswork and anxiety from the loan process. Instead of relying on a bank representative to tell you what you can afford, you can run the numbers yourself in private and arrive at the dealership or bank office fully informed. This puts you in a stronger negotiating position and helps you avoid taking on debt that could strain your finances. Always remember that the EMI calculator provides estimates based on the inputs you provide — actual loan terms may include additional fees, insurance, or taxes that affect your final payment.',
        ]}
      />

      {/* FAQ */}
      <FAQ
        items={[
          { question: 'What is EMI and how is it calculated?', answer: 'EMI (Equated Monthly Installment) is the fixed amount you pay each month toward a loan. It is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate, and n is the number of monthly installments.' },
          { question: 'How does loan tenure affect my EMI?', answer: 'A longer tenure reduces your monthly EMI but increases the total interest paid over the life of the loan. A shorter tenure means higher monthly payments but lower total interest. Use the calculator to find the right balance for your budget.' },
          { question: 'Can I use this calculator for any type of loan?', answer: 'Yes, the EMI calculator works for home loans, car loans, personal loans, education loans, and business loans. Simply enter the loan amount, interest rate, and tenure specific to your loan.' },
          { question: 'Is the EMI calculator free to use?', answer: 'Yes, our EMI calculator is 100% free, requires no sign-up, and works on all devices including mobile phones, tablets, and desktop computers.' },
          { question: 'Does the calculator account for processing fees?', answer: 'The calculator provides the core EMI based on principal, rate, and tenure. Processing fees and other charges vary by lender and are not included in the calculation. Check with your lender for the full cost breakdown.' },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          { label: 'SIP Calculator', href: '#/sip', icon: TrendingUp },
          { label: 'Compound Interest', href: '#/compound-interest', icon: Percent },
          { label: 'Currency Converter', href: '#/currency-converter', icon: Wallet },
          { label: 'Discount Calculator', href: '#/discount', icon: Receipt },
        ]}
      />
    </div>
  );
}
