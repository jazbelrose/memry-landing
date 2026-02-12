import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { ReleaseNotesSection } from '../components/ReleaseNotesSection';
import { Section } from '../components/Section';

export function ReleaseNotesPage() {
  return (
    <>
      <NavBar />
      <Section>
        <ReleaseNotesSection />
      </Section>
      <Footer />
    </>
  );
}
