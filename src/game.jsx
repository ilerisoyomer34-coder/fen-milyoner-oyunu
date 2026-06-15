/* global React, MoneyLadder, TimerRing, JokerBar, AudiencePoll, PhoneHint, MascotStage, SoundToggle, fireConfetti, fmt */
const { useState: uS, useEffect: uE, useRef: uR } = React;

function GameScreen({ grade, topic, onEnd, onQuit }) {
  const Q = window.QUIZ;
  const S = window.Sound;
  const gradeColor = { 5: 'var(--grade5)', 6: 'var(--grade6)', 7: 'var(--grade7)' }[grade];

  const [questions] = uS(() => Q.buildRound(grade, topic));
  const [qIndex, setQIndex] = uS(0);
  const [phase, setPhase] = uS('asking');          // asking | locked | revealed
  const [picked, setPicked] = uS(null);
  const [removed, setRemoved] = uS([]);            // 50:50 ile elenen şıklar
  const [used, setUsed] = uS({});
  const [modal, setModal] = uS(null);
  const [timeLeft, setTimeLeft] = uS(Q.timeFor(0));
  const [frozen, setFrozen] = uS(false);
  const [mascot, setMascot] = uS({ mood: 'think', line: '' });
  const [shake, setShake] = uS(false);
  const [jokerCount, setJokerCount] = uS(0);
  const [timedOut, setTimedOut] = uS(false);
  const weakRef = uR(new Set());
  const strongRef = uR(new Set());
  const endedRef = uR(false);

  const q = questions[qIndex];
  const total = Q.timeFor(qIndex);
  const stepValue = Q.LADDER[qIndex];                 // bu sorunun değeri
  const banked = qIndex === 0 ? 0 : Q.LADDER[qIndex - 1]; // çekilirsen alacağın

  // Klasik Milyoner: yanlışta son garantili (güvenli) basamağa düşersin
  function safeMoney() {
    let safe = 0;
    Q.SAFE_POINTS.forEach(sp => { if (qIndex > sp) safe = Q.LADDER[sp]; });
    return safe;
  }

  // ---- yeni soruya geçişte sıfırla ----
  uE(() => {
    setPhase('asking'); setPicked(null); setRemoved([]);
    setTimeLeft(Q.timeFor(qIndex)); setFrozen(false); setTimedOut(false);
    const lvl = Q.levelFor(qIndex);
    const lines = {
      kolay: ['Kolay başlayalım — ama tek hakkın var, emin ol!', 'Isınma turu. Doğru cevaba kilitlen!', 'İlk basamaklar kolay, dikkatli oku.'],
      orta: ['Tek hakkın var, acele etme…', 'Şıkları iyi karşılaştır, sonra kilitle!', 'Emin değilsen joker kullan, riske girme.'],
      zor: ['Dikkat! Zor bölge, tek atışlık hakkın var.', 'Bu gerçek bir bilim sorusu — odaklan!', 'Garanti basamağını düşün, jokerlerini kullan.']
    }[lvl];
    setMascot({ mood: 'think', line: lines[Math.floor(Math.random() * lines.length)] });
    if (S.isEnabled()) S.startTension(lvl);
    return () => S.stopTension();
    // eslint-disable-next-line
  }, [qIndex]);

  // ---- zamanlayıcı ----
  uE(() => {
    if (phase !== 'asking' || frozen || modal) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const id = setTimeout(() => {
      setTimeLeft(t => {
        if (t <= 6 && t > 1) S.sfx.tick();
        return t - 1;
      });
    }, 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line
  }, [timeLeft, phase, frozen, modal]);

  function finish(extra) {
    if (endedRef.current) return;
    endedRef.current = true;
    S.stopTension();
    onEnd({
      won: extra.amount > 0,
      amount: extra.amount,
      grade,
      correct: qIndex + (extra.lastCorrect ? 1 : 0),
      wrong: extra.wrong ? 1 : 0,
      jokersUsed: jokerCount,
      milyoner: !!extra.milyoner,
      walked: !!extra.walked,
      weakTopics: Array.from(weakRef.current).slice(0, 3),
      correctTopics: Array.from(strongRef.current)
    });
  }

  // süre doldu = tek hak gitti -> doğru cevabı göster, garanti parayla bitir
  function handleTimeout() {
    S.stopTension();
    setTimedOut(true);
    setPicked(null);
    setPhase('revealed');
    weakRef.current.add(q.topic);
    S.sfx.wrong();
    setMascot({ mood: 'sad', line: 'Süre doldu! Tek hakkın buydu. İşte doğru cevap…' });
  }

  function pick(i) {
    if (phase !== 'asking' || removed.indexOf(i) >= 0) return;
    S.stopTension();
    setPicked(i); setPhase('locked');
    S.sfx.lockIn();
    setMascot({ mood: 'think', line: 'Son kararın bu mu? Cevabını kilitliyorum…' });
    const suspense = qIndex >= 10 ? 2100 : qIndex >= 5 ? 1600 : 1100;
    setTimeout(() => judge(i), suspense);
  }

  function judge(i) {
    const correct = i === q.answer;
    if (correct) {
      strongRef.current.add(q.topic);
      setPhase('revealed');
      S.sfx.correct();
      const last = qIndex === questions.length - 1;
      if (last) {
        setMascot({ mood: 'cheer', line: 'İNANILMAZ! Tüm soruları geçtin, MİLYONER oldun!' });
        fireConfetti({ count: 280, duration: 4500 });
        S.sfx.millionaire();
        return; // "Ödülü Al" butonuyla bitirilecek
      }
      const safe = Q.SAFE_POINTS.indexOf(qIndex) >= 0;
      if (safe) { S.sfx.safe(); fireConfetti({ count: 130 }); setMascot({ mood: 'cheer', line: `GÜVENLİ NOKTA! Artık ${fmt(stepValue)} ₺ garanti paran var.` }); }
      else { fireConfetti({ count: 90, spread: 1000 }); setMascot({ mood: 'happy', line: 'Doğru cevap! Bir basamak yukarı çıktın.' }); }
    } else {
      // YANLIŞ = tek hak gitti
      setPhase('revealed');
      weakRef.current.add(q.topic);
      setShake(true); setTimeout(() => setShake(false), 500);
      S.sfx.wrong();
      const sm = safeMoney();
      setMascot({ mood: 'sad', line: sm > 0 ? `Yanlış cevap! Ama güvenli noktan var: ${fmt(sm)} ₺ ile ayrılıyorsun.` : 'Yanlış cevap! Ne yazık ki bu turda para kazanamadın.' });
    }
  }

  function next() {
    if (qIndex < questions.length - 1) { S.sfx.whoosh(); setQIndex(i => i + 1); }
  }

  // ---- jokerler ----
  function useJoker(id) {
    if (used[id] || phase !== 'asking') return;
    setUsed(u => ({ ...u, [id]: true }));
    setJokerCount(c => c + 1);
    S.sfx.joker();
    if (id === 'fifty') {
      const wrongs = [0, 1, 2, 3].filter(x => x !== q.answer && removed.indexOf(x) < 0);
      const toRemove = Q.shuffle(wrongs).slice(0, 2);
      setRemoved(r => [...r, ...toRemove]);
      setMascot({ mood: 'think', line: 'İki yanlış şıkkı eledim. İşin kolaylaştı!' });
    } else if (id === 'audience') {
      const data = Q.audiencePoll(q.answer, Q.levelFor(qIndex), removed);
      setModal({ type: 'audience', data });
      setMascot({ mood: 'happy', line: 'Seyirciler oylarını verdi, bak bakalım!' });
    } else if (id === 'phone') {
      const hint = Q.expertHint(q, Q.levelFor(qIndex));
      setModal({ type: 'phone', hint });
      setMascot({ mood: 'think', line: 'Uzmanımıza bağlanıyoruz…' });
    } else if (id === 'freeze') {
      setFrozen(true);
      setMascot({ mood: 'happy', line: 'Süreyi dondurdum! +30 saniye kazandın.' });
      setTimeout(() => { setTimeLeft(t => t + 30); setFrozen(false); }, 1600);
    } else if (id === 'swap') {
      setMascot({ mood: 'think', line: 'Soruyu değiştiriyorum, yeni bir şans!' });
      S.sfx.whoosh();
      const pool = window.QUIZ.buildRound(grade, topic);
      const alt = pool[qIndex];
      if (alt) questions[qIndex] = { ...alt, level: Q.levelFor(qIndex) };
      setRemoved([]); setPicked(null); setPhase('asking');
      setTimeLeft(Q.timeFor(qIndex));
    }
  }

  const levelClass = `level-${Q.levelFor(qIndex)}`;
  const levelLabel = { kolay: 'KOLAY', orta: 'ORTA', zor: 'ZOR' }[Q.levelFor(qIndex)];
  const letters = ['A', 'B', 'C', 'D'];
  const isCorrect = phase === 'revealed' && picked === q.answer;
  const revealedWrong = phase === 'revealed' && !isCorrect; // yanlış veya süre doldu
  const isLast = qIndex === questions.length - 1;
  const critical = timeLeft <= Math.ceil(total * 0.28) && phase === 'asking' && !frozen;

  return (
    <div className="screen game-screen">
      <div className="game-main">
        {/* üst bar */}
        <div className="game-topbar">
          <div className="tb-left">
            <span className="one-shot" title="Bu turda tek cevap hakkın var">★ TEK HAK</span>
            <button className="btn btn-ghost walk-btn" onClick={onQuit} title="Ana menü">✕ Çık</button>
          </div>
          <div className="q-meta">
            <span className="topic-badge" style={{ background: gradeColor }}>{grade}. Sınıf · {q.topic}</span>
            <span className={`level-badge ${levelClass}`}>{levelLabel}</span>
          </div>
          <div className="tb-right">
            <SoundToggle />
            <div className="pill"><span className="pill-label">Garanti</span><span className="pill-val">{fmt(safeMoney())}</span></div>
            {phase === 'asking' && banked > 0 && (
              <button className="btn btn-gold walk-btn" onClick={() => finish({ amount: banked, walked: true })} title="Paranı al ve çekil">💰 Çekil</button>
            )}
          </div>
        </div>

        {/* merkez */}
        <div className="game-center">
          {/* SÜRE — sorunun üstünde, ortada */}
          <div className={`timer-stage ${critical ? 'crit' : ''}`}>
            <div className="q-counter">Soru <b>{qIndex + 1}</b> / 15 · <span style={{ color: 'var(--gold-2)' }}>{fmt(stepValue)} ₺</span></div>
            <TimerRing time={timeLeft} total={total} frozen={frozen} />
            <div className="timer-caption">{frozen ? 'SÜRE DONDU' : 'SANİYE'}</div>
          </div>

          <div className="q-lozenge">
            <div className="q-text">{q.text}</div>
          </div>

          <div className={`options-grid ${shake ? 'shake' : ''}`}>
            {q.options.map((opt, i) => {
              let cls = 'option';
              const isRemoved = removed.indexOf(i) >= 0;
              if (isRemoved) cls += ' removed';
              if (phase === 'asking' && !isRemoved) cls += ' clickable';
              if (phase === 'locked' && picked === i) cls += ' selected';
              if (phase === 'revealed') {
                if (i === q.answer) cls += ' correct';
                else if (picked === i) cls += ' wrong';
                cls += ' disabled';
              }
              return (
                <div className={cls} key={i}
                  onMouseEnter={() => phase === 'asking' && !isRemoved && S.sfx.hover()}
                  onClick={() => pick(i)}>
                  <div className="opt-fill" />
                  <div className="opt-border" />
                  <span className="opt-letter">{letters[i]}</span>
                  <span className="opt-text">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* açıklama + devam */}
          {phase === 'revealed' && (
            <div className="fade-up">
              <div className={`explain ${revealedWrong ? 'bad' : ''}`}>
                <span className="ex-ico">{revealedWrong ? '💡' : '✅'}</span>
                <div className="ex-body"><b>{letters[q.answer]}) {q.options[q.answer]}</b> — {q.explain}</div>
              </div>
              <div className="continue-row">
                {isCorrect && !isLast && (
                  <button className="btn btn-gold" style={{ padding: '14px 44px', fontSize: 18 }} onClick={next}>Sonraki Soru ▸</button>
                )}
                {isCorrect && isLast && (
                  <button className="btn btn-gold" style={{ padding: '16px 48px', fontSize: 20 }} onClick={() => finish({ amount: 1000000, milyoner: true, lastCorrect: true })}>👑 Ödülü Al — 1.000.000</button>
                )}
                {revealedWrong && (
                  <button className="btn btn-gold" style={{ padding: '14px 44px', fontSize: 18 }} onClick={() => finish({ amount: safeMoney(), wrong: true })}>Sonucu Gör ▸</button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* maskot */}
        <div className="game-mascot-wrap">
          <MascotStage mood={mascot.mood} line={mascot.line} compact />
        </div>
      </div>

      {/* sağ panel: jokerler + merdiven */}
      <div className="game-side">
        <div className="side-head">Jokerler</div>
        <JokerBar used={used} disabled={phase !== 'asking'} onUse={useJoker} />
        <div className="side-head" style={{ marginTop: 6 }}>Ödül Basamakları</div>
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: 4 }} className="ladder-scroll">
          <MoneyLadder current={qIndex} />
        </div>
      </div>

      {modal && modal.type === 'audience' && <AudiencePoll data={modal.data} onClose={() => setModal(null)} />}
      {modal && modal.type === 'phone' && <PhoneHint hint={modal.hint} onClose={() => setModal(null)} />}
    </div>
  );
}

window.GameScreen = GameScreen;
