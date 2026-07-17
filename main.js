import './style.css';

// ═══════════════════════════════════════════════════════════════
// ALGOBEAT — Full SPA Application
// ═══════════════════════════════════════════════════════════════

// ── State ──
const state = {
  user: JSON.parse(localStorage.getItem('algobeat_user') || 'null'),
  strategies: JSON.parse(localStorage.getItem('algobeat_strategies') || '[]'),
  brokers: JSON.parse(localStorage.getItem('algobeat_brokers') || '[]'),
  backtests: JSON.parse(localStorage.getItem('algobeat_backtests') || '[]'),
  plan: localStorage.getItem('algobeat_plan') || 'free',
  wallet: parseFloat(localStorage.getItem('algobeat_wallet') || '0'),
  backtestCredits: parseInt(localStorage.getItem('algobeat_credits') || '50'),
};

function saveState() {
  localStorage.setItem('algobeat_user', JSON.stringify(state.user));
  localStorage.setItem('algobeat_strategies', JSON.stringify(state.strategies));
  localStorage.setItem('algobeat_brokers', JSON.stringify(state.brokers));
  localStorage.setItem('algobeat_backtests', JSON.stringify(state.backtests));
  localStorage.setItem('algobeat_plan', state.plan);
  localStorage.setItem('algobeat_wallet', state.wallet.toString());
  localStorage.setItem('algobeat_credits', state.backtestCredits.toString());
}

// ── Icons (inline SVG) ──
const icons = {
  logo: `<svg viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0" y1="0" x2="32" y2="32"><stop offset="0%" stop-color="#3b6cf5"/><stop offset="100%" stop-color="#7c4dff"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M8 22L14 10L18 18L22 12L24 16" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="24" cy="16" r="2" fill="#34d399"/></svg>`,
  arrow: `<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  broker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 00-8 0v2"/></svg>`,
  builder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M6 20V4M18 20v-6"/></svg>`,
  strategies: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  backtest: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
  subscription: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  eye: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
  mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  location: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,
  play: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  google: `<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`,
};

// ── Router ──
function getRoute() {
  return window.location.hash.slice(1) || '/';
}

function navigate(path) {
  window.location.hash = path;
}

function isLoggedIn() {
  return !!state.user;
}

// ── Toast System ──
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${msg}</span><button class="toast-close" onclick="this.parentElement.remove()">${icons.close}</button>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ── App Render ──
const app = document.getElementById('app');

