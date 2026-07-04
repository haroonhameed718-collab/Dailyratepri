/**
 * useSEO
 * ------
 * Dynamically updates the document <head> with page-specific title,
 * meta description, and meta keywords for SEO. Restores defaults on
 * unmount so navigating between pages always reflects the current page.
 */

import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description?: string;
  keywords?: string;
}

const DEFAULT_DESCRIPTION =
  'Calculate your EMI, manage loans, and convert currencies instantly with our easy-to-use financial tools. Get accurate, real-time results for personal finance, mortgage planning, and global exchange rates. Trusted by users worldwide and in Pakistan.';

const DEFAULT_KEYWORDS =
  'EMI calculator, loan calculator, currency converter, exchange rate, monthly installment, personal loan, mortgage calculator, simple EMI tool, daily currency rates, dollar to pkr, live gold rates, financial planner, easy loan calculator, how to calculate EMI, quick currency exchange, free online finance tools, PK finance, global currency converter, debt calculator';

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO({ title, description, keywords }: SEOOptions) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description || DEFAULT_DESCRIPTION);
    setMeta('keywords', keywords || DEFAULT_KEYWORDS);

    return () => {
      document.title = 'Daily Rate Pro | Free Financial Calculators & Live Currency Converter';
      setMeta('description', DEFAULT_DESCRIPTION);
      setMeta('keywords', DEFAULT_KEYWORDS);
    };
  }, [title, description, keywords]);
}
