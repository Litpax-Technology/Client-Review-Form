<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#141418" />
  <meta name="description" content="Share your experience with Litpax. We don't sell products, we sell service." />
  <title>Litpax | Customer Feedback</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="icon" type="image/png" href="assets/icon-192.png" />
  <link rel="apple-touch-icon" href="assets/icon-192.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- ================= PUBLIC REVIEW FORM ================= -->
  <div id="publicView">
    <header class="hero">
      <div class="hero-glow glow-red"></div>
      <div class="hero-glow glow-yellow"></div>
      <div class="hero-lines"></div>

      <div class="hero-inner">
        <div class="logo" id="heroLogo"></div>
        <span class="eyebrow" id="heroEyebrow"><span class="sk sk-line w-120"></span></span>
        <h1 id="heroTitle"><span class="sk sk-line w-full"></span><span class="sk sk-line w-60"></span></h1>
        <p id="heroSubtitle" class="hero-sub"><span class="sk sk-line w-80"></span></p>
        <div class="tagline-strip" aria-live="polite">
          <span class="bolt-dot"></span>
          <span id="rotTagline" class="rot-tagline"></span>
        </div>
      </div>
    </header>

    <main class="form-wrap">
      <!-- Form -->
      <form id="reviewForm" class="review-card" novalidate autocomplete="on">
        <div class="charge-bar">
          <div class="battery" aria-hidden="true">
            <div class="battery-fill" id="chargeFill"></div>
          </div>
          <div class="charge-text">
            <strong id="chargePct">0%</strong>
            <span>Feedback charged</span>
          </div>
        </div>

        <section class="block">
          <div class="block-head">
            <span class="block-num">01</span>
            <div>
              <h2>Your Details</h2>
              <p class="block-tag">So we can thank you personally</p>
            </div>
          </div>
          <div class="field-grid">
            <label class="field">
              <span class="field-label">Full Name <em>*</em></span>
              <input id="fName" name="name" class="input" type="text" maxlength="60" autocomplete="name" placeholder="Enter your name" />
              <span class="field-err" data-for="fName"></span>
            </label>
            <label class="field">
              <span class="field-label">Mobile Number <em>*</em></span>
              <div class="phone-wrap">
                <span class="phone-prefix">+91</span>
                <input id="fPhone" name="tel" class="input" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national" placeholder="10-digit mobile number" />
              </div>
              <span class="field-err" data-for="fPhone"></span>
            </label>
            <label class="field">
              <span class="field-label">City <span class="opt">Optional</span></span>
              <input id="fCity" name="city" class="input" type="text" maxlength="40" autocomplete="address-level2" placeholder="Your city" />
            </label>
            <label class="field hidden" id="productField">
              <span class="field-label">Product Purchased <span class="opt">Optional</span></span>
              <select id="fProduct" class="input select"></select>
            </label>
          </div>
        </section>

        <section class="block">
          <div class="block-head">
            <span class="block-num">02</span>
            <div>
              <h2>Rate Your Experience</h2>
              <p class="block-tag">Tap the stars. Every rating makes us better.</p>
            </div>
          </div>
          <div id="ratingGrid" class="rating-grid"></div>
          <span class="field-err" data-for="ratings"></span>
        </section>

        <section class="block">
          <div class="block-head">
            <span class="block-num">03</span>
            <div>
              <h2>Share Your Ideas</h2>
              <p class="block-tag" id="suggestTag"></p>
            </div>
          </div>
          <label class="field">
            <span class="field-label">Suggestions <span class="opt">Optional</span></span>
            <textarea id="fSuggestion" class="input textarea" maxlength="500" rows="4" placeholder="Tell us what we can do better, or what you loved..."></textarea>
            <span class="counter"><span id="sugCount">0</span>/500</span>
          </label>
        </section>

        <!-- honeypot (hidden from humans) -->
        <input type="text" id="fWebsite" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <div id="formErr" class="form-err hidden" role="alert"></div>

        <button type="submit" id="submitBtn" class="btn-submit">
          <span class="btn-label">Submit Feedback</span>
          <svg class="btn-bolt" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>
          <span class="btn-spinner"></span>
        </button>
        <p class="privacy">Your details are used only to serve you better. We never share them.</p>
      </form>

      <!-- Thank you -->
      <section id="thankView" class="thank-card hidden" aria-live="polite">
        <div class="thank-top">
          <div class="t-glow" aria-hidden="true"></div>
          <div class="t-sparks" id="tSparks" aria-hidden="true"></div>
          <div class="thank-battery">
            <div class="tb-body"><div class="tb-fill"></div>
              <svg class="tb-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
            </div>
            <div class="tb-cap"></div>
          </div>
          <span class="t-badge">Feedback Received</span>
          <h2 id="thankName" class="t-name"></h2>
          <h3 id="thankTitle" class="t-title"></h3>
          <p id="thankText" class="t-text"></p>
          <p id="thankWish" class="t-wish"></p>
        </div>
        <div class="thank-avg" id="thankAvg"></div>
        <div id="thankSummary" class="thank-summary"></div>
        <div id="thankLow" class="thank-low hidden"></div>
        <div id="thankGoogle" class="thank-google hidden">
          <p id="googleText"></p>
          <a id="googleBtn" class="btn-google" href="#" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
            Rate us on Google
          </a>
        </div>
        <p class="thank-ref">Reference ID: <strong id="thankRef"></strong></p>
        <button type="button" id="againBtn" class="btn-ghost-dark">Back to form</button>
      </section>

      <!-- Load failure -->
      <section id="loadFail" class="thank-card hidden">
        <h2>We couldn't connect</h2>
        <p class="thank-text">Please check your internet connection and try again.</p>
        <button type="button" id="retryLoad" class="btn-submit small">Try Again</button>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-logo" id="footerLogo"></div>
      <strong id="footerLine"></strong>
      <span id="footerSub"></span>
      <small id="footerCompany"></small>
    </footer>
  </div>

  <!-- ================= ADMIN (open with #admin) ================= -->
  <div id="adminView" class="admin hidden">
    <div id="loginView" class="login-wrap">
      <div class="login-card fade-in">
        <div class="login-head"><div class="logo small" id="loginLogo"></div></div>
        <div class="login-body">
          <h2>Feedback Admin</h2>
          <p class="muted">Enter your PIN to continue</p>
          <input id="pin" class="input pin-input" type="password" inputmode="numeric" maxlength="8" placeholder="••••" autocomplete="current-password" />
          <button id="loginBtn" class="btn btn-primary btn-block">Log In</button>
          <div id="loginErr" class="err"></div>
          <a href="#" class="back-link">← Back to feedback form</a>
        </div>
      </div>
    </div>

    <div id="adminApp" class="app hidden">
      <aside class="sidebar">
        <div class="side-logo" id="sideLogo"></div>
        <nav id="nav" class="nav"></nav>
        <div class="side-foot">
          <div class="who" id="who"></div>
          <button id="logoutBtn" class="btn btn-side">Log Out</button>
        </div>
      </aside>
      <main class="content">
        <header class="topbar">
          <h1 id="pageTitle">Dashboard</h1>
          <div class="topbar-actions">
            <button id="refreshBtn" class="btn btn-ghost" title="Refresh">
              <svg viewBox="0 0 24 24" class="ico"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg>
              <span>Refresh</span>
            </button>
          </div>
        </header>
        <section id="page" class="page"></section>
      </main>
    </div>
  </div>

  <!-- Modal -->
  <div id="modal" class="modal-back hidden">
    <div class="modal" role="dialog" aria-modal="true">
      <button class="modal-x" id="modalClose" aria-label="Close">×</button>
      <div id="modalBody"></div>
    </div>
  </div>

  <!-- Welcome / festive card (shows before the form) -->
  <div id="welcome" class="welcome hidden" role="dialog" aria-modal="true" aria-labelledby="wTitle">
    <div class="w-sparkles" id="wSparkles" aria-hidden="true"></div>
    <div class="w-frame">
      <div class="w-card">
        <button type="button" class="w-close" id="wClose" aria-label="Close">
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="w-glow" aria-hidden="true"></div>
        <div class="w-logo"><div class="logo small" id="wLogo"></div></div>
        <span class="w-badge w-in" id="wBadge"></span>
        <h2 id="wTitle" class="w-title w-in"></h2>
        <p id="wText" class="w-text w-in"></p>
        <div class="w-points w-in" id="wPoints"></div>
        <div class="w-tagline w-in"><span class="bolt-dot"></span><span id="wTagline" class="rot-tagline"></span></div>
        <button type="button" class="btn-submit w-cta w-in" id="wCta">
          <span class="btn-label" id="wCtaLabel"></span>
          <svg class="btn-bolt" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>
        </button>
        <p class="w-sign w-in" id="wSign"></p>
      </div>
    </div>
  </div>

  <div id="confetti" class="confetti" aria-hidden="true"></div>
  <div id="toast" class="toast" role="status"></div>

  <script src="config.js"></script>
  <script src="app.js"></script>
</body>
</html>
