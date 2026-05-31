/* =====================================================
   APOLOGY WEBSITE — script.js
   ===================================================== */

// ─── DATA ─────────────────────────────────────────────
const LOVE_CARDS = [
  "The way you smile can improve even my worst day.",
  "You somehow make ordinary moments feel special.",
  "You are my favorite notification.",
  "The flawless grace you bring to your Bharatanatyam performance",
  "You are cute without even trying.",
  "I still get happy when I see your name pop up.",
  "Your stubbornness is secretly adorable.",
  "You make life brighter.",
  "I love the little things you don't even notice about yourself.",
  "You're the best thing that happened to me."
];

const APOLOGY_CARDS = [
  { num: 1, text: "I hurt your feelings.\nWhether I intended to or not,\nthe hurt was real.\nI'm sorry." },
  { num: 2, text: "I didn't always make you feel as important as you are.\nYou deserved better." },
  { num: 3, text: "I know some of my choices caused pain.\nI'm genuinely sorry." },
  { num: 4, text: "If I could undo the moments that hurt you,\nI would." },
  { num: 5, text: "I never wanted to be the reason for your tears." }
];

const MEMORIES = [
  { emoji: "🌸", label: "The Beginning ❤️" },
  { emoji: "💬", label: "Our First Long Conversation" },
  { emoji: "☀️", label: "One Of My Favorite Days" },
  { emoji: "🎶", label: "A Memory I Keep Replaying" },
  { emoji: "🌙", label: "Late Night Talks" },
  { emoji: "🍃", label: "A Quiet Moment Together" },
  { emoji: "✨", label: "When Everything Felt Perfect" },
  { emoji: "💌", label: "The Message That Made Me Smile" }
];

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💓", "💞", "🌸", "💝"];

// ─── STATE ─────────────────────────────────────────────
let currentSection = "intro";
let scannerDone = false;
let envelopeOpen = false;
let meterMaxReached = false;
let confettiInterval = null;

// ─── SECTION NAVIGATION ────────────────────────────────
function goToSection(id) {
  const current = document.getElementById(currentSection);
  const next = document.getElementById(id);
  if (!next) return;

  // Transition overlay
  const overlay = document.getElementById("page-transition");
  overlay.style.opacity = "1";
  overlay.style.transition = "opacity 0.3s ease";
  overlay.innerHTML = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

  setTimeout(() => {
    current.style.display = "none";
    current.classList.remove("active");

    next.style.display = "flex";
    next.classList.add("active");
    currentSection = id;

    window.scrollTo(0, 0);

    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.4s ease 0.15s";

    // Section-specific init
    if (id === "scanner" && !scannerDone)   initScanner();
    if (id === "love-cards")                initLoveCards();
    if (id === "apology-cards")             initApologyCards();
    if (id === "memory-wall")               initMemoryWall();
    if (id === "final")                     initFinal();

    // Trigger reveals
    setTimeout(triggerReveals, 300);
  }, 350);
}

// ─── REVEAL OBSERVER ───────────────────────────────────
function triggerReveals() {
  document.querySelectorAll("#" + currentSection + " .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 150);
  });
}

// ─── GLOBAL FLOATING HEARTS ────────────────────────────
function initGlobalHearts() {
  const container = document.getElementById("global-hearts");
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (0.7 + Math.random() * 1) + "rem";
    heart.style.animationDuration = (5 + Math.random() * 6) + "s";
    heart.style.animationDelay = (Math.random() * 6) + "s";
    container.appendChild(heart);
  }
}

// ─── SECTION 1: INTRO ──────────────────────────────────
function initIntro() {
  // Sparkles
  const sparkleContainer = document.getElementById("intro-sparkles");
  for (let i = 0; i < 24; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 2 + "s";
    s.style.animationDuration = (1.5 + Math.random() * 1.5) + "s";
    s.style.width = s.style.height = (4 + Math.random() * 6) + "px";
    sparkleContainer.appendChild(s);
  }

  // Floating hearts in intro
  const heartContainer = document.getElementById("intro-hearts");
  const hearts = ["💖", "💕", "🌸", "💗", "✨", "💝", "💓"];
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("div");
    h.className = "fh-heart";
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 90 + "%";
    h.style.top = Math.random() * 90 + "%";
    h.style.fontSize = (0.9 + Math.random() * 1.2) + "rem";
    h.style.animationDuration = (3 + Math.random() * 3) + "s";
    h.style.animationDelay = Math.random() * 3 + "s";
    heartContainer.appendChild(h);
  }
}

// Heart explosion on intro button click
document.getElementById("intro-btn").addEventListener("click", function(e) {
  burstHearts(e.clientX, e.clientY, 20);
});

function burstHearts(x, y, count) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.style.cssText = `
      position: fixed;
      left: ${x}px; top: ${y}px;
      font-size: ${0.8 + Math.random() * 1.2}rem;
      pointer-events: none;
      z-index: 9998;
      animation: burstHeart 1s ease forwards;
      --dx: ${(Math.random() - 0.5) * 200}px;
      --dy: ${(Math.random() - 1.5) * 150}px;
    `;
    h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1200);
  }
}

