/**
 * CurrencyConverter
 * -----------------
 * Converts between major world currencies using live exchange rates
 * fetched from the currency-rates edge function (which proxies the
 * free ExchangeRate-API). Rates are USD-based; cross-currency
 * conversion is done via:  amount_in_target = amount × (rate_target / rate_source)
 */

import { useEffect, useState } from 'react';
import { Coins, ArrowRight, RefreshCw, AlertCircle, CheckCircle2, ArrowLeftRight, TrendingUp } from 'lucide-react';
import ToolContent from '../components/ToolContent';
import HowToUse from '../components/HowToUse';
import ToolDescription from '../components/ToolDescription';
import FAQ from '../components/FAQ';
import RelatedTools from '../components/RelatedTools';
import AdSlot from '../components/AdSlot';
import { supabase } from '../lib/supabase';
import { useSEO } from '../hooks/useSEO';

const POPULAR_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY',
  'INR', 'PKR', 'SGD', 'AED', 'NZD', 'MXN', 'BRL', 'ZAR', 'HKD',
];

export default function CurrencyConverter() {
  useSEO({
    title: 'Live Currency Converter | Real-time Global Exchange Rates',
    description: 'Calculate your EMI, manage loans, and convert currencies instantly with our easy-to-use financial tools. Get accurate, real-time results for personal finance, mortgage planning, and global exchange rates. Trusted by users worldwide and in Pakistan.',
    keywords: 'currency converter, exchange rate, daily currency rates, dollar to pkr, live gold rates, quick currency exchange, global currency converter, free online finance tools, PK finance',
  });
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [updated, setUpdated] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const [result, setResult] = useState<number | null>(null);

  // Fetch rates on mount
  useEffect(() => {
    fetchRates();
  }, []);

  async function fetchRates() {
    setLoading(true);
    setError('');
    try {
      const { data, error: fnError } = await supabase.functions.invoke('currency-rates');
      if (fnError) throw fnError;
      if (!data || !data.rates) throw new Error('Invalid response from rates API');

      setRates(data.rates as Record<string, number>);
      setUpdated(data.updated || '');
    } catch {
      setError('Failed to load exchange rates. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Calculate conversion whenever inputs change
  useEffect(() => {
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
      setResult(null);
      return;
    }
    // rates are USD-based: amount_in_target = amount × (rate_target / rate_source)
    const converted = (amount * rates[toCurrency]) / rates[fromCurrency];
    setResult(converted);
  }, [amount, fromCurrency, toCurrency, rates]);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatMoney = (value: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-glass">
          <Coins className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white">
          Currency Converter
        </h1>
        <p className="mt-2 text-navy-200 max-w-xl mx-auto">
          Convert between major world currencies with live, up-to-date exchange
          rates.
        </p>
      </div>

      {/* AdSense Top */}
      <div className="mt-8">
        <AdSlot slotId="AdSense_Top" className="h-24" />
      </div>

      {/* Status bar */}
      <div className="mt-8 flex items-center justify-between">
        {loading ? (
          <p className="text-sm text-navy-300/60">Loading live rates...</p>
        ) : error ? (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" />
            {error}
          </p>
        ) : (
          <p className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            Live rates {updated && `· updated ${new Date(updated).toLocaleDateString()}`}
          </p>
        )}
        <button
          onClick={fetchRates}
          disabled={loading}
          className="btn-secondary text-sm disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Converter */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="glass rounded-3xl p-6 sm:p-8">
          {/* Amount input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-white">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-lg font-semibold text-white shadow-sm focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
            />
          </div>

          {/* From / To selectors */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-white">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-white shadow-sm focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400/20 [&>option]:bg-navy-800"
              >
                {POPULAR_CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Swap button */}
            <div className="flex items-end pb-1">
              <button
                onClick={swap}
                className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white shadow-glass-sm transition-transform hover:scale-105"
                aria-label="Swap currencies"
              >
                <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
              </button>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-white">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-white shadow-sm focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400/20 [&>option]:bg-navy-800"
              >
                {POPULAR_CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          <div className="mt-8 rounded-2xl bg-navy-950/60 border border-gold-400/20 p-6 text-center text-white shadow-glass">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">
              {amount} {fromCurrency} =
            </p>
            <p className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-gold-400">
              {result !== null ? formatMoney(result, toCurrency) : '—'}
            </p>
            {rates && rates[fromCurrency] && rates[toCurrency] && (
              <p className="mt-3 text-sm text-navy-300">
                1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-white">Quick Convert</h3>
            <p className="mt-2 text-sm text-navy-200">
              Popular pairs at a glance (per 1 USD):
            </p>
            <ul className="mt-4 space-y-2">
              {rates && ['EUR', 'GBP', 'JPY', 'INR', 'PKR', 'AUD'].map((c) => (
                <li key={c} className="flex justify-between text-sm">
                  <span className="text-navy-200">1 USD →</span>
                  <span className="font-semibold text-white">
                    {rates[c]?.toFixed(2)} {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* AdSense Sidebar */}
          <AdSlot slotId="AdSense_Sidebar" label="Sponsored" className="h-48" />
        </aside>
      </div>

      {/* AdSense Middle */}
      <div className="mt-8">
        <AdSlot slotId="AdSense_Middle" className="h-28" />
      </div>

      {/* What is Currency Converter */}
      <ToolDescription
        title="What is a Currency Converter?"
        description="A currency converter is a free online financial tool that allows you to instantly convert amounts between different world currencies using live, up-to-date exchange rates. Whether you are planning an international trip, sending money abroad, pricing an import or export, or tracking exchange rates for business, this tool provides accurate, real-time conversions for major currencies including the US Dollar (USD), Euro (EUR), British Pound (GBP), Japanese Yen (JPY), Indian Rupee (INR), Pakistani Rupee (PKR), and many more. The converter fetches the latest available rates from a reliable financial data API, ensuring that the figures you see reflect current market conditions rather than outdated or static values. Simply enter the amount, select your source and target currencies, and the conversion happens instantly. You can also use the swap button to quickly reverse the direction of conversion, and the quick-convert sidebar shows popular currency pairs at a glance. Exchange rates fluctuate constantly due to factors like inflation, interest rates, political stability, and economic performance, so using a live converter is essential for accurate financial planning. The tool is completely free, requires no registration, and works on all devices."
      />

      <HowToUse
        steps={[
          { icon: Coins, title: 'Enter Amount', description: 'Type the amount you want to convert in the input field.' },
          { icon: ArrowLeftRight, title: 'Select Currencies', description: 'Choose the source currency (From) and target currency (To) from the dropdowns.' },
          { icon: RefreshCw, title: 'Swap if Needed', description: 'Click the swap button to instantly reverse the conversion direction.' },
          { icon: TrendingUp, title: 'View Live Results', description: 'See the converted amount instantly with up-to-date exchange rates.' },
        ]}
        seoTitle="Currency Converter — Live Exchange Rates for 17+ World Currencies"
        seoParagraphs={[
          'Our free Currency Converter provides live, accurate exchange rates for major world currencies including US Dollar (USD), Euro (EUR), British Pound (GBP), Japanese Yen (JPY), Indian Rupee (INR), Pakistani Rupee (PKR), and many more. Whether you are planning an international trip, sending money abroad, or tracking exchange rates for business, this tool gives you instant conversions with rates updated regularly from reliable financial data sources.',
          'Exchange rates fluctuate constantly due to factors like inflation, interest rates, political stability, and economic performance. Our converter fetches the latest available rates so you always have the most current information. Simply enter the amount, select your source and target currencies, and the conversion happens instantly. You can also use the swap button to quickly reverse the direction of conversion.',
          'This tool is especially useful for travelers, students studying abroad, freelancers working with international clients, and businesses dealing with foreign transactions. While the rates shown are accurate indicators, actual rates offered by banks and currency exchange services may differ slightly due to margins and fees. Always confirm the final rate with your provider before making important financial transactions.',
        ]}
      />

      {/* Educational content */}
      <ToolContent
        paragraphs={[
          'The Currency Converter is an essential tool for anyone dealing with international transactions, whether you are a traveler planning a trip abroad, a business owner importing or exporting goods, a freelancer working with overseas clients, or an investor tracking foreign markets. This converter fetches live exchange rates from a reliable financial data API, ensuring that the figures you see reflect current market conditions rather than outdated or static values. Simply enter the amount you want to convert, select your source and target currencies, and the tool instantly calculates the equivalent value based on the latest available rates.',
          'Exchange rates fluctuate constantly throughout the day as currencies are traded on global foreign exchange markets. These movements are driven by a complex interplay of factors including interest rate decisions by central banks, economic indicators like GDP and employment data, geopolitical events, trade balances, and market sentiment. The rate you see today may differ from the rate tomorrow, and for large transactions, even a small percentage change can translate to a meaningful difference in the final amount. This is why using a live converter rather than relying on remembered or approximate rates is important for accurate financial planning.',
          'For travelers, this tool helps you budget your trips with confidence. Before you depart, you can check how much your home currency buys in your destination country, and track whether the rate is moving in your favor. For businesses, it provides a quick way to price international invoices, estimate import costs, or compare supplier quotes from different countries. The quick-convert sidebar shows popular currency pairs at a glance, making it easy to monitor rates for the currencies you deal with most frequently. The swap button lets you instantly reverse the conversion direction without re-entering the amount.',
          'It is important to understand that the rates shown here are mid-market rates — the midpoint between buy and sell prices on the global market. When you actually exchange money through a bank, currency exchange service, or payment platform, you will typically receive a slightly different rate that includes a margin or fee. This margin is how these services make money. The converter gives you the benchmark rate so you can compare it against the rate you are offered and determine whether you are getting a fair deal. Always check the final rate and any associated fees before committing to a currency exchange, and consider consulting a financial professional for large or time-sensitive transactions.',
        ]}
      />

      {/* FAQ */}
      <FAQ
        items={[
          { question: 'Are the exchange rates live?', answer: 'Yes, our currency converter fetches live exchange rates from a reliable financial data API. Rates are updated regularly to reflect current market conditions. Use the Refresh button to fetch the latest rates at any time.' },
          { question: 'Which currencies are supported?', answer: 'The converter supports 17 major world currencies including USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, INR, PKR, SGD, AED, NZD, MXN, BRL, ZAR, and HKD.' },
          { question: 'Are these the exact rates I will get from my bank?', answer: 'The rates shown are mid-market rates — the midpoint between buy and sell prices. Banks and exchange services typically add a margin or fee, so the actual rate you receive may differ slightly. Use this tool as a benchmark to compare offers.' },
          { question: 'Is the currency converter free to use?', answer: 'Yes, our currency converter is 100% free, requires no sign-up, and works on all devices including mobile phones, tablets, and desktop computers.' },
          { question: 'How often should I refresh the rates?', answer: 'Exchange rates fluctuate throughout the day. For most purposes, checking once a day is sufficient. For large or time-sensitive transactions, refresh right before you need the figure to ensure you have the most current rate.' },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          { label: 'EMI Calculator', href: '#/emi', icon: Coins },
          { label: 'SIP Calculator', href: '#/sip', icon: TrendingUp },
          { label: 'Compound Interest', href: '#/compound-interest', icon: RefreshCw },
          { label: 'Discount Calculator', href: '#/discount', icon: ArrowRight },
        ]}
      />
    </div>
  );
}
