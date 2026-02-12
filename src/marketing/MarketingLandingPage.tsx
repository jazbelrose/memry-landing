import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { TabsSection } from './components/TabsSection';
import { FeatureGrid } from './components/FeatureGrid';
import { ComparisonTable } from './components/ComparisonTable';
import { WorkflowStepper } from './components/WorkflowStepper';
import { RoleCards } from './components/RoleCards';
import { Footer } from './components/Footer';

export function MarketingLandingPage() {
  return (
    <>
      <a className="skip-to-content" href="#main-content">
        Skip to content
      </a>
      <NavBar />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <TabsSection />
        <FeatureGrid />
        <ComparisonTable />
        <WorkflowStepper />
        <RoleCards />
      </main>
      <Footer />
    </>
  );
}