function render() {
  const route = getRoute();
  
  // Auth-protected routes
  const dashboardRoutes = ['/dashboard', '/broker', '/builder', '/strategies', '/backtest', '/simulator', '/reports', '/subscription', '/wallet'];
  
  if (dashboardRoutes.some(r => route.startsWith(r))) {
    if (!isLoggedIn()) { navigate('/signin'); return; }
    renderDashboard(route);
  } else {
    switch (route) {
      case '/': renderLanding(); break;
      case '/signin': renderSignIn(); break;
      case '/signup': renderSignUp(); break;
      case '/about': renderAbout(); break;
      case '/features': renderFeatures(); break;
      case '/pricing': renderPricingPage(); break;
      case '/contact': renderContact(); break;
      case '/blogs': renderBlogs(); break;
      default: renderLanding();
    }
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);

// ── Navbar Scroll Effect ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══════════════════════════════════════════════════════════════
// LANDING PAGE
// ═══════════════════════════════════════════════════════════════
function renderLanding() {
  app.innerHTML = `
    ${renderNavbar()}
    ${renderTickerBar()}
    ${renderHero()}
    ${renderFeaturesSection()}
    ${renderShowcaseSection()}
    ${renderPricingSection()}
    ${renderBlogSection()}
    ${renderFAQSection()}
    ${renderFooter()}
  `;
  initLandingInteractions();
}

function renderNavbar(isPublic = true) {
  return `
  <nav class="navbar" id="navbar">
    <div class="container">
      <a href="#/" class="nav-logo">${icons.logo}<span>AlgoBeat</span></a>
      <div class="nav-links">
        <a href="#/" class="${getRoute() === '/' ? 'active' : ''}">Home</a>
        <a href="#/about" class="${getRoute() === '/about' ? 'active' : ''}">About</a>
        <a href="#/features" class="${getRoute() === '/features' ? 'active' : ''}">What's New</a>
        <a href="#/blogs" class="${getRoute() === '/blogs' ? 'active' : ''}">Blogs</a>
        <a href="#/pricing" class="${getRoute() === '/pricing' ? 'active' : ''}">Pricing</a>
      </div>
      <div class="nav-actions">
        <a href="#/contact" class="btn btn-outline">Contact ${icons.arrow}</a>
        <a href="#${isLoggedIn() ? '/dashboard' : '/signin'}" class="btn btn-primary">Get Started ${icons.arrow}</a>
      </div>
    </div>
  </nav>`;
}

function renderTickerBar() {
  const tickers = [
    { name: 'NIFTY 50', price: '24,167.85', change: '+0.42%', up: true },
    { name: 'BANK NIFTY', price: '52,438.70', change: '-0.18%', up: false },
    { name: 'SENSEX', price: '79,243.18', change: '+0.35%', up: true },
    { name: 'NIFTY IT', price: '44,312.50', change: '+1.12%', up: true },
    { name: 'RELIANCE', price: '2,948.60', change: '-0.65%', up: false },
    { name: 'TCS', price: '4,120.35', change: '+0.88%', up: true },
    { name: 'INFY', price: '1,892.40', change: '+1.45%', up: true },
    { name: 'HDFC BANK', price: '1,745.20', change: '-0.22%', up: false },
  ];
  const items = tickers.map(t => `
    <div class="ticker-item">
      <span class="ticker-name">${t.name}</span>
      <span class="ticker-price">${t.price}</span>
      <span class="ticker-change ${t.up ? 'up' : 'down'}">${t.change}</span>
    </div>
  `).join('');
  return `<div class="ticker-bar"><div class="ticker-track">${items}${items}</div></div>`;
}

function renderHero() {
  return `
  <section class="hero">
    <div class="container">
      <div class="hero-text fade-in-up">
        <div class="hero-badge"><span class="dot"></span> AlgoBeat · Aligned & Evolving</div>
        <h1>Power Up Your <span class="gradient-text">Trading.</span><br>Maximize Your <span class="gradient-text">Profits.</span></h1>
        <p class="hero-desc">Create strategies in minutes and test with confidence. Automate every trade for faster results. Capture opportunities instantly with real-time execution.</p>
        <div class="hero-actions">
          <a href="#${isLoggedIn() ? '/dashboard' : '/signin'}" class="btn btn-primary btn-lg">Let's Begin ${icons.arrow}</a>
          <a href="#/features" class="btn btn-ghost btn-lg">Find Out More ${icons.arrow}</a>
        </div>
      </div>
      <div class="hero-visual fade-in-up delay-2">
        <div class="hero-dashboard">
          <div class="dash-header">
            <h3>My Dashboard</h3>
            <div class="dash-status"><span class="dot"></span> Live</div>
          </div>
          <div class="pnl-card">
            <div class="pnl-label">Total P&L</div>
            <div class="pnl-value">₹52,764</div>
            <div class="pnl-sub">Nifty 50 ReExecute move</div>
          </div>
          <div class="dash-strategies">
            <div class="strat-mini">
              <div class="strat-mini-name">Brahmastra Nifty</div>
              <div class="strat-mini-pnl positive">+₹3,200</div>
              <div class="strat-mini-status"><span class="dot-sm live"></span> Running · Live</div>
            </div>
            <div class="strat-mini">
              <div class="strat-mini-name">Golden Crossover</div>
              <div class="strat-mini-pnl positive">+₹5,400</div>
              <div class="strat-mini-status"><span class="dot-sm live"></span> Running · Live</div>
            </div>
            <div class="strat-mini">
              <div class="strat-mini-name">1% Strangle BNF</div>
              <div class="strat-mini-pnl negative">-₹1,200</div>
              <div class="strat-mini-status"><span class="dot-sm paused"></span> Paused</div>
            </div>
            <div class="strat-mini">
              <div class="strat-mini-name">Sniper Options</div>
              <div class="strat-mini-pnl positive">+₹2,890</div>
              <div class="strat-mini-status"><span class="dot-sm live"></span> Running · Live</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderFeaturesSection() {
  const features = [
    { icon: '⚡', title: 'Strategy Templates', desc: 'Design, test, and refine trading models instantly with no-code strategy builder templates simplifying algorithm creation.' },
    { icon: '🔗', title: 'Seamless Collaboration', desc: 'Coordinate, communicate, and execute without delays. Real-time tracking and team sync across every trading strategy.' },
    { icon: '🚀', title: 'From Idea to Execution', desc: 'Turn your strategies into action — create, test, and automate every trade with intelligent backtesting and real-time deployment.' },
    { icon: '📊', title: 'Advanced Backtesting', desc: 'Test strategies against historical data with up to 2 years of market history. Get detailed P&L reports and performance metrics.' },
    { icon: '🔌', title: 'Multi-Broker Support', desc: 'Connect with Zerodha, Groww, Dhan, Fyers, Angel One, Finvasia and more. Execute trades across multiple brokers seamlessly.' },
    { icon: '🛡️', title: 'Risk Management', desc: 'Set global stop-loss, take-profit limits, and trailing stops. Control your trading outcomes with precision automation.' },
  ];
  return `
  <section class="section" style="background: var(--surface-1);">
    <div class="container section-center">
      <div class="section-label"><span class="dot"></span> Stop Switching Tools</div>
      <h2 class="section-title">Start Compounding Growth.</h2>
      <p class="section-desc">Everything you need to build, test, and deploy algorithmic trading strategies — in one powerful platform.</p>
      <div class="features-grid">
        ${features.map((f, i) => `
          <div class="feature-card fade-in-up delay-${i % 3 + 1}">
            <div class="feature-icon">${f.icon}</div>
            <h3>${f.title}</h3>
            <p>${f.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function renderShowcaseSection() {
  return `
  <section class="section">
    <div class="container">
      <div class="section-center">
        <div class="tab-bar" id="showcase-tabs">
          <button class="tab-btn active" data-tab="strategies">Strategies</button>
          <button class="tab-btn" data-tab="allinone">All-in-one Dashboard</button>
        </div>
      </div>
      <div class="tab-content active" id="tab-strategies">
        <div class="showcase-row">
          <div class="showcase-visual">
            <div style="padding:16px;">
              <div style="display:flex;gap:8px;margin-bottom:16px;">
                <span style="font-size:0.82rem;font-weight:600;color:var(--accent);border-bottom:2px solid var(--accent);padding-bottom:4px;">My Strategies</span>
                <span style="font-size:0.82rem;color:var(--ghost);padding-bottom:4px;">Deployed</span>
                <span style="font-size:0.82rem;color:var(--ghost);padding-bottom:4px;">Templates</span>
              </div>
              ${['Axis Duplicate', 'Axis Bank', 'Nifty MA Cross'].map(name => `
                <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:8px;">
                  <div style="font-weight:600;color:var(--white);font-size:0.88rem;margin-bottom:6px;">${name}</div>
                  <div style="display:flex;gap:24px;font-size:0.75rem;color:var(--ghost);">
                    <span>09:15 → 15:15</span>
                    <span>EQUITY</span>
                    <span>Indicator Based</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div>
            <h2 class="section-title">Manage Everything<br>In One Place.</h2>
            <p class="section-desc">Keep projects, data, and communication together in a single, organized workflow so decisions are faster with algo trading software.</p>
            <div class="showcase-checks">
              <div class="check-item">${icons.check} Create</div>
              <div class="check-item">${icons.check} Backtest</div>
              <div class="check-item">${icons.check} Optimize</div>
              <div class="check-item">${icons.check} Deploy</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content" id="tab-allinone">
        <div class="showcase-row reverse">
          <div>
            <div class="section-label"><span class="dot"></span> Streamline · Automation</div>
            <h2 class="section-title">Maximize Strategy Performance</h2>
            <p class="section-desc">Eliminate repetitive work with powerful automated trading software and algo trading platform features, so you can stay focused on building, testing, and scaling strategies.</p>
            <div style="margin-top:24px;">
              <a href="#${isLoggedIn() ? '/dashboard' : '/signin'}" class="btn btn-primary">Get Started ${icons.arrow}</a>
            </div>
          </div>
          <div class="showcase-visual">
            <div style="padding:16px;">
              <h3 style="font-size:1rem;font-weight:700;color:var(--white);margin-bottom:16px;">My Dashboard</h3>
              <div style="background:linear-gradient(135deg,var(--accent),var(--violet));border-radius:10px;padding:20px;margin-bottom:12px;">
                <div style="font-size:0.75rem;color:rgba(255,255,255,0.8);">Total P&L</div>
                <div style="font-family:var(--mono);font-size:1.8rem;font-weight:700;color:white;">₹52,764</div>
              </div>
              <div style="display:flex;gap:8px;">
                <div style="flex:1;background:var(--surface-3);border-radius:8px;padding:12px;">
                  <div style="font-size:0.72rem;color:var(--ghost);">Broker</div>
                  <div style="font-size:0.82rem;font-weight:600;color:var(--teal);">Connected</div>
                </div>
                <div style="flex:1;background:var(--surface-3);border-radius:8px;padding:12px;">
                  <div style="font-size:0.72rem;color:var(--ghost);">Terminal</div>
                  <div style="font-size:0.82rem;font-weight:600;color:var(--white);">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderPricingSection() {
  return `
  <section class="section" id="pricing-section" style="background: var(--surface-1);">
    <div class="container section-center">
      <div class="section-label"><span class="dot"></span> Choose Your Plan</div>
      <h2 class="section-title">Smart Options To Power Your Trading Journey.</h2>
      <div class="pricing-toggle" id="pricing-toggle">
        <button class="price-btn" data-period="monthly">Monthly</button>
        <button class="price-btn active" data-period="quarterly">Quarterly</button>
        <button class="price-btn" data-period="yearly">Yearly</button>
        <span class="badge-save">Save 20%</span>
      </div>
      <div class="pricing-grid" id="pricing-grid"></div>
    </div>
  </section>`;
}

function renderBlogSection() {
  const blogs = [
    { tag: 'Options Strategy', title: 'Spread Chart in Options Trading: Complete Guide', date: 'May 11, 2026', icon: '📊' },
    { tag: 'Platform Guide', title: 'How to Trade Using Options Chart in AlgoBeat', date: 'May 7, 2026', icon: '📈' },
    { tag: 'Options Strategy', title: 'What is an Options Chart? How to Read & Analyze', date: 'May 4, 2026', icon: '📉' },
  ];
  return `
  <section class="section">
    <div class="container section-center">
      <div class="section-label"><span class="dot"></span> Blog</div>
      <h2 class="section-title">Insights & Updates</h2>
      <p class="section-desc">Practical reads on growth, analytics, and team workflows to help you ship faster.</p>
      <div class="blog-grid">
        ${blogs.map(b => `
          <div class="blog-card" onclick="navigate('#/blogs')">
            <div class="blog-thumb"><span class="blog-thumb-icon">${b.icon}</span></div>
            <div class="blog-body">
              <div class="blog-tag">${b.tag}</div>
              <div class="blog-title">${b.title}</div>
              <div class="blog-date">${b.date}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="text-align:center;margin-top:32px;">
        <a href="#/blogs" class="btn btn-outline">Explore posts →</a>
      </div>
    </div>
  </section>`;
}

function renderFAQSection() {
  const faqs = [
    { q: 'What does this platform actually do?', a: "It's your personal trading workshop. You get to create, test, and automate your own strategies — no coding required. We provide the tools, the data, and the execution engine. You bring the ideas, the curiosity, and the strategy." },
    { q: 'Does the platform give trading advice or tips?', a: 'No. AlgoBeat is purely a technology platform. We provide tools for strategy creation, backtesting, and deployment. All trading decisions are made by you.' },
    { q: 'Who controls the results?', a: 'You do. The platform executes strategies exactly as you design them. Market conditions, strategy logic, and risk management settings all determine outcomes.' },
    { q: 'Can I run multiple strategies at the same time?', a: 'Yes! Depending on your plan, you can run up to 20 live strategies simultaneously across multiple brokers and instruments.' },
    { q: 'Is this suitable for beginners?', a: 'Absolutely. Our no-code strategy builder and pre-built templates make it easy to get started. You can also use the simulator to practice before going live.' },
  ];
  return `
  <section class="section" style="background: var(--surface-1);">
    <div class="container">
      <div class="faq-layout">
        <div>
          <div class="section-label"><span class="dot"></span> FAQs</div>
          <h2 class="section-title">Got Questions?<br>We've Got Answers.</h2>
          <p class="section-desc">Everything you need to know before you get started — quick, clear, and easy to follow.</p>
          <div class="faq-cta">
            <h4>Still curious?</h4>
            <p>Reach out and we'll guide you every step of the way.</p>
            <a href="#/contact" class="btn btn-primary">Chat with Us →</a>
          </div>
        </div>
        <div class="faq-list" id="faq-list">
          ${faqs.map((f, i) => `
            <div class="faq-item ${i === 0 ? 'open' : ''}" data-faq="${i}">
              <button class="faq-question">
                <span>${i + 1}. ${f.q}</span>
                <span class="faq-toggle">${icons.plus}</span>
              </button>
              <div class="faq-answer">
                <div class="faq-answer-inner">${f.a}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>`;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo">${icons.logo}<span>AlgoBeat</span></div>
          <p>Create, backtest, and deploy algorithmic trading strategies with zero coding. Power your trading with real-time execution.</p>
          <div class="footer-socials">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="Telegram">✈</a>
            <a href="#" aria-label="Instagram">◎</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <a href="#/features">Features</a>
          <a href="#/pricing">Pricing</a>
          <a href="#/blogs">Blog</a>
          <a href="#/about">About Us</a>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <a href="#/contact">Contact</a>
          <a href="#">Documentation</a>
          <a href="#">API Reference</a>
          <a href="#">Help Center</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Refund Policy</a>
          <a href="#">Risk Disclosure</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} AlgoBeat. All rights reserved.</span>
        <span>All charts powered by TradingView.</span>
      </div>
    </div>
  </footer>`;
}

// ── Landing Interactions ──
function initLandingInteractions() {
  // Tabs
  document.querySelectorAll('.tab-bar .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.tab-bar') || btn.parentElement;
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      const target = document.getElementById(`tab-${tabId}`);
      if (target) target.classList.add('active');
    });
  });

  // FAQ
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(fi => fi.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Pricing
  renderPricingCards('quarterly');
  document.querySelectorAll('#pricing-toggle .price-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#pricing-toggle .price-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPricingCards(btn.dataset.period);
    });
  });
}

function renderPricingCards(period) {
  const prices = {
    monthly: { free: 0, unlimited: 99, limited: 59 },
    quarterly: { free: 0, unlimited: 69, limited: 41 },
    yearly: { free: 0, unlimited: 49, limited: 29 },
  };
  const p = prices[period];
  const grid = document.getElementById('pricing-grid');
  if (!grid) return;
  grid.innerHTML = `
    <div class="price-card">
      <div class="price-name">Free Plan</div>
      <div class="price-desc">Start exploring with zero cost.</div>
      <div class="price-amount"><span class="currency">₹</span><span class="value">${p.free}</span><span class="period">/day</span></div>
      <div class="price-billing">Billed ${period}</div>
      <a href="#/signin" class="btn btn-outline price-cta">Choose Free Plan →</a>
      <div class="price-features">
        <div class="price-feature">${icons.check} Backtest credits - 50 per month</div>
        <div class="price-feature">${icons.check} Strategy creation - up to 5 strategies</div>
        <div class="price-feature">${icons.check} Max 1 broker connection</div>
      </div>
    </div>
    <div class="price-card featured">
      <span class="price-badge">Most Popular</span>
      <div class="price-name">Unlimited Plan</div>
      <div class="price-desc">Run high frequency and multiple strategies.</div>
      <div class="price-amount"><span class="currency">₹</span><span class="value">${p.unlimited}</span><span class="period">/day</span></div>
      <div class="price-billing">Billed ${period}</div>
      <a href="#/signin" class="btn btn-primary price-cta">Choose Unlimited Plan →</a>
      <div class="price-features">
        <div class="price-feature">${icons.check} Backtest credits - 1500 per month</div>
        <div class="price-feature">${icons.check} Strategy creation - up to 50 strategies</div>
        <div class="price-feature">${icons.check} Live & forward deployment - up to 20</div>
        <div class="price-feature">${icons.check} Up to 5 broker connections</div>
      </div>
    </div>
    <div class="price-card">
      <div class="price-name">Limited Plan</div>
      <div class="price-desc">Perfect for testing live deployment with limits.</div>
      <div class="price-amount"><span class="currency">₹</span><span class="value">${p.limited}</span><span class="period">/day</span></div>
      <div class="price-billing">Billed ${period}</div>
      <a href="#/signin" class="btn btn-outline price-cta">Choose Limited Plan →</a>
      <div class="price-features">
        <div class="price-feature">${icons.check} Backtest credits - 500 per month</div>
        <div class="price-feature">${icons.check} Strategy creation - up to 25 strategies</div>
        <div class="price-feature">${icons.check} Live & forward deployment - up to 5</div>
        <div class="price-feature">${icons.check} Up to 3 broker connections</div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// AUTH PAGES
// ═══════════════════════════════════════════════════════════════
function renderSignIn() {
  app.innerHTML = `
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo">${icons.logo}<span>AlgoBeat</span></div>
      <h2 class="auth-title"><span class="gradient-text">Sign In</span></h2>
      <p class="auth-subtitle">Login into your account to start adding strategies to your trades!</p>
      <button class="google-btn" id="google-signin">${icons.google} Continue with Google</button>
      <div class="auth-divider">Or</div>
      <form id="signin-form">
        <div class="form-group">
          <label>Email Id / Client Id</label>
          <input type="text" class="form-input" id="signin-email" placeholder="Enter your email or client ID" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <div class="form-input-wrap">
            <input type="password" class="form-input" id="signin-password" placeholder="Enter your password" required>
            <button type="button" class="toggle-pw" id="toggle-pw">${icons.eye}</button>
          </div>
        </div>
        <div class="form-row">
          <a href="#">Forget Password?</a>
        </div>
        <button type="submit" class="btn btn-primary auth-submit">Log In</button>
      </form>
      <p class="auth-footer">Don't have account? <a href="#/signup">Sign Up</a></p>
    </div>
  </div>`;

  // Events
  document.getElementById('toggle-pw').addEventListener('click', () => {
    const pw = document.getElementById('signin-password');
    const btn = document.getElementById('toggle-pw');
    if (pw.type === 'password') { pw.type = 'text'; btn.innerHTML = icons.eyeOff; }
    else { pw.type = 'password'; btn.innerHTML = icons.eye; }
  });

  document.getElementById('google-signin').addEventListener('click', () => {
    state.user = { name: 'Yash Gupta', email: 'yash@algobeat.com', id: 'AB' + Math.random().toString(36).substr(2, 6).toUpperCase() };
    saveState();
    showToast('Welcome back, ' + state.user.name + '!', 'success');
    navigate('/dashboard');
  });

  document.getElementById('signin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    state.user = { name: email.split('@')[0] || 'Trader', email, id: 'AB' + Math.random().toString(36).substr(2, 6).toUpperCase() };
    saveState();
    showToast('Welcome back!', 'success');
    navigate('/dashboard');
  });
}

function renderSignUp() {
  app.innerHTML = `
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo">${icons.logo}<span>AlgoBeat</span></div>
      <h2 class="auth-title"><span class="gradient-text">Sign Up</span></h2>
      <p class="auth-subtitle">Create your account to start building strategies!</p>
      <button class="google-btn" id="google-signup">${icons.google} Continue with Google</button>
      <div class="auth-divider">Or</div>
      <form id="signup-form">
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" class="form-input" id="signup-email" placeholder="Enter your email" required>
        </div>
        <div id="otp-section" style="display:none;">
          <p style="font-size:0.85rem;color:var(--ghost);text-align:center;margin-bottom:12px;">Enter the OTP sent to your email</p>
          <div class="otp-group">
            <input type="text" class="otp-input" maxlength="1" data-otp="0">
            <input type="text" class="otp-input" maxlength="1" data-otp="1">
            <input type="text" class="otp-input" maxlength="1" data-otp="2">
            <input type="text" class="otp-input" maxlength="1" data-otp="3">
            <input type="text" class="otp-input" maxlength="1" data-otp="4">
            <input type="text" class="otp-input" maxlength="1" data-otp="5">
          </div>
        </div>
        <button type="submit" class="btn btn-primary auth-submit" id="signup-btn">Send OTP to Email</button>
      </form>
      <p class="auth-footer">Already have an account? <a href="#/signin">Sign In</a></p>
    </div>
  </div>`;

  let otpSent = false;

  document.getElementById('google-signup').addEventListener('click', () => {
    state.user = { name: 'Yash Gupta', email: 'yash@algobeat.com', id: 'AB' + Math.random().toString(36).substr(2, 6).toUpperCase() };
    saveState();
    showToast('Account created successfully!', 'success');
    navigate('/dashboard');
  });

  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!otpSent) {
      otpSent = true;
      document.getElementById('otp-section').style.display = 'block';
      document.getElementById('signup-btn').textContent = 'Verify & Create Account';
      showToast('OTP sent to your email! (Use any 6 digits)', 'info');
      // OTP auto-focus
      const otps = document.querySelectorAll('.otp-input');
      otps[0].focus();
      otps.forEach((inp, i) => {
        inp.addEventListener('input', () => { if (inp.value && otps[i + 1]) otps[i + 1].focus(); });
        inp.addEventListener('keydown', (ev) => { if (ev.key === 'Backspace' && !inp.value && otps[i - 1]) otps[i - 1].focus(); });
      });
    } else {
      const email = document.getElementById('signup-email').value;
      state.user = { name: email.split('@')[0] || 'Trader', email, id: 'AB' + Math.random().toString(36).substr(2, 6).toUpperCase() };
      saveState();
      showToast('Account created! Welcome to AlgoBeat.', 'success');
      navigate('/dashboard');
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD LAYOUT
// ═══════════════════════════════════════════════════════════════
function renderDashboard(route) {
  const sidebarLinks = [
    { path: '/dashboard', icon: icons.dashboard, label: 'Dashboard' },
    { path: '/broker', icon: icons.broker, label: 'Broker' },
    { path: '/builder', icon: icons.builder, label: 'Strategy Builder' },
    { path: '/strategies', icon: icons.strategies, label: 'Strategies' },
    { path: '/backtest', icon: icons.backtest, label: 'Backtesting', sub: [
      { path: '/backtest', label: 'Strategy Backtest' },
      { path: '/simulator', label: 'Simulator (Beta)' },
    ]},
    { path: '/reports', icon: icons.reports, label: 'Reports' },
    { path: '/subscription', icon: icons.subscription, label: 'Subscription' },
  ];

  const isBacktestOpen = route.startsWith('/backtest') || route.startsWith('/simulator');
  
  app.innerHTML = `
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-logo">${icons.logo}<span>AlgoBeat</span></div>
      <nav class="sidebar-nav">
        ${sidebarLinks.map(link => {
          const isActive = route === link.path || (link.sub && link.sub.some(s => route === s.path));
          return `
            <a href="#${link.path}" class="sidebar-link ${isActive && !link.sub ? 'active' : ''}" ${link.sub ? `onclick="event.preventDefault(); document.getElementById('sub-${link.label}').style.display = document.getElementById('sub-${link.label}').style.display === 'none' ? 'block' : 'block'; window.location.hash='${link.path}'"` : ''}>
              ${link.icon}<span>${link.label}</span>
              ${link.sub ? `<span style="margin-left:auto;font-size:0.7rem;">${isBacktestOpen ? '▾' : '›'}</span>` : ''}
            </a>
            ${link.sub ? `<div id="sub-${link.label}" style="display:${isBacktestOpen ? 'block' : 'none'};">
              ${link.sub.map(s => `<a href="#${s.path}" class="sidebar-link ${route === s.path ? 'active' : ''}" style="padding-left:48px;font-size:0.82rem;">
                <span>• ${s.label}</span>
              </a>`).join('')}
            </div>` : ''}
          `;
        }).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-avatar">${state.user?.name?.[0] || 'U'}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${state.user?.name || 'User'}</div>
            <div class="sidebar-user-plan">${state.user?.id || ''} · ${state.plan === 'free' ? 'Free' : state.plan} Plan</div>
          </div>
          <button onclick="state.user=null;saveState();navigate('/signin');showToast('Logged out','info');" style="color:var(--ghost);padding:4px;" title="Logout">⏻</button>
        </div>
      </div>
    </aside>
    <main class="main-content" id="main-content"></main>
  </div>`;

  const main = document.getElementById('main-content');
  
  switch (route) {
    case '/dashboard': renderDashboardPage(main); break;
    case '/broker': renderBrokerPage(main); break;
    case '/builder': renderBuilderPage(main); break;
    case '/strategies': renderStrategiesPage(main); break;
    case '/backtest': renderBacktestPage(main); break;
    case '/simulator': renderSimulatorPage(main); break;
    case '/reports': renderReportsPage(main); break;
    case '/subscription': renderSubscriptionPage(main); break;
    case '/wallet': renderWalletPage(main); break;
    default: renderDashboardPage(main);
  }
}

// ═══ Dashboard Page ═══
function renderDashboardPage(el) {
  const totalPnl = state.strategies.reduce((sum, s) => sum + (s.pnl || 0), 0);
  const activeCount = state.strategies.filter(s => s.status === 'live').length;
  
  el.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">My Dashboard</h1><p class="page-subtitle">Welcome back, ${state.user?.name || 'Trader'}</p></div>
    </div>
    <div class="stats-grid">
      <div class="stat-card highlight">
        <div class="stat-label">Total P&L</div>
        <div class="stat-value">₹${totalPnl.toLocaleString()}</div>
        <div class="stat-change up">↑ Active strategies running</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Today's P&L</div>
        <div class="stat-value" style="color:var(--teal);">₹${Math.floor(Math.random() * 5000).toLocaleString()}</div>
        <div class="stat-change up">↑ 2.4% from yesterday</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Active Deployments</div>
        <div class="stat-value">${activeCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Backtest Credits</div>
        <div class="stat-value">${state.backtestCredits}</div>
        <div class="stat-change" style="color:var(--ghost);">of ${state.plan === 'unlimited' ? '1500' : state.plan === 'limited' ? '500' : '50'}</div>
      </div>
    </div>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title">Broker Connection</span>
          <a href="#/broker" class="btn btn-sm btn-primary">+ Add Broker</a>
        </div>
        <div style="text-align:center;padding:40px;color:var(--ghost);">
          ${state.brokers.length ? state.brokers.map(b => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--surface-2);border-radius:8px;margin-bottom:8px;">
              <span style="font-weight:600;color:var(--white);">${b.name}</span>
              <span class="status-badge live"><span class="dot-sm"></span> Connected</span>
            </div>
          `).join('') : `
            <p style="margin-bottom:16px;">Connect your broker to start trading</p>
            <a href="#/broker" class="btn btn-outline btn-sm">Connect Broker</a>
          `}
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title">Strategy Deployed</span>
        </div>
        <div style="text-align:center;padding:40px;">
          ${state.strategies.filter(s => s.deployed).length ? state.strategies.filter(s => s.deployed).map(s => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--surface-2);border-radius:8px;margin-bottom:8px;">
              <span style="font-weight:600;color:var(--white);">${s.name}</span>
              <span class="status-badge ${s.status}"><span class="dot-sm"></span> ${s.status}</span>
            </div>
          `).join('') : `
            <div style="color:var(--ghost);">
              <p style="margin-bottom:16px;">No Strategies Deployed</p>
              <a href="#/builder" class="btn btn-primary btn-sm">Create Strategy</a>
            </div>
          `}
        </div>
      </div>
    </div>
    
    <div class="chart-card" style="margin-top:20px;">
      <div class="chart-header">
        <span class="chart-title">Strategy Templates</span>
        <a href="#/strategies" class="btn btn-ghost btn-sm">View All →</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        ${getTemplates().slice(0, 3).map(t => `
          <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:16px;">
            <div style="font-weight:700;color:var(--white);font-size:0.9rem;margin-bottom:6px;">${t.name}</div>
            <div style="font-size:0.8rem;color:var(--ghost);margin-bottom:12px;line-height:1.5;">${t.desc.substring(0, 80)}...</div>
            <button class="btn btn-primary btn-sm" onclick="addTemplateToStrategy('${t.name}')">Add to my strategy</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ═══ Broker Page ═══
function renderBrokerPage(el) {
  const availableBrokers = ['Zerodha', 'Groww', 'Dhan', 'FYERS', 'Angel One', 'Finvasia', 'Upstox', 'IIFL'];
  
  el.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Broker</h1><p class="page-subtitle">Manage your connected brokers</p></div>
      <button class="btn btn-primary" id="add-broker-btn">+ Add Broker</button>
    </div>
    <div id="broker-content">
      ${state.brokers.length ? `
        <div class="broker-grid">
          ${state.brokers.map((b, i) => `
            <div class="broker-card connected">
              <div class="broker-icon">${b.name[0]}</div>
              <div class="broker-name">${b.name}</div>
              <div class="broker-status-text">● Connected</div>
              <button class="btn btn-outline btn-sm" onclick="removeBroker(${i})">Disconnect</button>
            </div>
          `).join('')}
        </div>
      ` : `
        <div style="text-align:center;padding:80px 40px;background:var(--surface-1);border:1px solid var(--border);border-radius:16px;">
          <div style="font-size:3rem;margin-bottom:16px;opacity:0.3;">🔌</div>
          <p style="color:var(--ghost);margin-bottom:16px;">No Portfolio summary. Create Bucket!</p>
          <button class="btn btn-primary" onclick="document.getElementById('add-broker-btn').click()">+ Add Broker</button>
        </div>
      `}
    </div>
    <div id="broker-modal" style="display:none;"></div>
  `;

  document.getElementById('add-broker-btn').addEventListener('click', () => {
    const modal = document.getElementById('broker-modal');
    modal.style.display = 'block';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="if(event.target===this)this.parentElement.style.display='none'">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Add Broker</h3>
            <button onclick="this.closest('.modal-overlay').parentElement.style.display='none'">${icons.close}</button>
          </div>
          <p style="font-size:0.85rem;color:var(--ghost);margin-bottom:16px;">Select your broker and enter API credentials</p>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:20px;">
            ${availableBrokers.map(b => `
              <button class="broker-select-btn" data-broker="${b}" style="padding:12px 8px;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;font-size:0.8rem;font-weight:600;color:var(--cloud);transition:all 0.2s;">
                ${b}
              </button>
            `).join('')}
          </div>
          <div id="broker-form-fields" style="display:none;">
            <div class="form-group">
              <label>Client ID</label>
              <input type="text" class="form-input" id="broker-client-id" placeholder="Enter Client ID">
            </div>
            <div class="form-group">
              <label>API Key</label>
              <input type="text" class="form-input" id="broker-api-key" placeholder="Enter API Key">
            </div>
            <div class="form-group">
              <label>API Secret</label>
              <input type="password" class="form-input" id="broker-api-secret" placeholder="Enter API Secret">
            </div>
            <button class="btn btn-primary" style="width:100%;justify-content:center;" id="connect-broker-btn">Connect Broker</button>
          </div>
        </div>
      </div>
    `;

    let selectedBroker = null;
    modal.querySelectorAll('.broker-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.broker-select-btn').forEach(b => { b.style.borderColor = 'var(--border)'; b.style.color = 'var(--cloud)'; });
        btn.style.borderColor = 'var(--accent)';
        btn.style.color = 'var(--accent-bright)';
        selectedBroker = btn.dataset.broker;
        document.getElementById('broker-form-fields').style.display = 'block';
      });
    });

    setTimeout(() => {
      const connectBtn = document.getElementById('connect-broker-btn');
      if (connectBtn) {
        connectBtn.addEventListener('click', () => {
          if (!selectedBroker) { showToast('Please select a broker', 'error'); return; }
          state.brokers.push({ name: selectedBroker, clientId: document.getElementById('broker-client-id').value || 'DEMO', connected: true });
          saveState();
          showToast(`${selectedBroker} connected successfully!`, 'success');
          modal.style.display = 'none';
          renderBrokerPage(el);
        });
      }
    }, 100);
  });
}

