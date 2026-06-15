/* global React */
const { useState, useEffect, useRef } = React;
const fmt = (n) => window.QUIZ.format(n);

/* =========================================================
   MASKOT — "Profesör Atom" bilim sunucusu
   ========================================================= */
function Mascot({ mood = 'idle', size = 200 }) {
  // mood: idle | happy | sad | think | cheer
  const eyeY = mood === 'happy' || mood === 'cheer' ? 0 : 0;
  const browAngle = mood === 'think' ? -8 : mood === 'sad' ? 10 : 0;
  const mouth = {
    idle: 'M 78 128 Q 100 140 122 128',
    happy: 'M 74 126 Q 100 150 126 126',
    cheer: 'M 74 124 Q 100 156 126 124',
    sad: 'M 76 138 Q 100 122 124 138',
    think: 'M 84 132 Q 100 130 116 134'
  }[mood] || 'M 78 128 Q 100 140 122 128';

  return (
    <svg width={size} height={size} viewBox="0 0 200 210" className={`mascot mood-${mood}`}>
      <defs>
        <radialGradient id="headG" cx="42%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#1c4f7d" />
          <stop offset="100%" stopColor="#0c2c4d" />
        </radialGradient>
        <linearGradient id="coatG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f8ff" />
          <stop offset="100%" stopColor="#cdd9ec" />
        </linearGradient>
        <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(245,166,35,.5)" />
          <stop offset="100%" stopColor="rgba(245,166,35,0)" />
        </radialGradient>
      </defs>

      {/* aura */}
      <circle cx="100" cy="95" r="92" fill="url(#glowG)" className="m-aura" />

      {/* elektron yörüngeleri */}
      <g className="m-orbits" stroke="#00B5AD" strokeWidth="2" fill="none" opacity="0.7">
        <ellipse cx="100" cy="88" rx="86" ry="34" transform="rotate(28 100 88)" />
        <ellipse cx="100" cy="88" rx="86" ry="34" transform="rotate(-28 100 88)" />
      </g>
      <circle className="m-electron e1" r="5" fill="#FFD166" />
      <circle className="m-electron e2" r="5" fill="#F5A623" />

      {/* lab coat shoulders */}
      <path d="M 50 205 Q 55 158 100 150 Q 145 158 150 205 Z" fill="url(#coatG)" stroke="#aebfd6" strokeWidth="1.5" />
      <path d="M 100 150 L 90 178 L 100 188 L 110 178 Z" fill="#00B5AD" />
      {/* head */}
      <circle cx="100" cy="92" r="56" fill="url(#headG)" stroke="#2a6da8" strokeWidth="2.5" />
      {/* glasses */}
      <g stroke="#FFD166" strokeWidth="3" fill="rgba(0,181,173,.18)">
        <circle cx="80" cy="96" r="17" />
        <circle cx="120" cy="96" r="17" />
        <line x1="97" y1="96" x2="103" y2="96" />
      </g>
      {/* eyes */}
      <circle cx="80" cy={96 + eyeY} r="6" fill="#EAF2FF" className="m-eye" />
      <circle cx="120" cy={96 + eyeY} r="6" fill="#EAF2FF" className="m-eye" />
      {/* brows */}
      <line x1="68" y1="74" x2="92" y2={76} stroke="#EAF2FF" strokeWidth="3" strokeLinecap="round" transform={`rotate(${browAngle} 80 75)`} />
      <line x1="108" y1={76} x2="132" y2="74" stroke="#EAF2FF" strokeWidth="3" strokeLinecap="round" transform={`rotate(${-browAngle} 120 75)`} />
      {/* mouth */}
      <path d={mouth} stroke="#EAF2FF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* little atom badge */}
      <circle cx="100" cy="168" r="7" fill="#0A1628" stroke="#F5A623" strokeWidth="2" />
      <text x="100" y="172" textAnchor="middle" fontSize="9" fill="#F5A623" fontFamily="Orbitron" fontWeight="800">e</text>
    </svg>
  );
}

