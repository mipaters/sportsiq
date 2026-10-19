import { useSyncExternalStore } from 'react';
import type { AgentDecision, SimState } from '../types/sportsiq';
import { decisionTemplates, masterScenario, scenarioTemplate } from '../data/scenarios';
import { createDecision } from './agentEngine';
import {
  SCENARIO_END, SCENARIO_STEP_AT, SCENARIO_TARGET, advanceDecision, createInitialState, driftLive, driftZones,
  pickTemplate, wallTime,
} from './sportsIQEngine';

const TICK_MS = 1000;
const MAX_DECISIONS = 60;

class SimulationEngine {
  private state: SimState = createInitialState();
  private listeners = new Set<() => void>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private pending = { revenue: 0 };
  private scenarioTick = 0;

  constructor() {
    // Warm the stream so the first screen is never empty.
    for (let i = 0; i < 6; i++) this.step(true);
    this.state = { ...this.state, running: false };
  }

  subscribe = (l: () => void) => { this.listeners.add(l); return () => { this.listeners.delete(l); }; };
  getState = () => this.state;
  private emit() { this.listeners.forEach((l) => l()); }

  private start() {
    if (this.timer) return;
    this.timer = setInterval(() => this.step(), TICK_MS);
  }
  private stop() { if (this.timer) clearInterval(this.timer); this.timer = null; }

  pause() { this.stop(); this.state = { ...this.state, running: false }; this.emit(); }
  resume() { this.state = { ...this.state, running: true }; this.start(); this.emit(); }
  reset() {
    this.stop();
    this.pending = { revenue: 0 };
    this.scenarioTick = 0;
    this.state = createInitialState();
    for (let i = 0; i < 6; i++) this.step(true);
    this.state = { ...this.state, running: false };
    this.emit();
  }

  injectDecision(match: string) {
    const t = decisionTemplates.find((x) => x.action.type === match);
    if (!t) return;
    const s = structuredClone(this.state);
    s.decisions.unshift(createDecision(t, wallTime(s.tick)));
    s.stats[t.domain].signals += 1;
    this.state = s;
    if (!s.running) this.resume();
    this.emit();
  }

  triggerScenario() {
    if (this.state.scenario.active) return;
    const s = structuredClone(this.state);
    s.scenario = { active: true, step: 0, startedAt: s.tick, results: { offers: 0, redemptions: 0, transactions: 0, sponsorEngagement: 0, revenue: 0, queueDelta: 0 } };
    s.game.paused = true;
    this.scenarioTick = 0;
    this.state = s;
    if (!s.running) this.resume();
    this.emit();
  }

  private step(silent = false) {
    const s = structuredClone(this.state);
    s.tick += 1;
    if (!s.game.paused) {
      s.game.clockSeconds -= 1;
      if (s.game.clockSeconds <= 0) { s.game.period = Math.min(3, s.game.period + 1); s.game.clockSeconds = 20 * 60; }
    }

    driftLive(s);
    driftZones(s);

    for (const d of s.decisions) advanceDecision(s, d, this.pending);

    if (!s.scenario.active && Math.random() < 0.55) {
      const d: AgentDecision = createDecision(pickTemplate(), wallTime(s.tick));
      s.decisions.unshift(d);
      s.stats[d.domain].signals += 1;
    }
    if (s.decisions.length > MAX_DECISIONS) s.decisions.length = MAX_DECISIONS;

    this.advanceScenario(s);

    if (s.tick % 3 === 0) {
      const sr = s.series;
      const push = (arr: number[], v: number) => { arr.push(+v.toFixed(1)); if (arr.length > 24) arr.shift(); };
      push(sr.revenue, sr.revenue[sr.revenue.length - 1] + (Math.random() - 0.35) * 2 + this.pending.revenue / 600);
      push(sr.engagement, Math.min(96, Math.max(50, sr.engagement[sr.engagement.length - 1] + (Math.random() - 0.4) * 1.5)));
      push(sr.queue, Math.max(2.5, s.zones.reduce((a, z) => a + z.waitMin, 0) / s.zones.length));
      push(sr.sponsor, Math.min(95, sr.sponsor[sr.sponsor.length - 1] + (Math.random() - 0.4) * 1.5));
      push(sr.content, Math.min(90, sr.content[sr.content.length - 1] + (Math.random() - 0.4) * 1.6));
      const done = s.decisions.filter((d) => d.status !== 'in-flight').slice(0, 10);
      push(sr.latency, done.length ? done.reduce((a, d) => a + d.latencyMs, 0) / done.length : 220);
      this.pending.revenue = 0;
    }

    this.state = s;
    if (!silent) this.emit();
  }

  private advanceScenario(s: SimState) {
    const sc = s.scenario;
    if (!sc.active) return;
    this.scenarioTick += 1;
    const e = this.scenarioTick;
    sc.step = Math.max(0, SCENARIO_STEP_AT.filter((t) => e >= t).length - 1);
    const p = Math.min(1, Math.max(0, (e - 14) / 8));
    const T = SCENARIO_TARGET;
    sc.results = {
      offers: Math.round(T.offers * Math.min(1, p * 2)), redemptions: Math.round(T.redemptions * p),
      transactions: Math.round(T.transactions * p), sponsorEngagement: Math.round(T.sponsorEngagement * p),
      revenue: Math.round(T.revenue * p), queueDelta: +(T.queueDelta * p).toFixed(1),
    };
    if (e === 8) {
      const d = createDecision(scenarioTemplate, wallTime(s.tick));
      s.decisions.unshift(d);
    }
    if (e === SCENARIO_STEP_AT[8]) {
      masterScenario.memories.forEach((m, i) => {
        s.memories.unshift({ id: `scn-${s.tick}-${i}`, timestamp: wallTime(s.tick), area: (['Fan', 'Venue', 'Sponsor', 'Operating'] as const)[i], source: 'SportsIQ Brain', text: m });
      });
    }
    if (e >= SCENARIO_END) { sc.active = false; sc.step = 9; s.game.paused = false; }
  }
}

export const engine = new SimulationEngine();
export const useSimulation = () => useSyncExternalStore(engine.subscribe, engine.getState);