window.removeBroker = function(i) {
  const name = state.brokers[i].name;
  state.brokers.splice(i, 1);
  saveState();
  showToast(`${name} disconnected`, 'info');
  render();
};

// ═══ Strategy Builder ═══
function renderBuilderPage(el) {
  el.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Strategy Builder</h1><p class="page-subtitle">Create your algorithmic trading strategy</p></div>
    </div>
    <div class="strategy-form">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
        <div class="backtest-config" style="margin-bottom:0;">
          <div class="form-section-title">Strategy Type</div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px;">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.88rem;color:var(--cloud);">
              <input type="radio" name="strat-type" value="time" checked style="accent-color:var(--accent);"> Option Trading-Time Based
            </label>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.88rem;color:var(--cloud);">
              <input type="radio" name="strat-type" value="indicator"> Option Trading-Indicator Based
            </label>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.88rem;color:var(--cloud);">
              <input type="radio" name="strat-type" value="stocks"> Stocks & Futures -Indicator Based
            </label>
          </div>
        </div>
        <div class="backtest-config" style="margin-bottom:0;">
          <div class="form-section-title">Select Instruments</div>
          <div style="margin-top:12px;">
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <button class="btn btn-sm btn-primary" id="spot-btn" style="font-size:0.78rem;">Spot</button>
              <button class="btn btn-sm btn-outline" id="future-btn" style="font-size:0.78rem;">Future</button>
            </div>
            <div id="instruments-list" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
            <button class="btn btn-outline btn-sm" style="margin-top:12px;" id="add-instrument-btn">+ Add</button>
          </div>
        </div>
        <div class="backtest-config" style="margin-bottom:0;">
          <div class="form-section-title" style="display:flex;justify-content:space-between;align-items:center;">Strategy Legs <button class="btn btn-primary btn-sm" id="add-leg-btn">+ Add Leg</button></div>
          <div id="legs-container" style="margin-top:12px;max-height:300px;overflow-y:auto;"></div>
        </div>
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="backtest-config" style="margin-bottom:0;">
          <div class="form-section-title">Order Type</div>
          <div style="display:flex;gap:16px;margin:12px 0;">
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.88rem;color:var(--cloud);">
              <input type="radio" name="order-type" value="MIS" checked style="accent-color:var(--accent);"> MIS
            </label>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.88rem;color:var(--cloud);">
              <input type="radio" name="order-type" value="CNC" style="accent-color:var(--accent);"> CNC
            </label>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.88rem;color:var(--cloud);">
              <input type="radio" name="order-type" value="BTST" style="accent-color:var(--accent);"> BTST
            </label>
          </div>
          <div class="form-grid" style="margin-top:12px;">
            <div class="form-group" style="margin-bottom:0;">
              <label>Start Time</label>
              <input type="time" class="form-input" value="09:16" id="start-time">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label>Square Off</label>
              <input type="time" class="form-input" value="15:15" id="squareoff-time">
            </div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px;">
            ${['MON','TUE','WED','THU','FRI'].map(d => `
              <button class="btn btn-sm btn-primary day-btn" data-day="${d}" style="font-size:0.72rem;padding:6px 10px;">${d}</button>
            `).join('')}
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div class="backtest-config" style="margin-bottom:0;">
            <div class="form-section-title">Risk Management</div>
            <div class="form-group" style="margin-top:12px;">
              <label>Max Loss (₹)</label>
              <input type="number" class="form-input" placeholder="e.g. 5000" id="max-loss">
            </div>
            <div class="form-group">
              <label>Max Profit (₹)</label>
              <input type="number" class="form-input" placeholder="e.g. 10000" id="max-profit">
            </div>
          </div>
          <div class="backtest-config" style="margin-bottom:0;">
            <div class="form-section-title">Strategy Name</div>
            <div class="form-group" style="margin-top:12px;">
              <label>Name</label>
              <input type="text" class="form-input" placeholder="My Strategy" id="strategy-name">
            </div>
            <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:12px;" id="save-strategy-btn">Save Strategy</button>
            <button class="btn btn-outline" style="width:100%;justify-content:center;margin-top:8px;" id="deploy-strategy-btn">Save & Deploy</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Instruments
  const instruments = ['NIFTY 50', 'BANK NIFTY'];
  const instrList = document.getElementById('instruments-list');
  function renderInstruments() {
    instrList.innerHTML = instruments.map((inst, i) => `
      <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;background:var(--surface-3);border:1px solid var(--border);border-radius:20px;font-size:0.78rem;color:var(--cloud);">
        ${inst} <button onclick="this.parentElement.remove()" style="color:var(--rose);font-size:0.7rem;">✕</button>
      </span>
    `).join('');
  }
  renderInstruments();

  document.getElementById('add-instrument-btn').addEventListener('click', () => {
    const opts = ['NIFTY 50', 'BANK NIFTY', 'FINNIFTY', 'MIDCPNIFTY', 'SENSEX', 'RELIANCE', 'TCS', 'INFY', 'HDFC BANK'];
    const name = opts[Math.floor(Math.random() * opts.length)];
    instruments.push(name);
    renderInstruments();
  });

  // Legs
  let legs = [{ id: 1, position: 'BUY', optionType: 'Call', qty: 1, expiry: 'WEEKLY', strike: 'ATM' }];
  const legsContainer = document.getElementById('legs-container');
  function renderLegs() {
    legsContainer.innerHTML = legs.map((leg, i) => `
      <div class="leg-card" style="margin-bottom:10px;">
        <div class="leg-header">
          <span class="leg-title">Leg ${i + 1} <span style="color:var(--accent);font-size:0.78rem;">${leg.position} ${leg.optionType === 'Call' ? 'CE' : 'PE'}</span></span>
          ${legs.length > 1 ? `<button class="leg-remove" onclick="removeLeg(${i})">Remove</button>` : ''}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div>
            <label style="font-size:0.72rem;color:var(--ghost);">Position</label>
            <div style="display:flex;gap:4px;margin-top:4px;">
              <button class="btn btn-sm ${leg.position === 'BUY' ? 'btn-primary' : 'btn-outline'}" style="font-size:0.72rem;flex:1;" onclick="updateLeg(${i},'position','BUY')">BUY</button>
              <button class="btn btn-sm ${leg.position === 'SELL' ? 'btn-primary' : 'btn-outline'}" style="font-size:0.72rem;flex:1;${leg.position === 'SELL' ? 'background:var(--rose);border-color:var(--rose);' : ''}" onclick="updateLeg(${i},'position','SELL')">SELL</button>
            </div>
          </div>
          <div>
            <label style="font-size:0.72rem;color:var(--ghost);">Type</label>
            <div style="display:flex;gap:4px;margin-top:4px;">
              <button class="btn btn-sm ${leg.optionType === 'Call' ? 'btn-primary' : 'btn-outline'}" style="font-size:0.72rem;flex:1;" onclick="updateLeg(${i},'optionType','Call')">Call</button>
              <button class="btn btn-sm ${leg.optionType === 'Put' ? 'btn-primary' : 'btn-outline'}" style="font-size:0.72rem;flex:1;" onclick="updateLeg(${i},'optionType','Put')">Put</button>
            </div>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label style="font-size:0.72rem;color:var(--ghost);">Qty (lots)</label>
            <input type="number" class="form-input" value="${leg.qty}" style="padding:6px 10px;font-size:0.82rem;" onchange="updateLeg(${i},'qty',this.value)">
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label style="font-size:0.72rem;color:var(--ghost);">Strike</label>
            <select class="form-select" style="padding:6px 10px;font-size:0.82rem;" onchange="updateLeg(${i},'strike',this.value)">
              <option ${leg.strike==='ATM'?'selected':''}>ATM</option>
              <option ${leg.strike==='ITM'?'selected':''}>ITM</option>
              <option ${leg.strike==='OTM'?'selected':''}>OTM</option>
            </select>
          </div>
        </div>
      </div>
    `).join('');
  }
  renderLegs();

  window.updateLeg = (i, key, val) => { legs[i][key] = val; renderLegs(); };
  window.removeLeg = (i) => { legs.splice(i, 1); renderLegs(); };
  
  document.getElementById('add-leg-btn').addEventListener('click', () => {
    legs.push({ id: legs.length + 1, position: 'SELL', optionType: 'Put', qty: 1, expiry: 'WEEKLY', strike: 'ATM' });
    renderLegs();
  });

  // Day toggle
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('btn-primary');
      btn.classList.toggle('btn-outline');
    });
  });

  // Save
  function saveStrategy(deploy = false) {
    const name = document.getElementById('strategy-name').value || `Strategy ${state.strategies.length + 1}`;
    const strat = {
      id: Date.now(),
      name,
      type: document.querySelector('input[name="strat-type"]:checked')?.value || 'time',
      orderType: document.querySelector('input[name="order-type"]:checked')?.value || 'MIS',
      startTime: document.getElementById('start-time').value,
      squareOff: document.getElementById('squareoff-time').value,
      legs: [...legs],
      maxLoss: document.getElementById('max-loss').value,
      maxProfit: document.getElementById('max-profit').value,
      segment: 'EQUITY',
      deployed: deploy,
      status: deploy ? 'live' : 'stopped',
      pnl: deploy ? Math.floor(Math.random() * 10000 - 3000) : 0,
      createdAt: new Date().toISOString(),
    };
    state.strategies.push(strat);
    saveState();
    showToast(`Strategy "${name}" ${deploy ? 'deployed' : 'saved'} successfully!`, 'success');
    navigate('/strategies');
  }

  document.getElementById('save-strategy-btn').addEventListener('click', () => saveStrategy(false));
  document.getElementById('deploy-strategy-btn').addEventListener('click', () => saveStrategy(true));
}