// Add burst keyframe dynamically
const burstStyle = document.createElement("style");
burstStyle.textContent = `
  @keyframes burstHeart {
    0%   { transform: translate(0,0) scale(0.5); opacity:1; }
    100% { transform: translate(var(--dx), var(--dy)) scale(1.4); opacity:0; }
  }
`;
document.head.appendChild(burstStyle);

// ─── SECTION 2: SCANNER ────────────────────────────────
const SCAN_STEPS = [
  { val: 20,  label: "🔍 Scanning smile level..." },
  { val: 45,  label: "💕 Detecting adorableness..." },
  { val: 70,  label: "✨ Measuring sparkle quotient..." },
  { val: 95,  label: "💖 Calculating heart impact..." },
  { val: 120, label: "⚠️ WARNING: Limits exceeded!" }
];

function initScanner() {
  const bar    = document.getElementById("scan-bar");
  const pct    = document.getElementById("scan-percent");
  const detail = document.getElementById("scan-details");
  const error  = document.getElementById("scan-error");
  const btn    = document.getElementById("scanner-btn");
  const screen = document.getElementById("scanner-screen");

  let step = 0;

  function runStep() {
    if (step >= SCAN_STEPS.length) return;
    const s = SCAN_STEPS[step];
    const displayPct = Math.min(s.val, 100);
    bar.style.width = displayPct + "%";
    pct.textContent = s.val + "%";
    detail.innerHTML = `<p>${s.label}</p>`;

    if (s.val >= 120) {
      setTimeout(() => {
        error.classList.remove("hidden");
        detail.classList.add("hidden");
        screen.classList.add("scanner-error-active");
        spawnScannerParticles();
        fireConfetti(40);
        // Shake screen
        screen.style.animation = "shakeIt 0.5s ease both";
        setTimeout(() => { screen.style.animation = ""; }, 600);
        setTimeout(() => {
          btn.classList.remove("hidden");
          scannerDone = true;
        }, 800);
      }, 300);
      return;
    }

    step++;
    setTimeout(runStep, 700);
  }

  setTimeout(runStep, 600);
}

function spawnScannerParticles() {
  const container = document.getElementById("scanner-particles");
  const colors = ["#f472b6", "#fb7185", "#e9d5ff", "#fbb6ce", "#fce7f3", "#fff"];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "s-particle";
    const size = 6 + Math.random() * 10;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${20 + Math.random() * 60}%;
      top: ${20 + Math.random() * 60}%;
      animation-duration: ${0.6 + Math.random() * 0.8}s;
      animation-delay: ${Math.random() * 0.3}s;
      --tx: ${(Math.random() - 0.5) * 200}px;
      --ty: ${(Math.random() - 1) * 150}px;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

// ─── SECTION 3: LOVE CARDS ─────────────────────────────
function initLoveCards() {
  const grid = document.getElementById("love-cards-grid");
  if (grid.children.length > 0) return;

  LOVE_CARDS.forEach((msg, i) => {
    const wrap = document.createElement("div");
    wrap.className = "card-wrap";
    wrap.style.animationDelay = (i * 0.07) + "s";
    wrap.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <div class="card-icon">💌</div>
          <div class="card-tap">Tap To Reveal</div>
        </div>
        <div class="card-face card-back">${msg}</div>
      </div>
    `;
    wrap.addEventListener("click", () => {
      wrap.classList.toggle("flipped");
      if (wrap.classList.contains("flipped")) {
        burstHearts(
          wrap.getBoundingClientRect().left + wrap.offsetWidth / 2,
          wrap.getBoundingClientRect().top + wrap.offsetHeight / 2,
          6
        );
      }
    });
    grid.appendChild(wrap);
  });

  setTimeout(triggerReveals, 200);
}

// ─── SECTION 4: APOLOGY CARDS ──────────────────────────
function initApologyCards() {
  const grid = document.getElementById("apology-cards-grid");
  if (grid.children.length > 0) return;

  APOLOGY_CARDS.forEach((card, i) => {
    const wrap = document.createElement("div");
    wrap.className = "card-wrap";
    wrap.style.animationDelay = (i * 0.1) + "s";
    const textHtml = card.text.split("\n").map(l => `<span>${l}</span>`).join("<br>");
    wrap.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front" style="background:linear-gradient(135deg,#be185d,#e8527a)">
          <div class="card-icon">💔</div>
          <div class="card-tap">Mistake #${card.num}</div>
        </div>
        <div class="card-face card-back" style="background:rgba(255,240,246,0.95)">
          ${textHtml}
        </div>
      </div>
    `;
    wrap.addEventListener("click", () => wrap.classList.toggle("flipped"));
    grid.appendChild(wrap);
  });
}

// ─── SECTION 5: LOVE METER ─────────────────────────────
function initMeter() {
  const slider = document.getElementById("love-slider");
  const valueEl = document.getElementById("meter-value");
  const emojiEl = document.getElementById("meter-emoji");
  const hintEl = document.getElementById("meter-hint");
  const errorEl = document.getElementById("meter-error");
  const heartsEl = document.getElementById("meter-hearts");

  const emojis = ["🤍", "💙", "💛", "🧡", "❤️", "💕", "💖", "💗", "💝", "💞", "💖"];

  slider.addEventListener("input", () => {
    const val = parseInt(slider.value);
    const idx = Math.floor(val / 10);
    emojiEl.textContent = emojis[Math.min(idx, emojis.length - 1)];
    valueEl.textContent = val + "%";

    if (val < 50) hintEl.textContent = "Keep going...";
    else if (val < 80) hintEl.textContent = "Getting warmer... 💕";
    else if (val < 100) hintEl.textContent = "Almost there! 💖";

    if (val === 100 && !meterMaxReached) {
      meterMaxReached = true;
      triggerMeterOverflow();
    }
  });

  function triggerMeterOverflow() {
    slider.disabled = true;

    // Animate to 9999%
    let count = 100;
    const overshoot = setInterval(() => {
      count += Math.floor(Math.random() * 500 + 200);
      if (count >= 9999) {
        count = 9999;
        clearInterval(overshoot);
      }
      valueEl.textContent = count + "%";
      emojiEl.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    }, 80);

    setTimeout(() => {
      errorEl.classList.remove("hidden");
      hintEl.classList.add("hidden");
      fireConfetti(60);
      spawnMeterHearts();
    }, 800);
  }

  function spawnMeterHearts() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const h = document.createElement("div");
        h.className = "meter-heart";
        h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
        h.style.left = Math.random() * 90 + "%";
        heartsEl.appendChild(h);
        setTimeout(() => h.remove(), 2200);
      }, i * 100);
    }
  }
}

