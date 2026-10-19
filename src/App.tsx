import { useState } from 'react';
import type { PageId } from './types/sportsiq';
import { useSimulation } from './services/simulationEngine';
import { Navigation } from './components/Navigation';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { ExecutiveWalkthrough, runStepAction } from './components/ExecutiveWalkthrough';
import { walkthrough } from './data/scenarios';
import { CommandCenter } from './pages/CommandCenter';
import { SportsIQBrain } from './pages/SportsIQBrain';
import { FanIQ } from './pages/FanIQ';
import { VenueIQ } from './pages/VenueIQ';
import { SponsorIQ } from './pages/SponsorIQ';
import { ContentIQ } from './pages/ContentIQ';
import { AnalyticsIQ } from './pages/AnalyticsIQ';
import { OrganizationalMemory } from './pages/OrganizationalMemory';
import { AgentActivity } from './pages/AgentActivity';
import { BusinessOutcomes } from './pages/BusinessOutcomes';
import { Architecture } from './pages/Architecture';

export default function App() {
  const state = useSimulation();
  const [page, setPage] = useState<PageId>('command');
  const [wt, setWt] = useState(false);
  const [wtStep, setWtStep] = useState(0);

  const toggleWt = () => {
    if (wt) { setWt(false); return; }
    setWtStep(0); setWt(true); setPage(walkthrough[0].page); runStepAction(0);
  };

  const render = () => {
    switch (page) {
      case 'command': return <CommandCenter state={state} go={setPage} />;
      case 'brain': return <SportsIQBrain state={state} go={setPage} />;
      case 'faniq': return <FanIQ state={state} />;
      case 'venueiq': return <VenueIQ state={state} />;
      case 'sponsoriq': return <SponsorIQ state={state} />;
      case 'contentiq': return <ContentIQ state={state} />;
      case 'analyticsiq': return <AnalyticsIQ state={state} />;
      case 'memory': return <OrganizationalMemory state={state} />;
      case 'agents': return <AgentActivity state={state} />;
      case 'outcomes': return <BusinessOutcomes state={state} />;
      case 'architecture': return <Architecture />;
    }
  };

  return (
    <div className="app">
      <Navigation page={page} onNavigate={setPage} />
      <div className="main">
        <ExecutiveHeader state={state} walkthrough={wt} onToggleWalkthrough={toggleWt} />
        <main className="content">
          {!wt && page === 'command' && (
            <div className="wt-banner">
              <div style={{ flex: 1 }}><b>New here? Take the Executive Walkthrough</b><br /><span>A 9-step guided story of one game-night moment: what SportsIQ does, how, and the value to Rogers Sports &amp; MLSE.</span></div>
              <button className="btn red cta" onClick={toggleWt}>▶ START WALKTHROUGH</button>
            </div>
          )}
          {render()}
        </main>
      </div>
      {wt && <ExecutiveWalkthrough step={wtStep} setStep={setWtStep} onNavigate={setPage} onClose={() => setWt(false)} />}
    </div>
  );
}
