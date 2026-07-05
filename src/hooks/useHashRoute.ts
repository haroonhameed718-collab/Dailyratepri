/**
 * useHashRoute
 * -----------
 * Minimal dependency-free router using the URL hash. Returns the
 * current path (e.g. "/emi") and re-renders on hash change.
 */

import { useEffect, useState } from 'react';

export function useHashRoute(): string {
  const getRoute = () => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  };

  const [route, setRoute] = useState<string>(getRoute);

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

/** Convenience hook for anchor-style navigation. */
export function navigate(to: string) {
  window.location.hash = to;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
