import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { RequestAccessSection } from '../components/RequestAccessSection';

export function RequestAccessPage() {
  return (
    <>
      <NavBar />
      <main id="main-content">
        <RequestAccessSection />
      </main>
      <Footer />
    </>
  );
}
