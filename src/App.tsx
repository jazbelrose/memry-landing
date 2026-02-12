import { useEffect, useState } from 'react';
import { MarketingLandingPage } from './marketing/MarketingLandingPage';
import { UseCasesPage } from './marketing/pages/UseCasesPage';

type PageType = 'home' | 'use-cases';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === '/use-cases') {
        setCurrentPage('use-cases');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <>{currentPage === 'use-cases' ? <UseCasesPage /> : <MarketingLandingPage />}</>;
}
