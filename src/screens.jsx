/* global React, MascotStage, MoneyLadder, fmt */
const { useState: useStateS } = React;

/* ============ İSİM GİRİŞİ (başta) ============ */
function NameScreen({ initial, onSubmit }) {
  const [val, setVal] = useStateS(initial || '');
  const ok = val.trim().length >= 2;
  function submit() { if (ok) { window.Sound.sfx.lockIn(); onSubmit(val.trim()); } }
  return (
    <div className="screen welcome">
      <div className="brand-star logo-star">★</div>
      <div className="brand-kicker">Fen Bilimleri Milyoner</div>
      <h1 className="name-title">Hoş geldin!</h1>
      <p className="name-sub">Yarışmaya başlamadan önce adını yazalım — sıralamada ve ekranlarda seni böyle göreceğiz.</p>
      <div className="name-field">
        <input className="name-input" type="text" maxLength={16} autoFocus
          placeholder="Adını yaz…" value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit(); }} />
      </div>
      <button className={`btn btn-gold play-btn ${ok ? '' : 'disabled-soft'}`} style={{ marginTop: 18 }}
        onMouseEnter={() => ok && window.Sound.sfx.hover()}
        onClick={submit} disabled={!ok}>Başlayalım ▸</button>
      <div className="welcome-mascot">
        <MascotStage mood="happy" line={ok ? `Merhaba ${val.trim()}! Hazırsan başlayalım.` : 'Ben Prof. Atom! Adın nedir?'} />
      </div>
    </div>
  );
}

/* ============ GİRİŞ / KARŞILAMA ============ */
function WelcomeScreen({ name, totalPoints, onPlay, onNav, onRename }) {
  const initial = (name || '?').trim().charAt(0).toLocaleUpperCase('tr-TR');
  return (
    <div className="screen welcome">
      <div className="topbar-profile">
        <SoundToggle />
        <div className="pill"><span className="pill-label">Toplam Para</span><span className="pill-val">{fmt(totalPoints)} ₺</span></div>
        <div className="profile-pill" onClick={onRename} title="Adı değiştir" style={{ cursor: 'pointer' }}>
          <div className="avatar">{initial}</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>Yarışmacı</div>
          </div>
        </div>
      </div>

      <div className="brand-star logo-star fade-up">★</div>
      <div className="brand-kicker fade-up" style={{ animationDelay: '.05s' }}>Fen Bilimleri</div>
      <h1 className="brand-title fade-up" style={{ animationDelay: '.1s' }}>MİLYONER<br />OYUNU</h1>
      <div className="brand-sub fade-up" style={{ animationDelay: '.16s' }}>MEB müfredatına uygun · 5–6–7. Sınıf · sınıfına göre doğru konular</div>
      <div className="brand-tags fade-up" style={{ animationDelay: '.2s' }}>
        <span className="brand-tag"><b>15</b> soru</span>
        <span className="brand-tag"><b>5</b> joker</span>
        <span className="brand-tag"><b>1.000.000 ₺</b> ödül</span>
      </div>

      <button className="btn btn-gold play-btn fade-up" style={{ animationDelay: '.26s' }}
        onMouseEnter={() => window.Sound.sfx.hover()}
        onClick={() => { window.Sound.sfx.lockIn(); onPlay(); }}>OYNA ▸</button>

      <div className="welcome-nav">
        <div className="nav-chip" onClick={() => onNav('leaderboard')}><span className="nav-ico">🏆</span> Sıralama</div>
        <div className="nav-chip" onClick={() => onNav('badges')}><span className="nav-ico">🎖️</span> Rozetler</div>
        <div className="nav-chip" onClick={() => onNav('badges')}><span className="nav-ico">⚙️</span> Ayarlar</div>
      </div>

      <div className="welcome-mascot">
        <MascotStage mood="happy" line={`Hoş geldin ${name}! Bilim dolu bir maceraya hazır mısın?`} />
      </div>
    </div>
  );
}

