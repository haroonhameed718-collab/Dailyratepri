/**
 * DiscountCalculator
 * ------------------
 * Discount calculator that computes the final price after a discount,
 * the amount saved, and the effective discount percentage. Supports
 * both percentage-based and fixed-amount discounts.
 *
 * Final Price = Original Price − Discount Amount
 * Discount Amount (percentage) = Original Price × (Discount % / 100)
 * Discount Amount (fixed) = Fixed Discount Value
 * You Save = Discount Amount
 */

import { useMemo, useState } from 'react';
import { Tag, Wallet, TrendingDown, RotateCcw, Percent, DollarSign, Receipt } from 'lucide-react';
import Slider from '../components/Slider';
import ResultCard from '../components/ResultCard';
import ToolDescription from '../components/ToolDescription';
import HowToUse from '../components/HowToUse';
import ToolContent from '../components/ToolContent';
import FAQ from '../components/FAQ';
import RelatedTools from '../components/RelatedTools';
import AdSlot from '../components/AdSlot';
import { useSEO } from '../hooks/useSEO';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(v);

export default function DiscountCalculator() {
  useSEO({
    title: 'Discount Calculator | Free Sale Price & Savings Calculator',
    description: 'Calculate your EMI, manage loans, and convert currencies instantly with our easy-to-use financial tools. Get accurate, real-time results for personal finance, mortgage planning, and global exchange rates. Trusted by users worldwide and in Pakistan.',
    keywords: 'discount calculator, sale price calculator, percentage discount, savings calculator, price after discount, shopping discount, free online finance tools, PK finance',
  });

  const [price, setPrice] = useState(1000);
  const [discount, setDiscount] = useState(20);
  const [mode, setMode] = useState<'percent' | 'fixed'>('percent');

  const results = useMemo(() => {
    const discountAmount = mode === 'percent'
      ? price * (discount / 100)
      : Math.min(discount, price);
    const finalPrice = Math.max(price - discountAmount, 0);
    const effectivePct = price > 0 ? (discountAmount / price) * 100 : 0;

    return { discountAmount, finalPrice, effectivePct };
  }, [price, discount, mode]);

  const reset = () => {
    setPrice(1000);
    setDiscount(20);
    setMode('percent');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-glass">
          <Tag className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white">
          Discount Calculator
        </h1>
        <p className="mt-2 text-navy-200 max-w-xl mx-auto">
          Calculate the final price after a discount and see exactly how much
          you save on any purchase.
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
            label="Original Price"
            value={price}
            onChange={setPrice}
            min={1}
            max={100000}
            step={1}
            formatValue={formatCurrency}
            icon={<DollarSign className="h-4 w-4 text-gold-400" />}
          />

          {/* Discount mode toggle */}
          <div>
            <label className="text-sm font-semibold text-white">Discount Type</label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('percent')}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                  mode === 'percent'
                    ? 'border-gold-400/50 bg-white/10 text-white shadow-glass-sm'
                    : 'border-white/10 bg-white/5 text-navy-100 hover:border-white/20'
                }`}
              >
                <Percent className="h-4 w-4" />
                Percentage (%)
              </button>
              <button
                onClick={() => setMode('fixed')}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                  mode === 'fixed'
                    ? 'border-gold-400/50 bg-white/10 text-white shadow-glass-sm'
                    : 'border-white/10 bg-white/5 text-navy-100 hover:border-white/20'
                }`}
              >
                <DollarSign className="h-4 w-4" />
                Fixed Amount
              </button>
            </div>
          </div>

          <Slider
            label={mode === 'percent' ? 'Discount Percentage' : 'Discount Amount'}
            value={discount}
            onChange={setDiscount}
            min={0}
            max={mode === 'percent' ? 100 : price}
            step={mode === 'percent' ? 1 : 1}
            formatValue={mode === 'percent' ? (v) => `${v}%` : formatCurrency}
            icon={mode === 'percent'
              ? <Percent className="h-4 w-4 text-gold-400" />
              : <DollarSign className="h-4 w-4 text-gold-400" />}
          />

          <button onClick={reset} className="btn-secondary text-sm">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Results sidebar */}
        <aside className="space-y-4">
          <ResultCard
            label="Final Price"
            value={formatCurrency(results.finalPrice)}
            icon={Wallet}
            accent="text-gold-400"
          />
          <ResultCard
            label="You Save"
            value={formatCurrency(results.discountAmount)}
            icon={TrendingDown}
          />
          <ResultCard
            label="Effective Discount"
            value={`${results.effectivePct.toFixed(1)}%`}
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

      {/* What is Discount Calculator */}
      <ToolDescription
        title="What is a Discount Calculator?"
        description="A discount calculator is a free online tool that helps you instantly determine the final price of a product or service after applying a discount. Whether you are shopping during a sale, comparing deals, or negotiating a price, this calculator makes it easy to see exactly how much you will pay and how much you will save. Simply enter the original price and the discount value — either as a percentage or a fixed amount — and the tool computes the final price, the savings amount, and the effective discount rate in real time. This is especially useful during seasonal sales like Black Friday, holiday promotions, or clearance events where multiple discounts may stack. By using this calculator, you can make informed purchasing decisions, compare offers from different retailers, and ensure you are getting the best possible deal. The tool is completely free, requires no sign-up, and works seamlessly on both desktop and mobile devices, making it a handy companion for smart shoppers worldwide."
      />

      {/* How to Use */}
      <HowToUse
        steps={[
          { icon: DollarSign, title: 'Enter Original Price', description: 'Set the listed price of the product or service before any discount is applied.' },
          { icon: Percent, title: 'Choose Discount Type', description: 'Select whether your discount is a percentage (e.g., 20% off) or a fixed amount (e.g., $50 off).' },
          { icon: Tag, title: 'Set Discount Value', description: 'Enter the discount percentage or fixed amount using the slider or input field.' },
          { icon: Wallet, title: 'See Your Savings', description: 'Instantly view the final price, the amount you save, and the effective discount rate.' },
        ]}
        seoTitle="Discount Calculator — Save More on Every Purchase"
        seoParagraphs={[
          'Our Discount Calculator is a simple yet powerful tool that helps you calculate the final price of any product after applying a discount. Whether you are shopping online, comparing deals at a store, or planning a budget for a major purchase, this calculator gives you instant clarity on how much you will actually pay and how much you will save. It supports both percentage-based discounts (like 25% off) and fixed-amount discounts (like $50 off), making it versatile for any shopping scenario.',
          'During seasonal sales, flash promotions, and holiday events, retailers often advertise discounts in different ways. Some show a percentage off, others show a fixed dollar amount, and some even stack multiple discounts. This calculator lets you quickly evaluate any offer to see whether it is truly a good deal. By comparing the effective discount rate across different products and stores, you can make smarter purchasing decisions and avoid misleading marketing tactics.',
          'The tool is completely free, works on any device, and requires no registration. Use it as often as you like to become a more informed, confident shopper who always knows the real value of a discount.',
        ]}
      />

      {/* Educational content */}
      <ToolContent
        paragraphs={[
          'The Discount Calculator is an essential tool for anyone who wants to make smart purchasing decisions. Whether you are shopping during a Black Friday sale, comparing prices at different retailers, or simply trying to figure out if a promotion is worth it, this calculator gives you instant clarity on the actual price you will pay and the amount you will save. By entering the original price and the discount value — either as a percentage or a fixed amount — you can see the final price, the savings, and the effective discount rate in real time. This eliminates the mental math that often leads to mistakes and ensures you always know exactly what a deal is worth.',
          'One of the most common scenarios where this tool proves invaluable is during seasonal sales and promotional events. Retailers often use a variety of discount formats: some advertise "20% off," others say "$50 off," and some even stack multiple discounts like "an extra 15% off already-reduced prices." This calculator handles both percentage and fixed-amount discounts, and by calculating the effective discount rate, it lets you compare offers that are presented in different ways. A $50 discount on a $200 item is a 25% discount, while a 20% discount on a $300 item saves you $60 — the calculator makes these comparisons effortless.',
          'For budget-conscious shoppers, the tool also helps with planning. If you have a specific budget for a shopping trip, you can use the calculator to determine which items fit within your limit after discounts are applied. This is particularly useful when buying big-ticket items like electronics, furniture, or appliances, where even a small percentage difference can translate to significant savings. The calculator also helps you evaluate whether a "buy one, get one" or "spend more to save more" promotion actually delivers better value than a straightforward discount on a single item.',
          'It is worth noting that some retailers advertise discounts off an inflated "original" price that may not reflect the actual market value of the product. The Discount Calculator shows you the mathematical savings based on the numbers you enter, but it cannot verify whether the original price is fair. Always compare prices across multiple stores and consider the product quality, warranty, and return policy before making a purchase. Use this tool as a quick, reliable way to crunch the numbers so you can focus on making confident, informed buying decisions.',
        ]}
      />

      {/* FAQ */}
      <FAQ
        items={[
          { question: 'How do I calculate a discount percentage?', answer: 'To calculate a discount percentage, multiply the original price by the discount rate (as a decimal). For example, a 20% discount on a $100 item: $100 × 0.20 = $20 saved. The final price is $100 − $20 = $80.' },
          { question: 'Can I calculate fixed-amount discounts with this tool?', answer: 'Yes. Switch the discount type to "Fixed Amount" and enter the dollar value of the discount. The calculator will subtract it from the original price and show the effective percentage you saved.' },
          { question: 'How do I calculate the final price after multiple discounts?', answer: 'Apply discounts sequentially. For example, if an item is 30% off and then an additional 20% off, first calculate the price after 30% off, then apply 20% to that reduced price. This tool calculates one discount at a time.' },
          { question: 'Is the Discount Calculator free to use?', answer: 'Yes, the Discount Calculator is 100% free, requires no sign-up, and works on all devices including mobile phones, tablets, and desktop computers.' },
          { question: 'What is the difference between percentage and fixed discounts?', answer: 'A percentage discount reduces the price by a percentage of the original (e.g., 25% off), while a fixed discount subtracts a set dollar amount (e.g., $50 off). Percentage discounts favor higher-priced items, while fixed discounts offer the same savings regardless of price.' },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          { label: 'EMI Calculator', href: '#/emi', icon: Wallet },
          { label: 'Compound Interest', href: '#/compound-interest', icon: Percent },
          { label: 'Currency Converter', href: '#/currency-converter', icon: DollarSign },
          { label: 'SIP Calculator', href: '#/sip', icon: TrendingDown },
        ]}
      />
    </div>
  );
}