function MascotStage({ mood, line, compact }) {
  return (
    <div className={`mascot-stage ${compact ? 'compact' : ''}`}>
      {line && (
        <div className="speech entrance" key={line}>
          <span>{line}</span>
        </div>
      )}
      <Mascot mood={mood} size={compact ? 138 : 188} />
      <div className="mascot-name">Prof. Atom</div>
    </div>
  );
}

/* =========================================================
   PARA MERDİVENİ
   ========================================================= */
function MoneyLadder({ current }) {
  const { LADDER, SAFE_POINTS } = window.QUIZ;
  return (
    <div className="ladder">
      {LADDER.map((amt, i) => {
        const isSafe = SAFE_POINTS.indexOf(i) >= 0;
        const isMillion = i === LADDER.length - 1;
        let cls = 'rung';
        if (i === current) cls += ' current';
        else if (i < current) cls += ' passed';
        if (isSafe) cls += ' safe';
        if (isMillion) cls += ' million';
        return (
          <div className={cls} key={i}>
            <span className="rung-no num">{i + 1}</span>
            <span className="rung-amt">{isMillion ? '★ ' : ''}{fmt(amt)}</span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   CAN + ZAMANLAYICI HALKASI
   ========================================================= */
function Lives({ count, max = 3 }) {
  return (
    <div className="lives" title={`${count} can`}>
      {Array.from({ length: max }).map((_, i) => (
        <span className={`heart ${i >= count ? 'lost' : ''}`} key={i}>{i >= count ? '🤍' : '❤️'}</span>
      ))}
    </div>
  );
}

function TimerRing({ time, total, frozen }) {
  const r = 38, c = 2 * Math.PI * r;
  const pct = Math.max(0, time / total);
  const critical = time <= Math.ceil(total * 0.28);
  const color = frozen ? '#00B5AD' : critical ? '#E74C3C' : '#F5A623';
  return (
    <div className={`timer-ring ${critical && !frozen ? 'crit' : ''} ${frozen ? 'frozen' : ''}`}>
      <svg width="92" height="92" viewBox="0 0 92 92">
        <circle cx="46" cy="46" r={r} stroke="rgba(255,255,255,.1)" strokeWidth="7" fill="rgba(10,22,40,.6)" />
        <circle cx="46" cy="46" r={r} stroke={color} strokeWidth="7" fill="none"
          strokeLinecap="round" strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)} transform="rotate(-90 46 46)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke .3s' }} />
      </svg>
      <div className="timer-num num" style={{ color }}>{frozen ? '❄' : time}</div>
    </div>
  );
}

/* =========================================================
   JOKER BARI
   ========================================================= */
const JOKERS = [
  { id: 'fifty', icon: '50:50', label: 'Yarı Yarı' },
  { id: 'audience', icon: '👥', label: 'Seyirci' },
  { id: 'phone', icon: '📞', label: 'Telefon' },
  { id: 'freeze', icon: '❄', label: 'Süre Dondur' },
  { id: 'swap', icon: '🔄', label: 'Şık Değiştir' }
];

function JokerBar({ used, disabled, onUse }) {
  return (
    <div className="joker-bar">
      {JOKERS.map(j => (
        <button
          key={j.id}
          className={`joker ${used[j.id] ? 'used' : ''}`}
          disabled={used[j.id] || disabled}
          onMouseEnter={() => !used[j.id] && window.Sound.sfx.hover()}
          onClick={() => onUse(j.id)}
          title={j.label}
        >
          <span className="j-icon">{j.icon}</span>
          <span className="j-label">{j.label}</span>
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   SEYİRCİYE SOR — çubuk grafik modalı
   ========================================================= */
function AudiencePoll({ data, onClose }) {
  const [grown, setGrown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGrown(true), 60); return () => clearTimeout(t); }, []);
  const letters = ['A', 'B', 'C', 'D'];
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" style={{ width: 560 }} onClick={e => e.stopPropagation()}>
        <div className="modal-title">👥 Seyirci Oylaması</div>
        <div className="poll-grid">
          {data.map((pct, i) => (
            <div className="poll-col" key={i}>
              <div className="poll-bar-wrap">
                <div className="poll-pct num">{pct}%</div>
                <div className="poll-bar" style={{ height: grown ? `${pct * 2.4}px` : '0px' }} />
              </div>
              <div className="poll-letter num">{letters[i]}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-gold modal-btn" onClick={onClose}>Anladım</button>
      </div>
    </div>
  );
}

/* =========================================================
   TELEFON ET — uzman ipucu modalı
   ========================================================= */
function PhoneHint({ hint, onClose }) {
  const [stage, setStage] = useState('dial');
  useEffect(() => {
    const t1 = setTimeout(() => setStage('talk'), 1500);
    return () => clearTimeout(t1);
  }, []);
  return (
    <div className="modal-veil" onClick={stage === 'talk' ? onClose : undefined}>
      <div className="modal" style={{ width: 520, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
        <div className="phone-emoji" style={{ animation: stage === 'dial' ? 'phoneRing .5s infinite' : 'none' }}>📞</div>
        {stage === 'dial' ? (
          <>
            <div className="modal-title">Uzman aranıyor…</div>
            <div className="phone-dots"><span></span><span></span><span></span></div>
            <div style={{ color: 'var(--ink-dim)', marginTop: 8 }}>30 saniye danışma hakkı</div>
          </>
        ) : (
          <>
            <div className="modal-title" style={{ color: 'var(--turquoise)' }}>{hint.name}</div>
            <p className="phone-text">“{hint.text}”</p>
            <button className="btn btn-gold modal-btn" onClick={onClose}>Teşekkürler</button>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   KONFETİ
   ========================================================= */
function fireConfetti(opts = {}) {
  const layer = document.getElementById('confetti-layer');
  if (!layer) return;
  const canvas = document.createElement('canvas');
  canvas.width = 1920; canvas.height = 1080;
  canvas.style.width = '100%'; canvas.style.height = '100%';
  layer.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const colors = ['#F5A623', '#FFD166', '#00B5AD', '#6B3FA0', '#2ECC71', '#E67E22', '#EAF2FF'];
  const n = opts.count || 160;
  const parts = Array.from({ length: n }).map(() => ({
    x: 960 + (Math.random() - 0.5) * (opts.spread || 1400),
    y: opts.fromTop ? -20 : 540 + (Math.random() - 0.5) * 200,
    vx: (Math.random() - 0.5) * 12,
    vy: opts.fromTop ? Math.random() * 6 + 2 : -(Math.random() * 18 + 8),
    g: 0.35,
    size: Math.random() * 10 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
    life: 0
  }));
  let raf;
  const dur = opts.duration || 2600;
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, 1920, 1080);
    parts.forEach(p => {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vx *= 0.99;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - elapsed / dur);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (elapsed < dur) raf = requestAnimationFrame(tick);
    else { cancelAnimationFrame(raf); layer.removeChild(canvas); }
  }
  raf = requestAnimationFrame(tick);
}

Object.assign(window, {
  Mascot, MascotStage, MoneyLadder, Lives, TimerRing,
  JokerBar, JOKERS, AudiencePoll, PhoneHint, fireConfetti, fmt, SoundToggle
});

/* =========================================================
   SES AÇ/KAPA — doküman 7: tüm sesler kapatılabilir olmalı
   ========================================================= */
function SoundToggle() {
  const [on, setOn] = useState(() => { try { return localStorage.getItem('fmo_sound') !== '0'; } catch (e) { return true; } });
  function toggle() {
    const v = !on; setOn(v);
    window.Sound.setEnabled(v);
    try { localStorage.setItem('fmo_sound', v ? '1' : '0'); } catch (e) {}
    if (v) window.Sound.sfx.click();
  }
  return (
    <button className="sound-toggle" onClick={toggle} title={on ? 'Sesi kapat' : 'Sesi aç'}>
      {on ? '🔊' : '🔇'}
    </button>
  );
}
