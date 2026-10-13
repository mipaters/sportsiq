import type { SimState } from '../types/sportsiq';
import { engine } from '../services/simulationEngine';

const fmtClock = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export function ExecutiveHeader({ state, walkthrough, onToggleWalkthrough }: { state: SimState; walkthrough: boolean; onToggleWalkthrough: () => void }) {
  const g = state.game;
  return (
    <header className="topbar">
      <span className="live-pill"><span className={`dot ${state.running ? '' : 'paused'}`} />LIVE</span>
      <span className="matchup">{g.home} <span>vs</span> {g.away}</span>
      <span style={{ color: 'var(--muted)' }}>{g.venue}</span>
      <span className="scorebug">
        <span>Period {g.period}</span>
        <span className="clock" title="Game clock">{fmtClock(g.clockSeconds)}</span>
        {g.paused && <span className="tag review">COMMERCIAL PAUSE</span>}
      </span>
      <span className="spacer" />
      {state.running
        ? <button className="btn sm" onClick={() => engine.pause()}>⏸ Pause</button>
        : <button className="btn sm" onClick={() => engine.resume()}>▶ Resume</button>}
      <button className="btn sm" onClick={() => engine.reset()}>↺ Reset</button>
      <button className="btn sm blue" onClick={() => engine.triggerScenario()} disabled={state.scenario.active}>⚡ Trigger Scenario</button>
      <button className={`btn red ${walkthrough ? 'on' : ''}`} onClick={onToggleWalkthrough}>{walkthrough ? '■ END WALKTHROUGH' : '▶ EXECUTIVE WALKTHROUGH'}</button>
    </header>
  );
}