// ─── SECTION 6: MEMORY WALL ────────────────────────────
function initMemoryWall() {
  const wall = document.getElementById("polaroid-wall");
  if (wall.children.length > 0) return;

  MEMORIES.forEach((mem, i) => {
    const p = document.createElement("div");
    p.className = "polaroid";
    p.style.animationDelay = (i * 0.12) + "s";
    p.innerHTML = `
      <div class="polaroid-img">${mem.emoji}</div>
      <div class="polaroid-label">${mem.label}</div>
    `;
    wall.appendChild(p);
  });
}

// ─── SECTION 7: ENVELOPE ───────────────────────────────
function openEnvelope() {
  if (envelopeOpen) return;
  envelopeOpen = true;

  const env = document.getElementById("envelope");
  const hint = document.getElementById("env-hint");
  const nav  = document.getElementById("envelope-nav");

  env.classList.add("opened");
  hint.style.display = "none";

  // Sparkle burst
  const container = document.getElementById("envelope-particles");
  spawnSparkles(container);
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 15);
  fireConfetti(50);

  setTimeout(() => {
    nav.style.display = "flex";
    setTimeout(triggerReveals, 100);
  }, 1400);
}

function spawnSparkles(container) {
  const colors = ["#f472b6", "#fb7185", "#e9d5ff", "#fce7f3", "#fff"];
  for (let i = 0; i < 30; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.cssText = `
      position: absolute;
      left: ${30 + Math.random() * 40}%;
      top: ${30 + Math.random() * 40}%;
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      animation: sparklePulse ${0.5 + Math.random() * 0.8}s ease forwards;
    `;
    container.appendChild(s);
    setTimeout(() => s.remove(), 1500);
  }
}

// ─── SECTION 8: FINAL ──────────────────────────────────
function initFinal() {
  fireConfetti(80);
  setTimeout(() => fireConfetti(80), 1500);
  setTimeout(() => fireConfetti(60), 3000);
}

// ─── CONFETTI ──────────────────────────────────────────
function fireConfetti(count) {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#f472b6", "#fb7185", "#fbb6ce", "#e9d5ff", "#c4b5fd", "#fce7f3", "#ff6b9d", "#fff"];
  const pieces = [];

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      w: 6 + Math.random() * 10,
      h: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      opacity: 1
    });
  }

  let frame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      if (p.opacity <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      if (p.y > canvas.height * 0.7) p.opacity -= 0.02;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (alive) frame = requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  cancelAnimationFrame(frame);
  animate();
}

// ─── PAGE TRANSITION OVERLAY ───────────────────────────
function createOverlay() {
  const div = document.createElement("div");
  div.id = "page-transition";
  div.style.cssText = `
    position: fixed; inset: 0;
    background: var(--pink-mid);
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 4rem;
  `;
  document.body.appendChild(div);
}

// ─── INIT ──────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  createOverlay();
  initGlobalHearts();
  initIntro();
  initMeter();
  triggerReveals();
});

// Handle resize for confetti canvas
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
