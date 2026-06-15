/* global React, ReactDOM, NameScreen, WelcomeScreen, ClassSelectScreen, TopicSelectScreen, GameScreen, GameOverScreen, LeaderboardScreen, BadgesScreen */
const { useState: uSt, useEffect: uEf } = React;

const LS_POINTS = 'fmo_points';
const LS_BADGES = 'fmo_badges';
const LS_NAME = 'fmo_name';

function loadPoints() { try { return parseInt(localStorage.getItem(LS_POINTS) || '0', 10) || 0; } catch (e) { return 0; } }
function loadBadges() { try { return JSON.parse(localStorage.getItem(LS_BADGES) || '[]'); } catch (e) { return []; } }
function loadName() { try { return localStorage.getItem(LS_NAME) || ''; } catch (e) { return ''; } }

function App() {
  const [name, setName] = uSt(loadName());
  const [screen, setScreen] = uSt(loadName() ? 'welcome' : 'name');
  const [grade, setGrade] = uSt(5);
  const [topic, setTopic] = uSt('all');
  const [points, setPoints] = uSt(loadPoints());
  const [badges, setBadges] = uSt(loadBadges());
  const [result, setResult] = uSt(null);

  uEf(() => { try { localStorage.setItem(LS_POINTS, String(points)); } catch (e) {} }, [points]);
  uEf(() => { try { localStorage.setItem(LS_BADGES, JSON.stringify(badges)); } catch (e) {} }, [badges]);
  uEf(() => { try { if (name) localStorage.setItem(LS_NAME, name); } catch (e) {} }, [name]);

  function saveName(n) { setName(n); setScreen('welcome'); }

  function go(s) { setScreen(s); }

  function handleEnd(res) {
    setResult(res);
    setPoints(p => p + res.amount);
    // rozet kazanımları
    const newBadges = new Set(badges);
    newBadges.add('firststep');
    if (res.milyoner) newBadges.add('millionaire');
    if (res.jokersUsed === 0 && res.correct >= 8) newBadges.add('nojoker');
    if (res.correct >= 10) newBadges.add('speed');
    // sınıf şampiyonlukları (yüksek doğru sayısıyla)
    if (res.grade === 5 && res.correct >= 10) newBadges.add('grade5');
    if (res.grade === 6 && res.correct >= 10) newBadges.add('grade6');
    if (res.grade === 7 && res.correct >= 10) newBadges.add('grade7');
    // konu temalı rozetler — doğru bilinen konulara göre
    const TOPIC_BADGES = [
      { id: 'astro', re: /(Güneş|Uzay|Tutulma|Gök)/i },
      { id: 'cell', re: /(Hücre|Üreme|Sistem|Canlılar)/i },
      { id: 'force', re: /(Kuvvet|Sürtünme|Enerji)/i },
      { id: 'light', re: /(Işığ|Işık|Mercek|Gölge|Yansıma)/i },
      { id: 'matter', re: /(Madde|Karışım|Yoğunluk|Isı|Değişim)/i },
      { id: 'elec', re: /(Elektri)/i },
      { id: 'eco', re: /(Çevre|Geri Dönüşüm)/i }
    ];
    (res.correctTopics || []).forEach(t => {
      TOPIC_BADGES.forEach(b => { if (b.re.test(t)) newBadges.add(b.id); });
    });
    setBadges(Array.from(newBadges));
    setScreen('gameOver');
  }

  let content;
  if (screen === 'name') {
    content = <NameScreen initial={name} onSubmit={saveName} />;
  } else if (screen === 'welcome') {
    content = <WelcomeScreen name={name} totalPoints={points} onPlay={() => go('classSelect')} onNav={go} onRename={() => go('name')} />;
  } else if (screen === 'classSelect') {
    content = <ClassSelectScreen onPick={g => { setGrade(g); go('topicSelect'); }} onBack={() => go('welcome')} />;
  } else if (screen === 'topicSelect') {
    content = <TopicSelectScreen grade={grade} onBack={() => go('classSelect')}
      onStart={t => { setTopic(t); go('game'); }} />;
  } else if (screen === 'game') {
    content = <GameScreen key={grade + '-' + topic + '-' + Date.now()} grade={grade} topic={topic}
      onEnd={handleEnd} onQuit={() => go('welcome')} />;
  } else if (screen === 'gameOver') {
    content = <GameOverScreen result={result} onReplay={() => go('game')} onMenu={() => go('welcome')} />;
  } else if (screen === 'leaderboard') {
    content = <LeaderboardScreen name={name} myScore={result ? result.amount : 16000} onBack={() => go('welcome')} />;
  } else if (screen === 'badges') {
    content = <BadgesScreen earnedIds={badges} onBack={() => go('welcome')} />;
  }
  return content;
}

// ---- TV ölçekleyici (1920×1080) ----
function fitStage() {
  const stage = document.getElementById('stage');
  if (!stage) return;
  const sx = window.innerWidth / 1920;
  const sy = window.innerHeight / 1080;
  const s = Math.min(sx, sy);
  stage.style.transform = `translate(-50%, -50%) scale(${s})`;
}
window.addEventListener('resize', fitStage);

// particles
function spawnParticles() {
  const host = document.querySelector('.studio-bg');
  if (!host) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const sz = Math.random() * 6 + 2;
    p.style.width = p.style.height = sz + 'px';
    p.style.left = Math.random() * 1920 + 'px';
    p.style.bottom = '-20px';
    p.style.animationDuration = (Math.random() * 14 + 10) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    host.appendChild(p);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// kayıtlı ses tercihini uygula
try { if (localStorage.getItem('fmo_sound') === '0') window.Sound.setEnabled(false); } catch (e) {}
fitStage();
spawnParticles();
