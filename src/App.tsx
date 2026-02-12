import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { MarketingLandingPage } from './marketing/MarketingLandingPage';
import { UseCasesPage } from './marketing/pages/UseCasesPage';
import { ProductPage } from './marketing/pages/ProductPage';
import { SecurityPage } from './marketing/pages/SecurityPage';
import { FAQPage } from './marketing/pages/FAQPage';
import { ReleaseNotesPage } from './marketing/pages/ReleaseNotesPage';
import { RequestAccessPage } from './marketing/pages/RequestAccessPage';

const scrollPositions = new Map<string, number>();

function getScrollElement(): HTMLElement {
  const explicitScrollContainer = document.querySelector<HTMLElement>('[data-scroll-container], #appScroll');
  if (explicitScrollContainer) {
    return explicitScrollContainer;
  }

  return (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
}

function readScrollTop(scrollElement: HTMLElement): number {
  if (scrollElement === document.documentElement || scrollElement === document.body) {
    return window.scrollY;
  }

  return scrollElement.scrollTop;
}

function setScrollTop(scrollElement: HTMLElement, top: number): void {
  if (scrollElement === document.documentElement || scrollElement === document.body) {
    window.scrollTo({ top, left: 0, behavior: 'auto' });
    return;
  }

  scrollElement.scrollTop = top;
}

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollElementRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const routeKey = `${location.pathname}${location.search}${location.hash}`;

  useLayoutEffect(() => {
    scrollElementRef.current = getScrollElement();
  }, []);

  useEffect(() => {
    const scrollElement = scrollElementRef.current ?? getScrollElement();

    const onScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        scrollPositions.set(routeKey, readScrollTop(scrollElement));
      });
    };

    scrollElement.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [routeKey]);

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current ?? getScrollElement();

    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    }

    if (navigationType === 'POP') {
      setScrollTop(scrollElement, scrollPositions.get(routeKey) ?? 0);
      return;
    }

    setScrollTop(scrollElement, 0);
    scrollPositions.set(routeKey, 0);
  }, [navigationType, routeKey]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<MarketingLandingPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/features" element={<ProductPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/release-notes" element={<ReleaseNotesPage />} />
        <Route path="/request-access" element={<RequestAccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
