import { walkthrough } from '../data/scenarios';
import { engine } from '../services/simulationEngine';
import type { PageId } from '../types/sportsiq';

export function runStepAction(n: number) {
  const a = walkthrough[n].action;
  if (a === 'start' && !engine.getState().running) engine.resume();
  if (a === 'scenario') engine.triggerScenario();
  if (a === 'seat') engine.injectDecision('Deliver seat upgrade offer');
}

export function ExecutiveWalkthrough({ step, setStep, onNavigate, onClose }: {
  step: number; setStep: (n: number) => void; onNavigate: (p: PageId) => void; onClose: () => void;
}) {
  const cur = walkthrough[step];
  const go = (n: number) => {
    setStep(n);
    onNavigate(walkthrough[n].page);
    runStepAction(n);
  };
  return (
    <div className="wt" role="dialog" aria-label="Executive walkthrough">
      <div className="nums">{walkthrough.map((w, i) => <i key={w.n} className={i <= step ? 'done' : ''} onClick={() => go(i)} title={w.label} />)}</div>
      <div className="big-n">EXECUTIVE WALKTHROUGH · STEP {cur.n} OF {walkthrough.length} · {cur.label.toUpperCase()}</div>
      <h3>{cur.title}</h3>
      <div className="wt-watch">👁 {cur.watch}</div>
      <div className="wt-body">
        <section><h4>THE SCENARIO</h4><p>{cur.what}</p></section>
        <section><h4>HOW SPORTSIQ DOES IT</h4><ul>{cur.how.map((h) => <li key={h}>{h}</li>)}</ul></section>
        <section className="val"><h4>VALUE TO ROGERS SPORTS &amp; MLSE</h4><ul>{cur.value.map((v) => <li key={v}>{v}</li>)}</ul></section>
      </div>
      <div className="ctl">
        <button className="btn" disabled={step === 0} onClick={() => go(step - 1)}>← Back</button>
        {step < walkthrough.length - 1
          ? <button className="btn red" onClick={() => go(step + 1)}>Next →</button>
          : <button className="btn red" onClick={onClose}>Finish</button>}
        <span className="spacer" />
        <button className="btn sm" onClick={onClose}>Exit</button>
      </div>
    </div>
  );
}
