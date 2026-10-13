import { walkthrough } from '../data/scenarios';
import type { PageId } from '../types/sportsiq';

export function ExecutiveWalkthrough({ step, setStep, onNavigate, onClose }: {
  step: number; setStep: (n: number) => void; onNavigate: (p: PageId) => void; onClose: () => void;
}) {
  const cur = walkthrough[step];
  const go = (n: number) => { setStep(n); onNavigate(walkthrough[n].page); };
  return (
    <div className="wt" role="dialog" aria-label="Executive walkthrough">
      <div className="nums">{walkthrough.map((w, i) => <i key={w.n} className={i <= step ? 'done' : ''} />)}</div>
      <div className="big-n">STEP {cur.n} OF {walkthrough.length}</div>
      <h3>{cur.n}. {cur.label}</h3>
      <p>"{cur.text}"</p>
      <div className="ctl">
        <button className="btn sm" disabled={step === 0} onClick={() => go(step - 1)}>← Back</button>
        {step < walkthrough.length - 1
          ? <button className="btn sm red" onClick={() => go(step + 1)}>Next →</button>
          : <button className="btn sm red" onClick={onClose}>Finish</button>}
        <span className="spacer" />
        <button className="btn sm" onClick={onClose}>Exit</button>
      </div>
    </div>
  );
}
