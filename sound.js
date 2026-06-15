/* Web Audio tabanlı ses motoru — doküman 7 (Ses ve Müzik) yaklaşımına uygun
   sentetik efektler. Gerçek orkestral kayıt yerine tarayıcıda üretilen sesler. */
(function () {
  let ctx = null;
  let master = null;
  let musicGain = null;
  let sfxGain = null;
  let tensionNodes = null;
  let enabled = true;

  function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
    musicGain = ctx.createGain(); musicGain.gain.value = 0.32; musicGain.connect(master);
    sfxGain = ctx.createGain(); sfxGain.gain.value = 0.6; sfxGain.connect(master);
  }
  function resume() { ensure(); if (ctx.state === 'suspended') ctx.resume(); }

  function tone(freq, t0, dur, type, gainTarget, peak) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak || 0.5, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(gainTarget || sfxGain);
    o.start(t0); o.stop(t0 + dur + 0.02);
    return o;
  }

  const SFX = {
    click() { if (!enabled) return; resume(); const t = ctx.currentTime; tone(420, t, 0.06, 'square', sfxGain, 0.18); },
    hover() { if (!enabled) return; resume(); const t = ctx.currentTime; tone(660, t, 0.04, 'sine', sfxGain, 0.08); },
    select() { if (!enabled) return; resume(); const t = ctx.currentTime; tone(330, t, 0.12, 'triangle', sfxGain, 0.3); tone(495, t + 0.04, 0.16, 'sine', sfxGain, 0.2); },
    lockIn() {
      if (!enabled) return; resume(); const t = ctx.currentTime;
      tone(180, t, 0.5, 'sawtooth', sfxGain, 0.18);
      tone(90, t, 0.7, 'sine', sfxGain, 0.3);
    },
    correct() {
      if (!enabled) return; resume(); const t = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.09, 0.5, 'triangle', sfxGain, 0.4));
    },
    wrong() {
      if (!enabled) return; resume(); const t = ctx.currentTime;
      tone(200, t, 0.5, 'sawtooth', sfxGain, 0.35);
      tone(150, t + 0.06, 0.55, 'square', sfxGain, 0.3);
      tone(98, t + 0.12, 0.6, 'sine', sfxGain, 0.35);
    },
    joker() {
      if (!enabled) return; resume(); const t = ctx.currentTime;
      tone(660, t, 0.1, 'square', sfxGain, 0.22); tone(880, t + 0.08, 0.12, 'sine', sfxGain, 0.2); tone(1175, t + 0.16, 0.16, 'triangle', sfxGain, 0.18);
    },
    safe() {
      if (!enabled) return; resume(); const t = ctx.currentTime;
      [392, 523.25, 659.25].forEach((f, i) => tone(f, t + i * 0.12, 0.6, 'triangle', sfxGain, 0.4));
    },
    tick() { if (!enabled) return; resume(); const t = ctx.currentTime; tone(1200, t, 0.04, 'square', sfxGain, 0.12); },
    millionaire() {
      if (!enabled) return; resume(); const t = ctx.currentTime;
      const seq = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98, 2093];
      seq.forEach((f, i) => { tone(f, t + i * 0.13, 0.8, 'triangle', sfxGain, 0.4); tone(f / 2, t + i * 0.13, 0.8, 'sine', sfxGain, 0.25); });
    },
    whoosh() { if (!enabled) return; resume(); const t = ctx.currentTime; const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = 'sawtooth'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(800, t + 0.25); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.14, t + 0.06); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3); o.connect(g); g.connect(sfxGain); o.start(t); o.stop(t + 0.32); }
  };

  // Soru fonu: hafif gerilim nabzı (loop)
  function startTension(level) {
    if (!enabled) return; resume();
    stopTension();
    const t = ctx.currentTime;
    const base = level === 'zor' ? 55 : level === 'orta' ? 49 : 44;
    const drone = ctx.createOscillator(); const dg = ctx.createGain();
    drone.type = 'sine'; drone.frequency.value = base;
    dg.gain.value = 0.0; drone.connect(dg); dg.connect(musicGain);
    dg.gain.linearRampToValueAtTime(0.5, t + 1.2);
    drone.start();
    // nabız
    const pulseGain = ctx.createGain(); pulseGain.gain.value = 0; pulseGain.connect(musicGain);
    const pulseOsc = ctx.createOscillator(); pulseOsc.type = 'triangle'; pulseOsc.frequency.value = base * 2; pulseOsc.connect(pulseGain); pulseOsc.start();
    const lfo = ctx.createOscillator(); const lfoGain = ctx.createGain();
    const rate = level === 'zor' ? 1.1 : level === 'orta' ? 0.8 : 0.6;
    lfo.frequency.value = rate; lfoGain.gain.value = 0.16; lfo.connect(lfoGain); lfoGain.connect(pulseGain.gain); lfo.start();
    tensionNodes = { drone, dg, pulseOsc, pulseGain, lfo };
  }
  function stopTension() {
    if (!tensionNodes) return;
    const t = ctx.currentTime;
    try {
      tensionNodes.dg.gain.cancelScheduledValues(t);
      tensionNodes.dg.gain.linearRampToValueAtTime(0.0001, t + 0.3);
      tensionNodes.pulseGain.gain.linearRampToValueAtTime(0.0001, t + 0.3);
      const nodes = tensionNodes;
      setTimeout(() => { try { nodes.drone.stop(); nodes.pulseOsc.stop(); nodes.lfo.stop(); } catch (e) {} }, 400);
    } catch (e) {}
    tensionNodes = null;
  }

  window.Sound = {
    sfx: SFX,
    startTension, stopTension,
    setEnabled(v) { enabled = v; if (!v) stopTension(); },
    isEnabled() { return enabled; },
    resume
  };
})();