// ═══ Strategies Page ═══
function renderStrategiesPage(el) {
  let activeTab = 'my';
  
  function renderContent() {
    const templates = getTemplates();
    el.innerHTML = `
      <div class="page-header">
        <div><h1 class="page-title">Strategies</h1></div>
      </div>
      <div style="display:flex;gap:24px;margin-bottom:24px;border-bottom:1px solid var(--border);padding-bottom:0;">
        <button class="tab-btn-simple ${activeTab === 'my' ? 'active' : ''}" onclick="switchStratTab('my')" style="padding-bottom:12px;font-size:0.9rem;font-weight:600;color:${activeTab === 'my' ? 'var(--accent)' : 'var(--ghost)'};border-bottom:${activeTab === 'my' ? '2px solid var(--accent)' : 'none'};background:none;">My Strategies</button>
        <button class="tab-btn-simple ${activeTab === 'deployed' ? 'active' : ''}" onclick="switchStratTab('deployed')" style="padding-bottom:12px;font-size:0.9rem;font-weight:600;color:${activeTab === 'deployed' ? 'var(--accent)' : 'var(--ghost)'};border-bottom:${activeTab === 'deployed' ? '2px solid var(--accent)' : 'none'};background:none;">Deployed Strategies</button>
        <button class="tab-btn-simple ${activeTab === 'templates' ? 'active' : ''}" onclick="switchStratTab('templates')" style="padding-bottom:12px;font-size:0.9rem;font-weight:600;color:${activeTab === 'templates' ? 'var(--accent)' : 'var(--ghost)'};border-bottom:${activeTab === 'templates' ? '2px solid var(--accent)' : 'none'};background:none;">Strategy Templates</button>
      </div>
      
      ${activeTab === 'my' ? `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div class="search-input">${icons.search}<input placeholder="Search strategies..." id="search-strat"></div>
          <span style="font-size:0.82rem;color:var(--ghost);">Showing ${state.strategies.length} strategies</span>
        </div>
        ${state.strategies.length ? `
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
            ${state.strategies.map((s, i) => `
              <div style="background:var(--surface-1);border:1px solid var(--border);border-radius:12px;padding:16px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                  <span style="font-weight:700;color:var(--white);font-size:0.92rem;">${s.name}</span>
                  <span class="status-badge ${s.status}"><span class="dot-sm"></span> ${s.status}</span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.78rem;color:var(--ghost);margin-bottom:12px;">
                  <div>${s.startTime || '09:15'} → ${s.squareOff || '15:15'}</div>
                  <div>${s.segment || 'EQUITY'}</div>
                  <div>${s.type === 'time' ? 'Time Based' : 'Indicator Based'}</div>
                  <div>P&L: <span style="color:${s.pnl >= 0 ? 'var(--teal)' : 'var(--rose)'};font-weight:600;">₹${s.pnl?.toLocaleString() || 0}</span></div>
                </div>
                <div style="display:flex;gap:6px;">
                  ${!s.deployed ? `<button class="btn btn-primary btn-sm" onclick="deployStrategy(${i})">Deploy</button>` : `<button class="btn btn-outline btn-sm" onclick="stopStrategy(${i})">${s.status === 'live' ? 'Stop' : 'Start'}</button>`}
                  <button class="btn btn-ghost btn-sm" onclick="deleteStrategy(${i})" style="color:var(--rose);">${icons.trash}</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="text-align:center;padding:60px;background:var(--surface-1);border:1px solid var(--border);border-radius:16px;">
            <p style="color:var(--ghost);margin-bottom:16px;">No strategies yet</p>
            <a href="#/builder" class="btn btn-primary">Create Strategy</a>
          </div>
        `}
      ` : activeTab === 'deployed' ? `
        <div style="text-align:center;padding:60px;background:var(--surface-1);border:1px solid var(--border);border-radius:16px;">
          ${state.strategies.filter(s => s.deployed).length ? state.strategies.filter(s => s.deployed).map(s => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:14px;background:var(--surface-2);border-radius:10px;margin-bottom:8px;text-align:left;">
              <span style="font-weight:600;color:var(--white);">${s.name}</span>
              <span style="font-family:var(--mono);color:${s.pnl >= 0 ? 'var(--teal)' : 'var(--rose)'};">₹${s.pnl?.toLocaleString() || 0}</span>
              <span class="status-badge ${s.status}"><span class="dot-sm"></span> ${s.status}</span>
            </div>
          `).join('') : `
            <p style="color:var(--ghost);margin-bottom:16px;">No strategies deployed yet</p>
            <a href="#/builder" class="btn btn-primary">Create Strategy</a>
          `}
        </div>
      ` : `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
          ${templates.map(t => `
            <div style="background:var(--surface-1);border:1px solid var(--border);border-radius:12px;padding:20px;">
              <div style="font-weight:700;color:var(--white);font-size:0.95rem;margin-bottom:8px;">${t.name}</div>
              <div style="font-size:0.82rem;color:var(--ghost);margin-bottom:8px;line-height:1.6;">${t.desc}</div>
              <a href="#" style="font-size:0.82rem;color:var(--accent-bright);font-weight:600;">Read more</a>
              <div style="margin-top:16px;">
                <button class="btn btn-primary btn-sm" onclick="addTemplateToStrategy('${t.name}')">Add to my strategy</button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;
  }
  
  window.switchStratTab = (tab) => { activeTab = tab; renderContent(); };
  window.deployStrategy = (i) => { state.strategies[i].deployed = true; state.strategies[i].status = 'live'; state.strategies[i].pnl = Math.floor(Math.random() * 8000 - 2000); saveState(); showToast('Strategy deployed!', 'success'); renderContent(); };
  window.stopStrategy = (i) => { state.strategies[i].status = state.strategies[i].status === 'live' ? 'paused' : 'live'; saveState(); renderContent(); };
  window.deleteStrategy = (i) => { state.strategies.splice(i, 1); saveState(); showToast('Strategy deleted', 'info'); renderContent(); };
  
  renderContent();
}

// ═══ Backtesting Page ═══
function renderBacktestPage(el) {
  el.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Strategy Backtest</h1><p class="page-subtitle">Test your strategies against historical data</p></div>
      <span style="font-size:0.85rem;color:var(--ghost);">Credits: <strong style="color:var(--white);">${state.backtestCredits}</strong></span>
    </div>
    <div class="backtest-config">
      <div class="form-grid">
        <div class="form-group">
          <label>Select Strategy</label>
          <select class="form-select" id="bt-strategy">
            <option value="">-- Select Strategy --</option>
            ${state.strategies.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
            ${getTemplates().map(t => `<option value="${t.name}">${t.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Period</label>
          <select class="form-select" id="bt-period">
            <option>1 Month</option>
            <option>3 Months</option>
            <option selected>6 Months</option>
            <option>1 Year</option>
            <option>2 Years</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" id="run-backtest" style="margin-top:16px;">
        ${icons.play} Run Backtest (1 credit)
      </button>
    </div>
    <div id="backtest-results"></div>
  `;

  document.getElementById('run-backtest').addEventListener('click', () => {
    const stratSelect = document.getElementById('bt-strategy');
    if (!stratSelect.value) { showToast('Please select a strategy', 'error'); return; }
    if (state.backtestCredits <= 0) { showToast('No backtest credits remaining!', 'error'); return; }
    
    state.backtestCredits--;
    saveState();
    
    // Simulate backtest results
    const results = {
      totalPnl: Math.floor(Math.random() * 50000 - 10000),
      winRate: (50 + Math.random() * 30).toFixed(1),
      maxDrawdown: Math.floor(Math.random() * 15000),
      totalTrades: Math.floor(Math.random() * 200 + 50),
      avgProfit: Math.floor(Math.random() * 3000),
      sharpeRatio: (0.5 + Math.random() * 2).toFixed(2),
    };

    const bt = { strategy: stratSelect.options[stratSelect.selectedIndex].text, period: document.getElementById('bt-period').value, results, date: new Date().toISOString() };
    state.backtests.push(bt);
    saveState();

    document.getElementById('backtest-results').innerHTML = `
      <div style="margin-top:24px;" class="fade-in-up">
        <h3 style="font-size:1.1rem;font-weight:700;color:var(--white);margin-bottom:16px;">Backtest Results — ${bt.strategy}</h3>
        <div class="backtest-results">
          <div class="backtest-result-card">
            <div class="label">Total P&L</div>
            <div class="value" style="color:${results.totalPnl >= 0 ? 'var(--teal)' : 'var(--rose)'};">₹${results.totalPnl.toLocaleString()}</div>
          </div>
          <div class="backtest-result-card">
            <div class="label">Win Rate</div>
            <div class="value">${results.winRate}%</div>
          </div>
          <div class="backtest-result-card">
            <div class="label">Max Drawdown</div>
            <div class="value" style="color:var(--rose);">₹${results.maxDrawdown.toLocaleString()}</div>
          </div>
          <div class="backtest-result-card">
            <div class="label">Total Trades</div>
            <div class="value">${results.totalTrades}</div>
          </div>
          <div class="backtest-result-card">
            <div class="label">Avg Profit/Trade</div>
            <div class="value" style="color:var(--teal);">₹${results.avgProfit.toLocaleString()}</div>
          </div>
          <div class="backtest-result-card">
            <div class="label">Sharpe Ratio</div>
            <div class="value">${results.sharpeRatio}</div>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-title" style="margin-bottom:16px;">Equity Curve</div>
          <canvas id="equity-chart" height="200"></canvas>
        </div>
      </div>
    `;
    drawEquityCurve(results.totalPnl);
    showToast('Backtest complete! 1 credit used.', 'success');
  });
}

function drawEquityCurve(finalPnl) {
  const canvas = document.getElementById('equity-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = 200;
  
  // Generate random walk
  const points = [];
  let val = 0;
  for (let i = 0; i < 60; i++) {
    val += (Math.random() - 0.45) * (Math.abs(finalPnl) / 20);
    points.push(val);
  }
  // Scale to end near finalPnl
  const scale = finalPnl / (points[points.length - 1] || 1);
  points.forEach((p, i) => points[i] = p * scale);

  const maxY = Math.max(...points.map(Math.abs)) * 1.2;
  const baseY = h / 2;
  
  ctx.clearRect(0, 0, w, h);
  
  // Grid
  ctx.strokeStyle = 'rgba(139,149,180,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = (h / 5) * i;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  
  // Zero line
  ctx.strokeStyle = 'rgba(139,149,180,0.15)';
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(0, baseY); ctx.lineTo(w, baseY); ctx.stroke();
  ctx.setLineDash([]);
  
  // Gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  if (finalPnl >= 0) {
    gradient.addColorStop(0, 'rgba(0,212,170,0.15)');
    gradient.addColorStop(1, 'rgba(0,212,170,0)');
    ctx.strokeStyle = '#00d4aa';
  } else {
    gradient.addColorStop(0, 'rgba(255,71,87,0)');
    gradient.addColorStop(1, 'rgba(255,71,87,0.15)');
    ctx.strokeStyle = '#ff4757';
  }
  
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = baseY - (p / maxY) * (h / 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  
  // Fill area
  ctx.lineTo(w, baseY);
  ctx.lineTo(0, baseY);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
}

// ═══ Simulator Page (Option Chain) ═══
function renderSimulatorPage(el) {
  const strikes = [];
  const niftySpot = 24150;
  for (let s = niftySpot - 500; s <= niftySpot + 500; s += 50) {
    const callPrice = Math.max(5, (niftySpot - s) + Math.random() * 100).toFixed(2);
    const putPrice = Math.max(5, (s - niftySpot) + Math.random() * 100).toFixed(2);
    const delta = ((niftySpot - s) / 1000).toFixed(2);
    strikes.push({ strike: s, callPrice, putPrice, delta, putDelta: (-parseFloat(delta) + Math.random() * 0.1 - 0.05).toFixed(2) });
  }

  const expiries = ['21 JUL 26', '28 JUL 26', '04 AUG 26', '11 AUG 26'];
  let positions = [];

  function renderSim() {
    const totalPnl = positions.reduce((sum, p) => sum + p.pnl, 0);
    
    el.innerHTML = `
      <div class="page-header">
        <div><h1 class="page-title">Option Chain Simulator</h1><p class="page-subtitle">NIFTY · Spot: ${niftySpot.toLocaleString()}</p></div>
        <div style="display:flex;align-items:center;gap:16px;">
          <button class="btn btn-primary btn-sm" style="background:var(--teal);">Live</button>
        </div>
      </div>
      
      <div style="display:flex;gap:8px;margin-bottom:16px;">
        ${expiries.map((exp, i) => `
          <button class="btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-outline'}" style="font-size:0.78rem;">${exp}${i === 0 ? ' (4D)' : ''}</button>
        `).join('')}
      </div>
      
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:16px;">
        <div class="data-table-wrap" style="max-height:500px;overflow-y:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th style="text-align:center;">Call</th>
                <th>Δ</th>
                <th style="text-align:center;font-weight:800;">Strike</th>
                <th>Δ</th>
                <th style="text-align:center;">Put</th>
              </tr>
            </thead>
            <tbody>
              ${strikes.map(s => {
                const isATM = Math.abs(s.strike - niftySpot) < 25;
                return `
                <tr style="${isATM ? 'background:rgba(59,108,245,0.06);' : ''}">
                  <td style="text-align:center;">
                    <button class="btn btn-sm" style="background:rgba(0,212,170,0.15);color:var(--teal);font-size:0.7rem;padding:2px 6px;margin-right:2px;" onclick="addPosition(${s.strike},'CE','BUY',${s.callPrice})">B</button>
                    <button class="btn btn-sm" style="background:rgba(255,71,87,0.15);color:var(--rose);font-size:0.7rem;padding:2px 6px;margin-right:6px;" onclick="addPosition(${s.strike},'CE','SELL',${s.callPrice})">S</button>
                    <span style="color:var(--teal);font-family:var(--mono);font-size:0.82rem;">${s.callPrice}</span>
                  </td>
                  <td style="font-size:0.78rem;color:var(--ghost);">${s.delta}</td>
                  <td style="text-align:center;font-weight:700;color:var(--white);font-family:var(--mono);">${s.strike.toLocaleString()}</td>
                  <td style="font-size:0.78rem;color:var(--ghost);">${s.putDelta}</td>
                  <td style="text-align:center;">
                    <span style="color:var(--rose);font-family:var(--mono);font-size:0.82rem;">${s.putPrice}</span>
                    <button class="btn btn-sm" style="background:rgba(0,212,170,0.15);color:var(--teal);font-size:0.7rem;padding:2px 6px;margin-left:6px;" onclick="addPosition(${s.strike},'PE','BUY',${s.putPrice})">B</button>
                    <button class="btn btn-sm" style="background:rgba(255,71,87,0.15);color:var(--rose);font-size:0.7rem;padding:2px 6px;" onclick="addPosition(${s.strike},'PE','SELL',${s.putPrice})">S</button>
                  </td>
                </tr>
              `}).join('')}
            </tbody>
          </table>
        </div>
        
        <div>
          <div style="display:flex;gap:8px;margin-bottom:12px;">
            <button class="btn btn-sm btn-primary" style="font-size:0.78rem;">Payoff</button>
            <button class="btn btn-sm btn-outline" style="font-size:0.78rem;">Positions</button>
          </div>
          
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;">
            <div style="background:var(--surface-1);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center;">
              <div style="font-size:0.68rem;color:var(--ghost);">EST. MARGIN</div>
              <div style="font-family:var(--mono);font-weight:700;color:var(--white);font-size:0.88rem;">₹${positions.length ? Math.floor(Math.random() * 50000 + 10000).toLocaleString() : '0'}</div>
            </div>
            <div style="background:var(--surface-1);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center;">
              <div style="font-size:0.68rem;color:var(--ghost);">P&L</div>
              <div style="font-family:var(--mono);font-weight:700;color:${totalPnl >= 0 ? 'var(--teal)' : 'var(--rose)'};font-size:0.88rem;">₹${totalPnl.toLocaleString()}</div>
            </div>
            <div style="background:var(--surface-1);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center;">
              <div style="font-size:0.68rem;color:var(--ghost);">NET PREMIUM</div>
              <div style="font-family:var(--mono);font-weight:700;color:var(--white);font-size:0.88rem;">₹${positions.reduce((s, p) => s + (p.side === 'SELL' ? p.price * 25 : -p.price * 25), 0).toLocaleString()}</div>
            </div>
          </div>
          
          <div style="background:var(--surface-1);border:1px solid var(--border);border-radius:12px;padding:16px;min-height:250px;">
            ${positions.length ? `
              <h4 style="font-size:0.85rem;font-weight:700;color:var(--white);margin-bottom:12px;">Active Positions</h4>
              ${positions.map((p, i) => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--surface-2);border-radius:8px;margin-bottom:6px;font-size:0.82rem;">
                  <span style="color:var(--white);font-weight:600;">${p.side} ${p.strike} ${p.type}</span>
                  <span style="color:${p.pnl >= 0 ? 'var(--teal)' : 'var(--rose)'};font-family:var(--mono);">₹${p.pnl.toLocaleString()}</span>
                  <button onclick="removePosition(${i})" style="color:var(--rose);padding:2px;">${icons.close}</button>
                </div>
              `).join('')}
            ` : `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;color:var(--ghost);text-align:center;">
                <div style="font-size:2rem;margin-bottom:8px;">📈</div>
                <p style="font-weight:600;">No positions added</p>
                <p style="font-size:0.82rem;">Select strikes from Option Chain to visualize payoff</p>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  window.addPosition = (strike, type, side, price) => {
    const pnl = side === 'SELL' ? Math.floor(Math.random() * 2000) : Math.floor(Math.random() * 4000 - 1500);
    positions.push({ strike, type, side, price: parseFloat(price), pnl });
    renderSim();
    showToast(`${side} ${strike} ${type} @ ₹${price}`, 'info');
  };

  window.removePosition = (i) => {
    positions.splice(i, 1);
    renderSim();
  };

  renderSim();
}

// ═══ Reports Page ═══
function renderReportsPage(el) {
  let activeReportTab = 'reports';
  
  function renderReportsContent() {
    el.innerHTML = `
      <div class="page-header">
        <div><h1 class="page-title">Reports</h1></div>
      </div>
      <div style="display:flex;gap:24px;margin-bottom:24px;border-bottom:1px solid var(--border);">
        <button onclick="switchReportTab('reports')" style="padding-bottom:12px;font-size:0.9rem;font-weight:600;color:${activeReportTab === 'reports' ? 'var(--accent)' : 'var(--ghost)'};border-bottom:${activeReportTab === 'reports' ? '2px solid var(--accent)' : 'none'};background:none;cursor:pointer;">Reports</button>
        <button onclick="switchReportTab('logs')" style="padding-bottom:12px;font-size:0.9rem;font-weight:600;color:${activeReportTab === 'logs' ? 'var(--accent)' : 'var(--ghost)'};border-bottom:${activeReportTab === 'logs' ? '2px solid var(--accent)' : 'none'};background:none;cursor:pointer;">Trade Engine Logs</button>
      </div>
      
      ${activeReportTab === 'reports' ? `
        <div class="report-filters">
          <div class="form-group" style="margin-bottom:0;"><input type="date" class="form-input" style="width:160px;"></div>
          <span style="color:var(--ghost);">to</span>
          <div class="form-group" style="margin-bottom:0;"><input type="date" class="form-input" style="width:160px;"></div>
          <select class="form-select" style="width:150px;">
            <option>All Brokers</option>
            ${state.brokers.map(b => `<option>${b.name}</option>`).join('')}
          </select>
          <select class="form-select" style="width:120px;">
            <option>Live</option>
            <option>Forward</option>
          </select>
          <button class="btn btn-primary btn-sm">Generate</button>
        </div>
        ${state.backtests.length ? `
          <div class="data-table-wrap">
            <table class="data-table">
              <thead><tr><th>Strategy</th><th>Period</th><th>P&L</th><th>Win Rate</th><th>Trades</th><th>Date</th></tr></thead>
              <tbody>
                ${state.backtests.map(bt => `
                  <tr>
                    <td style="font-weight:600;color:var(--white);">${bt.strategy}</td>
                    <td>${bt.period}</td>
                    <td style="color:${bt.results.totalPnl >= 0 ? 'var(--teal)' : 'var(--rose)'};font-family:var(--mono);">₹${bt.results.totalPnl.toLocaleString()}</td>
                    <td>${bt.results.winRate}%</td>
                    <td>${bt.results.totalTrades}</td>
                    <td style="color:var(--ghost);">${new Date(bt.date).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `<div style="text-align:center;padding:60px;background:var(--surface-1);border:1px solid var(--border);border-radius:16px;color:var(--ghost);">No reports yet. Run a backtest first.</div>`}
      ` : `
        <div style="background:var(--surface-1);border:1px solid var(--border);border-radius:12px;padding:20px;font-family:var(--mono);font-size:0.78rem;color:var(--ghost);max-height:400px;overflow-y:auto;">
          ${[...Array(20)].map((_, i) => {
            const time = `${9 + Math.floor(i / 4)}:${String((i * 15) % 60).padStart(2, '0')}`;
            const msgs = ['Rule check: MA cross detected', 'Order placed: BUY NIFTY 24200 CE', 'SL triggered at ₹45.50', 'Strategy paused — max loss reached', 'Order filled @ ₹120.30', 'Heartbeat OK — broker connected'];
            return `<div style="padding:6px 0;border-bottom:1px solid var(--border);">[${time}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}] ${msgs[Math.floor(Math.random() * msgs.length)]}</div>`;
          }).join('')}
        </div>
      `}
    `;
  }
  
  window.switchReportTab = (tab) => { activeReportTab = tab; renderReportsContent(); };
  renderReportsContent();
}

// ═══ Subscription Page ═══
function renderSubscriptionPage(el) {
  let activeSubTab = 'plans';
  let pricePeriod = 'quarterly';
  
  function renderSubContent() {
    const prices = {
      monthly: { unlimited: '₹7,499', limited: '₹4,499' },
      quarterly: { unlimited: '₹6,373', limited: '₹3,823' },
      yearly: { unlimited: '₹4,999', limited: '₹2,999' },
    };
    
    el.innerHTML = `
      <div class="page-header"><div><h1 class="page-title">Subscriptions</h1></div></div>
      <div style="display:flex;gap:24px;margin-bottom:24px;border-bottom:1px solid var(--border);">
        <button onclick="switchSubTab('plans')" style="padding-bottom:12px;font-size:0.9rem;font-weight:600;color:${activeSubTab === 'plans' ? 'var(--accent)' : 'var(--ghost)'};border-bottom:${activeSubTab === 'plans' ? '2px solid var(--accent)' : 'none'};background:none;cursor:pointer;">Plans</button>
        <button onclick="switchSubTab('credits')" style="padding-bottom:12px;font-size:0.9rem;font-weight:600;color:${activeSubTab === 'credits' ? 'var(--accent)' : 'var(--ghost)'};border-bottom:${activeSubTab === 'credits' ? '2px solid var(--accent)' : 'none'};background:none;cursor:pointer;">Backtest Credits</button>
        <button onclick="switchSubTab('ip')" style="padding-bottom:12px;font-size:0.9rem;font-weight:600;color:${activeSubTab === 'ip' ? 'var(--accent)' : 'var(--ghost)'};border-bottom:${activeSubTab === 'ip' ? '2px solid var(--accent)' : 'none'};background:none;cursor:pointer;">Static IP</button>
      </div>
      
      ${activeSubTab === 'plans' ? `
        <div style="display:flex;gap:4px;margin-bottom:24px;">
          ${['monthly', 'quarterly', 'yearly'].map(p => `
            <button onclick="changePricePeriod('${p}')" class="btn btn-sm ${pricePeriod === p ? 'btn-primary' : 'btn-outline'}">${p.charAt(0).toUpperCase() + p.slice(1)}</button>
          `).join('')}
        </div>
        <div class="pricing-grid">
          <div class="price-card ${state.plan === 'free' ? 'featured' : ''}">
            <div class="price-name">Free Plan</div>
            <div class="price-amount"><span class="currency">₹</span><span class="value">0</span><span class="period"> (+ GST)</span></div>
            ${state.plan === 'free' ? '<div style="background:rgba(0,212,170,0.1);color:var(--teal);text-align:center;padding:10px;border-radius:8px;font-weight:600;font-size:0.85rem;margin:16px 0;">Plan already active</div>' : '<button class="btn btn-outline price-cta" style="margin:16px 0;">Get Started</button>'}
            <div style="font-weight:700;color:var(--white);font-size:0.88rem;margin-bottom:8px;">What's included:</div>
            <div style="font-size:0.82rem;color:var(--ghost);line-height:2;">• 50 allowed backtest credits<br>• 5 strategy creation allowed<br>• 0 live + forward deployments<br>• Max Brokers allowed: 1</div>
          </div>
          <div class="price-card ${state.plan === 'unlimited' ? 'featured' : ''}">
            <div class="price-name">Unlimited Plan</div>
            <div class="price-amount"><span class="currency">₹</span><span class="value">${prices[pricePeriod].unlimited.replace('₹', '')}</span><span class="period"> (+ GST)</span></div>
            <button class="btn btn-primary price-cta" style="margin:16px 0;" onclick="upgradePlan('unlimited')">Get Started</button>
            <div style="font-weight:700;color:var(--white);font-size:0.88rem;margin-bottom:8px;">What's included:</div>
            <div style="font-size:0.82rem;color:var(--ghost);line-height:2;">• 1500 allowed backtest credits<br>• 50 strategy creation allowed<br>• 20 live + forward deployments<br>• Max Brokers allowed: 5</div>
          </div>
          <div class="price-card ${state.plan === 'limited' ? 'featured' : ''}">
            <div class="price-name">Limited Plan</div>
            <div class="price-amount"><span class="currency">₹</span><span class="value">${prices[pricePeriod].limited.replace('₹', '')}</span><span class="period"> (+ GST)</span></div>
            <button class="btn btn-outline price-cta" style="margin:16px 0;" onclick="upgradePlan('limited')">Get Started</button>
            <div style="font-weight:700;color:var(--white);font-size:0.88rem;margin-bottom:8px;">What's included:</div>
            <div style="font-size:0.82rem;color:var(--ghost);line-height:2;">• 500 allowed backtest credits<br>• 25 strategy creation allowed<br>• 5 live + forward deployments<br>• Max Brokers allowed: 3</div>
          </div>
        </div>
      ` : activeSubTab === 'credits' ? `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
          ${[
            { name: 'Basic', dur: '7 Days', price: '499', credits: 'Unlimited' },
            { name: 'Pro', dur: '30 Days', price: '1,499', credits: 'Unlimited' },
            { name: 'Pro+', dur: '90 Days', price: '2,499', credits: 'Unlimited' },
          ].map(p => `
            <div class="price-card">
              <div class="price-name">${p.name}</div>
              <div class="price-desc">${p.dur} validity</div>
              <div class="price-amount"><span class="currency">₹</span><span class="value">${p.price}</span><span class="period"> (+ GST)</span></div>
              <div style="margin-top:16px;"><button class="btn btn-primary btn-sm" onclick="showToast('Credit pack purchase — coming soon!','info')">Buy Now</button></div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="price-card" style="max-width:400px;">
          <div class="price-name">Static IP Add-on</div>
          <div class="price-desc">Dedicated IP for secure broker API connections</div>
          <div class="price-amount"><span class="currency">₹</span><span class="value">499</span><span class="period"> /mo (+ GST)</span></div>
          <div style="margin-top:16px;"><button class="btn btn-primary btn-sm" onclick="showToast('Static IP — coming soon!','info')">Purchase</button></div>
        </div>
      `}
    `;
  }

  window.switchSubTab = (tab) => { activeSubTab = tab; renderSubContent(); };
  window.changePricePeriod = (p) => { pricePeriod = p; renderSubContent(); };
  window.upgradePlan = (plan) => {
    state.plan = plan;
    state.backtestCredits = plan === 'unlimited' ? 1500 : plan === 'limited' ? 500 : 50;
    saveState();
    showToast(`Upgraded to ${plan} plan!`, 'success');
    renderSubContent();
  };
  
  renderSubContent();
}

// ═══ Wallet Page ═══
function renderWalletPage(el) {
  el.innerHTML = `
    <div class="page-header"><div><h1 class="page-title">My Wallet</h1></div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
      <div class="stat-card highlight">
        <div class="stat-label">Cash Balance</div>
        <div class="stat-value">₹${state.wallet.toLocaleString()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Backtest Credits</div>
        <div class="stat-value">${state.backtestCredits}</div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// PUBLIC PAGES
// ═══════════════════════════════════════════════════════════════
function renderAbout() {
  app.innerHTML = `
    ${renderNavbar()}
    <div class="about-hero">
      <div class="container">
        <div class="section-label"><span class="dot"></span> About Us</div>
        <h1>Empowering Traders<br>With <span class="gradient-text">Smart Automation</span></h1>
        <p>We're building the future of algorithmic trading — accessible, powerful, and designed for every trader from beginners to professionals.</p>
      </div>
    </div>
    <section class="section" style="background:var(--surface-1);">
      <div class="container section-center">
        <h2 class="section-title">Our Values</h2>
        <div class="values-grid" style="margin-top:32px;">
          ${[
            { icon: '⚡', title: 'Speed', desc: 'Lightning-fast execution and real-time data processing for optimal trading performance.' },
            { icon: '🔒', title: 'Security', desc: 'Bank-grade encryption and secure API connections to protect your trading data.' },
            { icon: '🎯', title: 'Precision', desc: 'Accurate backtesting and reliable strategy execution with zero slippage simulation.' },
            { icon: '🤝', title: 'Transparency', desc: 'Clear pricing, honest metrics, and full visibility into every aspect of your trading.' },
            { icon: '🚀', title: 'Innovation', desc: 'Constantly evolving with new features, indicators, and trading capabilities.' },
            { icon: '💡', title: 'Simplicity', desc: 'No-code interface that makes complex algo trading accessible to everyone.' },
          ].map(v => `
            <div class="value-card">
              <div class="value-icon">${v.icon}</div>
              <h3>${v.title}</h3>
              <p>${v.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container section-center">
        <h2 class="section-title">Meet The Team</h2>
        <div class="team-grid" style="margin-top:32px;">
          ${[
            { name: 'Rahul Sharma', role: 'Founder & CEO', initials: 'RS' },
            { name: 'Priya Patel', role: 'CTO', initials: 'PP' },
            { name: 'Amit Singh', role: 'Head of Product', initials: 'AS' },
          ].map(t => `
            <div class="team-card">
              <div class="team-avatar">${t.initials}</div>
              <h3>${t.name}</h3>
              <p>${t.role}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ${renderFooter()}
  `;
  initLandingInteractions();
}

function renderFeatures() {
  app.innerHTML = `
    ${renderNavbar()}
    <section class="section" style="padding-top:140px;">
      <div class="container section-center">
        <div class="section-label"><span class="dot"></span> Features</div>
        <h1 class="section-title" style="font-size:2.8rem;">What's New in AlgoBeat</h1>
        <p class="section-desc">Execute trades directly from integrated charts with speed, reliability, and real-time market updates. Analyze trends, automate execution, and manage multiple segments effortlessly.</p>
      </div>
    </section>
    <section class="section" style="background:var(--surface-1);">
      <div class="container">
        ${[
          { title: 'Trade Execution with TradingView', desc: 'Execute trades directly from integrated charts with fast, reliable performance and real-time updates using our algo trading software.', date: 'Aug 23, 2025' },
          { title: 'Option Chain Simulator', desc: 'Full-fledged interactive option chain simulator with payoff visualization, Greeks analysis, and strategy templates.', date: 'Jan 15, 2026' },
          { title: 'Multi-Broker Integration', desc: 'Connect and trade across 8+ brokers simultaneously. Manage all your accounts from a single dashboard.', date: 'Mar 10, 2026' },
          { title: 'Advanced Backtesting Engine', desc: 'Test strategies against up to 2 years of historical data with credit-based flexible pricing.', date: 'May 1, 2026' },
        ].map(f => `
          <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:48px;align-items:center;margin-bottom:60px;">
            <div>
              <h3 style="font-size:1.3rem;font-weight:800;color:var(--white);margin-bottom:8px;">${f.title}</h3>
              <p style="font-size:0.88rem;color:var(--ghost);line-height:1.7;margin-bottom:8px;">${f.desc}</p>
              <span style="font-size:0.78rem;color:var(--ghost);">${f.date}</span>
            </div>
            <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;height:200px;display:flex;align-items:center;justify-content:center;color:var(--ghost);">
              Feature Preview
            </div>
          </div>
        `).join('')}
      </div>
    </section>
    ${renderFooter()}
  `;
  initLandingInteractions();
}

function renderPricingPage() {
  app.innerHTML = `
    ${renderNavbar()}
    <section class="section" style="padding-top:140px;">
      <div class="container section-center">
        <div class="section-label"><span class="dot"></span> Pricing</div>
        <h1 class="section-title" style="font-size:2.8rem;">Smart Options To Power<br>Your Trading Journey.</h1>
      </div>
    </section>
    ${renderPricingSection()}
    ${renderFAQSection()}
    ${renderFooter()}
  `;
  initLandingInteractions();
}

function renderContact() {
  app.innerHTML = `
    ${renderNavbar()}
    <section class="section" style="padding-top:140px;">
      <div class="container">
        <div class="section-center" style="margin-bottom:48px;">
          <div class="section-label"><span class="dot"></span> Contact</div>
          <h1 class="section-title" style="font-size:2.8rem;">Get In Touch</h1>
          <p class="section-desc">Have questions? We'd love to hear from you.</p>
        </div>
        <div class="contact-layout">
          <div>
            <div class="contact-info-card">
              <div class="contact-info-icon">${icons.mail}</div>
              <div class="contact-info-text"><h4>Email</h4><p>support@algobeat.com</p></div>
            </div>
            <div class="contact-info-card">
              <div class="contact-info-icon">${icons.phone}</div>
              <div class="contact-info-text"><h4>Phone</h4><p>+91 98765 43210</p></div>
            </div>
            <div class="contact-info-card">
              <div class="contact-info-icon">${icons.location}</div>
              <div class="contact-info-text"><h4>Office</h4><p>Mumbai, Maharashtra, India</p></div>
            </div>
          </div>
          <div class="contact-form-card">
            <form id="contact-form">
              <div class="form-grid">
                <div class="form-group"><label>First Name</label><input type="text" class="form-input" placeholder="John" required></div>
                <div class="form-group"><label>Last Name</label><input type="text" class="form-input" placeholder="Doe"></div>
              </div>
              <div class="form-group"><label>Email</label><input type="email" class="form-input" placeholder="john@example.com" required></div>
              <div class="form-group"><label>Subject</label><input type="text" class="form-input" placeholder="How can we help?"></div>
              <div class="form-group"><label>Message</label><textarea class="form-input" placeholder="Your message..." rows="4" required></textarea></div>
              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Send Message →</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    ${renderFooter()}
  `;
  
  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message sent! We\'ll get back to you soon.', 'success');
    e.target.reset();
  });
  initLandingInteractions();
}

function renderBlogs() {
  const allBlogs = [
    { tag: 'Options Strategy', title: 'Spread Chart in Options Trading: Complete Guide + How to Use It', date: 'May 11, 2026', icon: '📊', desc: 'Learn how spread charts can help you visualize multi-leg option strategies and make better trading decisions.' },
    { tag: 'Platform Guide', title: 'How to Trade Using Options Chart in AlgoBeat', date: 'May 7, 2026', icon: '📈', desc: 'Step-by-step guide to using our integrated options chart for real-time trading and analysis.' },
    { tag: 'Options Strategy', title: 'What is an Options Chart? How to Read, Analyze & Understand', date: 'May 4, 2026', icon: '📉', desc: 'Everything you need to know about reading option premium charts and understanding market dynamics.' },
    { tag: 'Backtesting', title: 'How to Backtest Your Trading Strategy Like a Pro', date: 'Apr 28, 2026', icon: '🔬', desc: 'Master the art of backtesting with our comprehensive guide covering period selection, credit usage, and result interpretation.' },
    { tag: 'Algo Trading', title: 'Getting Started with Algorithmic Trading in India', date: 'Apr 15, 2026', icon: '🤖', desc: 'A beginner-friendly introduction to algo trading, broker APIs, and automated strategy deployment.' },
    { tag: 'Risk Management', title: 'Stop-Loss Strategies for Options Traders', date: 'Apr 8, 2026', icon: '🛡️', desc: 'Essential stop-loss techniques to protect your capital while maximizing profit potential in options trading.' },
  ];
  
  app.innerHTML = `
    ${renderNavbar()}
    <section class="section" style="padding-top:140px;">
      <div class="container">
        <div class="section-center" style="margin-bottom:48px;">
          <div class="section-label"><span class="dot"></span> Blog</div>
          <h1 class="section-title" style="font-size:2.8rem;">Insights & Updates</h1>
          <p class="section-desc">Practical reads on trading strategies, platform updates, and market insights.</p>
        </div>
        <div class="blog-grid">
          ${allBlogs.map(b => `
            <div class="blog-card">
              <div class="blog-thumb"><span class="blog-thumb-icon">${b.icon}</span></div>
              <div class="blog-body">
                <div class="blog-tag">${b.tag}</div>
                <div class="blog-title">${b.title}</div>
                <p style="font-size:0.82rem;color:var(--ghost);margin:8px 0;line-height:1.5;">${b.desc}</p>
                <div class="blog-date">${b.date}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ${renderFooter()}
  `;
  initLandingInteractions();
}

// ═══ Helpers ═══
function getTemplates() {
  return [
    { name: 'Brahmastra Nifty Option Buying', desc: 'A powerful Nifty option buying setup utilizing a confluence of Moving Average, MACD and Supertrend indicators. It identifies high-probability entry points.' },
    { name: 'Sniper Nifty Option Buying', desc: 'A high-precision Nifty buying strategy trading weekly options with Wait & Trade execution. It focuses on rapid entries and re-entry patterns.' },
    { name: 'GOLDEN CROSSOVER NIFTY BUYING', desc: 'A momentum-based Nifty option buying strategy triggered by Moving Averages. It trades weekly ITM call or put options based on crossover signals.' },
    { name: '1% Strangle Nifty', desc: 'A Nifty 50 intraday short strangle selling weekly ITM options to capture Theta. It employs a 1% stop-loss with no fixed target.' },
    { name: 'Nifty ND and Option Buying', desc: 'A hybrid hedged strategy combining short strangles with protective long options. Uses weekly expiries and Wait & Trade execution.' },
    { name: 'GOLDEN CROSSOVER NIFTY SELLING', desc: 'A trend-based Nifty selling strategy using Moving Averages to execute short ITM call or put positions. Aims to capture premium decay.' },
    { name: 'Brahmastra Nifty Selling', desc: 'A trend-following Nifty option selling strategy using Moving Average, MACD and Supertrend. Enters short positions on confirmed trend signals.' },
    { name: '1% SL Strangle BNF', desc: 'An intraday Bank Nifty short strangle executing ITM call and put sells for premium decay. Features a strict 1% stop-loss on each leg.' },
    { name: '1.5% SL Strangle BNF', desc: 'An intraday Bank Nifty short strangle executing ITM call and put sells for premium decay. Features a 1.5% stop-loss with wider risk tolerance.' },
  ];
}

window.addTemplateToStrategy = function(name) {
  const template = getTemplates().find(t => t.name === name);
  if (template) {
    state.strategies.push({
      id: Date.now(),
      name: template.name,
      type: 'time',
      orderType: 'MIS',
      startTime: '09:16',
      squareOff: '15:15',
      legs: [{ position: 'BUY', optionType: 'Call', qty: 1, strike: 'ATM' }],
      segment: 'EQUITY',
      deployed: false,
      status: 'stopped',
      pnl: 0,
      createdAt: new Date().toISOString(),
    });
    saveState();
    showToast(`"${name}" added to your strategies!`, 'success');
    if (getRoute().startsWith('/strategies') || getRoute().startsWith('/dashboard')) render();
  }
};

// ── Make functions globally accessible ──
window.navigate = navigate;
window.showToast = showToast;
window.state = state;
window.saveState = saveState;
