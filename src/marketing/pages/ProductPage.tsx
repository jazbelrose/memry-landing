import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { ProductSection } from '../components/ProductSection';
import { Section } from '../components/Section';

export function ProductPage() {
  return (
    <>
      <NavBar />
      <Section>
        <ProductSection />
      </Section>
      <Footer />
    </>
  );
}
