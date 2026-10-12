import { useRef } from 'react';
import { indexItems } from './content/portfolio';
import { About } from './components/About';
import { CaseStudies } from './components/CaseStudies';
import { Contact } from './components/Contact';
import { DeliveryWork } from './components/DeliveryWork';
import { Experience } from './components/Experience';
import { FlowIndex } from './components/FlowIndex';
import { Hero } from './components/Hero';
import { JustdialWork } from './components/JustdialWork';
import { PersonalBuilds } from './components/PersonalBuilds';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { StackTools } from './components/StackTools';
import { useActiveStage } from './hooks/useActiveStage';
import { useAnchorRows } from './hooks/useAnchorRows';
import { useFlowMotion } from './hooks/useFlowMotion';

const stageIds = indexItems.map((item) => item.target);

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActiveStage(stageIds, 'top');
  useFlowMotion(rootRef);
  useAnchorRows();

  return (
    <div ref={rootRef}>
      <a href="#main" className="sr-only-focusable btn btn-primary fixed top-2 left-2 z-50">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        {/* The index sticks only while this wrapper is on screen, releasing before experience. */}
        <div>
          <FlowIndex active={active} />
          <JustdialWork />
          <DeliveryWork />
          <CaseStudies />
          <PersonalBuilds />
        </div>
        <About />
        <Experience />
        <StackTools />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