/* ============ SINIF SEÇİMİ ============ */
function ClassSelectScreen({ onPick, onBack }) {
  const TL = window.QUIZ.TOPIC_LIST;
  const classes = [
    { g: 5, color: 'var(--grade5)', desc: 'Hücre, sistemler, kuvvet-hareket, madde-değişim, ışık-ses, elektrik, canlılar ve yaşam ortamları' },
    { g: 6, color: 'var(--grade6)', desc: 'Üreme-gelişme, madde-ısı, ses, ışık-görme, kuvvet-hareket, elektrik enerjisi, bitki-hayvan üremesi' },
    { g: 7, color: 'var(--grade7)', desc: 'Hücre bölünmesi-kalıtım, kuvvet-enerji, karışımlar, elektrik-manyetizma, yer kabuğu, çevre, uzay' }
  ].map(c => ({ ...c, cats: TL[c.g].length, total: window.QUIZ.TOPIC_COUNTS[c.g] }));
  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>◂ Geri</button>
      <div className="section-head">
        <div className="section-kicker">Adım 1 / 2</div>
        <h2 className="section-title">Sınıf Seviyeni Seç</h2>
        <p className="section-sub">Soru havuzu seçtiğin seviyeye göre oluşturulur.</p>
      </div>
      <div className="class-grid">
        {classes.map((c, i) => (
          <div className="class-card entrance" key={c.g} style={{ animationDelay: `${i * 0.08}s`, borderColor: 'transparent' }}
            onMouseEnter={e => { window.Sound.sfx.hover(); e.currentTarget.style.borderColor = c.color; e.currentTarget.style.boxShadow = `0 22px 50px ${c.color}44`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--navy-line)'; e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => { window.Sound.sfx.select(); onPick(c.g); }}>
            <div className="cc-glow" style={{ background: `radial-gradient(circle at 50% 30%, ${c.color}, transparent 70%)` }} />
            <div className="cc-num" style={{ color: c.color }}>{c.g}</div>
            <div className="cc-grade" style={{ color: c.color }}>{c.g}. Sınıf</div>
            <div className="cc-desc">{c.desc}</div>
            <div className="cc-topics">{c.cats} ünite · {c.total} soru</div>
            <button className="btn cc-cta" style={{ background: c.color, color: '#06121f' }}>Seç ▸</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ KONU / MOD SEÇİMİ ============ */
function TopicSelectScreen({ grade, onStart, onBack }) {
  const colorByGrade = { 5: 'var(--grade5)', 6: 'var(--grade6)', 7: 'var(--grade7)' };
  const color = colorByGrade[grade];
  const topics = window.QUIZ.TOPIC_LIST[grade];
  const modes = [
    { id: 'all', ico: '🎲', title: 'Rastgele Karışık', desc: 'Tüm ünitelerden 15 soru, zorluk basamaklı klasik Milyoner turu.' }
  ];
  return (
    <div className="screen" style={{ overflowY: 'auto', height: '100%' }}>
      <button className="back-btn" onClick={onBack}>◂ Geri</button>
      <div className="section-head" style={{ paddingTop: 54 }}>
        <div className="section-kicker" style={{ color }}>{grade}. Sınıf · Adım 2 / 2</div>
        <h2 className="section-title">Nasıl Oynamak İstersin?</h2>
      </div>
      <div className="mode-row">
        {modes.map(m => (
          <div className="mode-card" key={m.id}
            onMouseEnter={() => window.Sound.sfx.hover()}
            onClick={() => { window.Sound.sfx.select(); onStart('all'); }}>
            <div className="mc-ico">{m.ico}</div>
            <div className="mc-title">{m.title}</div>
            <div className="mc-desc">{m.desc}</div>
          </div>
        ))}
      </div>
      <div className="topic-divider">— veya belirli bir üniteye odaklan —</div>
      <div className="topic-grid" style={{ paddingBottom: 50 }}>
        {topics.map((t, i) => {
          return (
            <div className="topic-card" key={t}
              onMouseEnter={() => window.Sound.sfx.hover()}
              onClick={() => { window.Sound.sfx.select(); onStart(t); }}>
              <div className="tc-no" style={{ background: `${color}22`, color, border: `1.5px solid ${color}66` }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div className="tc-name">{t}</div>
                <div className="tc-prog">Bu üniteye odaklı 15 soruluk tur</div>
              </div>
              <div className="tc-go" style={{ color }}>▸</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ OYUN SONU ============ */
function GameOverScreen({ result, onReplay, onMenu }) {
  const { won, amount, correct, wrong, jokersUsed, weakTopics, milyoner } = result;
  const stars = milyoner ? 3 : correct >= 10 ? 3 : correct >= 7 ? 2 : correct >= 4 ? 1 : 0;
  const headline = milyoner ? '★ MİLYONER! ★' : won ? 'Tebrikler!' : 'Oyun Bitti';
  const mood = milyoner ? 'cheer' : won ? 'happy' : 'sad';
  const line = milyoner ? 'İnanılmaz! Tüm soruları bildin, gerçek bir bilim şampiyonusun!'
    : won ? `Harikaydın! ${fmt(amount)} ₺ para kazandın.`
    : 'Üzülme, her yanlış yeni bir şey öğretir. Tekrar deneyelim!';
  return (
    <div className="screen over-wrap">
      <div style={{ position: 'absolute', left: 70, bottom: 50 }}><MascotStage mood={mood} line={line} /></div>
      <h1 className="over-headline" style={{ color: milyoner ? 'var(--gold-2)' : won ? 'var(--green)' : 'var(--ink)' }}>{headline}</h1>
      <div className="over-sub">Kazanılan Para</div>
      <div className="over-amount">{fmt(amount)} ₺</div>
      <div className="stars">
        {[0, 1, 2].map(i => <span key={i} className={`star ${i < stars ? 'on' : ''}`} style={{ animationDelay: `${i * 0.2}s` }}>★</span>)}
      </div>
      <div className="over-stats">
        <div className="stat-card"><div className="sc-val" style={{ color: 'var(--green)' }}>{correct}</div><div className="sc-label">Doğru</div></div>
        <div className="stat-card"><div className="sc-val" style={{ color: 'var(--red)' }}>{wrong}</div><div className="sc-label">Yanlış</div></div>
        <div className="stat-card"><div className="sc-val" style={{ color: 'var(--gold-2)' }}>{jokersUsed}</div><div className="sc-label">Joker</div></div>
      </div>
      {weakTopics.length > 0 && (
        <div className="weak-box">
          <div className="wb-title">📚 Çalışman önerilen konular</div>
          {weakTopics.map(t => <span className="weak-chip" key={t}>{t}</span>)}
        </div>
      )}
      <div className="over-actions">
        <button className="btn btn-ghost" style={{ padding: '16px 38px', fontSize: 18 }} onClick={onMenu}>Ana Menü</button>
        <button className="btn btn-gold" style={{ padding: '16px 44px', fontSize: 18 }} onClick={() => { window.Sound.sfx.lockIn(); onReplay(); }}>Tekrar Oyna ▸</button>
      </div>
    </div>
  );
}

/* ============ SIRALAMA ============ */
function LeaderboardScreen({ name, myScore, onBack }) {
  const [tab, setTab] = useStateS('weekly');
  const base = [
    { name: 'Zeynep K.', score: 248000, av: 'Z', c: 'var(--purple)' },
    { name: 'Arda T.', score: 192000, av: 'A', c: 'var(--turquoise)' },
    { name: 'Elif S.', score: 164000, av: 'E', c: 'var(--orange)' },
    { name: 'Mehmet Y.', score: 96000, av: 'M', c: 'var(--turquoise)' },
    { name: 'Ece D.', score: 64000, av: 'E', c: 'var(--purple)' },
    { name: 'Kerem A.', score: 32000, av: 'K', c: 'var(--orange)' },
    { name: 'Defne B.', score: 24000, av: 'D', c: 'var(--turquoise)' }
  ];
  const mult = tab === 'weekly' ? 1 : tab === 'monthly' ? 3.4 : 9.1;
  const list = base.map(p => ({ ...p, score: Math.round(p.score * mult / 1000) * 1000 }));
  const me = { name: `Sen (${name})`, score: myScore, me: true };
  const all = [...list, me].sort((a, b) => b.score - a.score);
  const myRank = all.findIndex(p => p.me) + 1;
  const top3 = list.slice(0, 3);
  const podOrder = [1, 0, 2]; // 2nd, 1st, 3rd
  const medalC = ['#FFD166', '#C9D3E0', '#E0975A'];
  const heights = [150, 200, 120];
  return (
    <div className="screen" style={{ overflowY: 'auto', height: '100%' }}>
      <button className="back-btn" onClick={onBack}>◂ Geri</button>
      <div className="section-head">
        <div className="section-kicker">🏆 Liderlik Tablosu</div>
        <h2 className="section-title">Sıralama</h2>
      </div>
      <div className="tabs">
        {[['weekly', 'Haftalık'], ['monthly', 'Aylık'], ['all', 'Tüm Zamanlar']].map(([id, lbl]) => (
          <div key={id} className={`tab ${tab === id ? 'active' : ''}`} onClick={() => { window.Sound.sfx.click(); setTab(id); }}>{lbl}</div>
        ))}
      </div>
      <div className="podium">
        {podOrder.map((idx, k) => {
          const p = top3[idx];
          const place = idx + 1;
          return (
            <div className="pod" key={idx}>
              <div style={{ fontSize: 24 }}>{['🥇', '🥈', '🥉'][idx]}</div>
              <div className="pod-av" style={{ background: p.c, borderColor: medalC[idx] }}>{p.av}</div>
              <div className="pod-name">{p.name}</div>
              <div className="pod-score">{fmt(p.score)}</div>
              <div className="pod-base" style={{ height: heights[k], background: `linear-gradient(180deg, ${medalC[idx]}33, ${medalC[idx]}11)`, borderTop: `3px solid ${medalC[idx]}` }}>{place}</div>
            </div>
          );
        })}
      </div>
      <div className="lb-list">
        {all.map((p, i) => (
          <div className={`lb-row ${p.me ? 'me' : ''}`} key={i}>
            <span className="lb-rank">{i + 1}</span>
            <span className="lb-name">{p.name}{p.me && ' ⭐'}</span>
            <span className="lb-score">{fmt(p.score)}</span>
          </div>
        ))}
      </div>
      <div style={{ height: 40 }} />
    </div>
  );
}

/* ============ ROZETLER ============ */
function BadgesScreen({ earnedIds, onBack }) {
  const badges = [
    { id: 'firststep', ico: '👣', name: 'İlk Adım', cond: 'İlk oyununu tamamla' },
    { id: 'astro', ico: '🔭', name: 'Gök Bilimci', cond: 'Güneş, Ay, Uzay sorularını doğru bil' },
    { id: 'cell', ico: '🔬', name: 'Canlı Bilimci', cond: 'Hücre / Sistemler / Üreme sorularını bil' },
    { id: 'force', ico: '💪', name: 'Kuvvet Ustası', cond: 'Kuvvet, sürtünme ve enerji sorularını bil' },
    { id: 'light', ico: '🔦', name: 'Işık Dehası', cond: 'Işık, ayna ve mercek sorularını bil' },
    { id: 'matter', ico: '⚗️', name: 'Madde Uzmanı', cond: 'Madde, ısı ve karışım sorularını bil' },
    { id: 'elec', ico: '⚡', name: 'Elektrik Mühendisi', cond: 'Elektrik sorularını doğru bil' },
    { id: 'eco', ico: '♻️', name: 'Çevre Dostu', cond: 'Çevre ve geri dönüşüm sorularını bil' },
    { id: 'grade5', ico: '🟢', name: '5. Sınıf Şampiyonu', cond: '5. sınıfta en az 10 doğru yap' },
    { id: 'grade6', ico: '🟣', name: '6. Sınıf Şampiyonu', cond: '6. sınıfta en az 10 doğru yap' },
    { id: 'grade7', ico: '🟠', name: '7. Sınıf Şampiyonu', cond: '7. sınıfta en az 10 doğru yap' },
    { id: 'speed', ico: '💨', name: 'Bilgi Küpü', cond: 'Bir oyunda 10+ soruyu doğru bil' },
    { id: 'nojoker', ico: '🚫', name: 'Joker Yok', cond: 'Joker kullanmadan 8+ doğru yap' },
    { id: 'millionaire', ico: '👑', name: 'MİLYONER!', cond: '15 soruyu eksiksiz doğru bil' }
  ];
  return (
    <div className="screen" style={{ overflowY: 'auto', height: '100%' }}>
      <button className="back-btn" onClick={onBack}>◂ Geri</button>
      <div className="section-head">
        <div className="section-kicker">🎖️ Başarılar</div>
        <h2 className="section-title">Rozetlerin</h2>
        <p className="section-sub">{earnedIds.length} / {badges.length} rozet kazanıldı · konuları doğru bildikçe açılır</p>
      </div>
      <div className="badge-grid" style={{ paddingBottom: 50 }}>
        {badges.map(b => {
          const earned = earnedIds.indexOf(b.id) >= 0;
          return (
            <div className={`badge-card ${earned ? 'earned' : 'locked'}`} key={b.id}>
              <div className="bc-ico">{earned ? b.ico : '🔒'}</div>
              <div className="bc-name">{b.name}</div>
              <div className="bc-cond">{b.cond}</div>
              {earned && <div className="bc-tick">✓ Kazanıldı</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { NameScreen, WelcomeScreen, ClassSelectScreen, TopicSelectScreen, GameOverScreen, LeaderboardScreen, BadgesScreen });
