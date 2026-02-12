import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { FAQSection } from '../components/FAQSection';
import { Section } from '../components/Section';

export function FAQPage() {
  return (
    <>
      <NavBar />
      <Section>
        <FAQSection />
      </Section>
      <Footer />
    </>
  );
}
