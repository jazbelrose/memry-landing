import { useEffect, useState } from 'react';
import { MarketingLandingPage } from './marketing/MarketingLandingPage';
import { UseCasesPage } from './marketing/pages/UseCasesPage';
import { ProductPage } from './marketing/pages/ProductPage';
import { SecurityPage } from './marketing/pages/SecurityPage';
import { FAQPage } from './marketing/pages/FAQPage';
import { ReleaseNotesPage } from './marketing/pages/ReleaseNotesPage';
import { RequestAccessPage } from './marketing/pages/RequestAccessPage';

type PageType = 'home' | 'use-cases' | 'features' | 'security' | 'faq' | 'release-notes' | 'request-access';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === '/use-cases') {
        setCurrentPage('use-cases');
      } else if (hash === '/features') {
        setCurrentPage('features');
      } else if (hash === '/security') {
        setCurrentPage('security');
      } else if (hash === '/faq') {
        setCurrentPage('faq');
      } else if (hash === '/release-notes') {
        setCurrentPage('release-notes');
      } else if (hash === '/request-access') {
        setCurrentPage('request-access');
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

  return (
    <>
      {currentPage === 'use-cases' ? (
        <UseCasesPage />
      ) : currentPage === 'features' ? (
        <ProductPage />
      ) : currentPage === 'security' ? (
        <SecurityPage />
      ) : currentPage === 'faq' ? (
        <FAQPage />
      ) : currentPage === 'release-notes' ? (
        <ReleaseNotesPage />
      ) : currentPage === 'request-access' ? (
        <RequestAccessPage />
      ) : (
        <MarketingLandingPage />
      )}
    </>
  );
}
