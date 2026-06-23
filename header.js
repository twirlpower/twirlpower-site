// Shared site header — injected into <header id="site-header"></header> on every page.
// Self-contained: ships its own styles (with hardcoded color fallbacks) so it renders
// identically whether or not the host page already defines the nav CSS.
document.addEventListener('DOMContentLoaded', function () {
  var headerEl = document.getElementById('site-header');
  if (!headerEl) return;

  if (!document.getElementById('tp-header-style')) {
    var style = document.createElement('style');
    style.id = 'tp-header-style';
    style.textContent = [
      // #site-header carries no box so the sticky .nav inside it sticks to the
      // viewport (a normal wrapper box would scroll the nav away).
      '#site-header { display: contents; }',
      '.container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }',
      '.nav { position: sticky; top: 0; z-index: 200; background: rgba(15,23,42,.96); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,.07); }',
      '.nav-inner { display: flex; align-items: center; height: 62px; gap: 32px; }',
      '.nav-logo { flex-shrink: 0; text-decoration: none; display: flex; align-items: center; }',
      '.nav-brand { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }',
      ".nav-tagline { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; color: rgba(255,255,255,.6); letter-spacing: .02em; white-space: nowrap; padding-left: 14px; border-left: 1px solid rgba(255,255,255,.18); }",
      '.nav-links { display: flex; align-items: center; gap: 4px; flex: 1; }',
      '.nav-link { font-size: 14px; font-weight: 500; color: var(--muted, #94a3b8); padding: 6px 12px; border-radius: 7px; text-decoration: none; transition: color .15s, background .15s; }',
      '.nav-link:hover { color: #fff; background: rgba(255,255,255,.07); }',
      '.nav-cta { margin-left: auto; background: var(--teal, #0d9488); color: #fff; font-size: 13px; font-weight: 700; padding: 8px 18px; border-radius: 8px; text-decoration: none; transition: background .15s, transform .15s; flex-shrink: 0; }',
      '.nav-cta:hover { background: var(--teal-dark, #0f766e); transform: translateY(-1px); color: #fff; }',
      '.nav-mobile-btn { display: none; background: none; border: none; cursor: pointer; color: #fff; margin-left: auto; padding: 4px; }',
      '.nav-mobile-menu { display: none; flex-direction: column; background: var(--navy2, #1e293b); border-top: 1px solid rgba(255,255,255,.08); padding: 12px 0; }',
      '.nav-mobile-menu.open { display: flex; }',
      '.nav-mobile-menu a { font-size: 15px; font-weight: 500; color: var(--muted, #94a3b8); padding: 12px 24px; text-decoration: none; transition: color .15s; }',
      '.nav-mobile-menu a:hover { color: #fff; }',
      '@media (max-width: 768px) { .nav-tagline { display: none; } }',
      '@media (max-width: 900px) { .nav-links { display: none; } .nav-cta { display: none; } .nav-mobile-btn { display: flex; } }'
    ].join('\n');
    document.head.appendChild(style);
  }

  var links = [
    ['/for-families', 'For Families'],
    ['/for-coaches', 'For Coaches'],
    ['/for-directors', 'For Directors'],
    ['https://directory.twirlpower.com', 'Directory'],
    ['/news', 'News'],
    ['/about', 'About']
  ];
  var navLinks = links.map(function (l) {
    return '<a href="' + l[0] + '" class="nav-link">' + l[1] + '</a>';
  }).join('');
  var menuLinks = links.map(function (l) {
    return '<a href="' + l[0] + '">' + l[1] + '</a>';
  }).join('');

  // Normalized current path — clean URLs ("/for-directors") and ".html" URLs both collapse to the same value.
  var path = window.location.pathname.replace(/\.html$/, '');
  if (path.length > 1 && path.charAt(path.length - 1) === '/') path = path.slice(0, -1);

  // The For Directors page sells the director platform, so it keeps its own CTA
  // instead of the family-app "Open App →".
  var isDirectors = (path === '/for-directors');
  var ctaText = isDirectors ? 'Open Director Platform →' : 'Open App →';
  var ctaHref = isDirectors ? 'https://manage.twirlpower.com' : 'https://app.twirlpower.com';

  headerEl.innerHTML =
    '<nav class="nav">' +
      '<div class="container">' +
        '<div class="nav-inner">' +
          '<div class="nav-brand">' +
            '<a href="/" class="nav-logo"><img src="/img/twirlpower-logo-primary.png" alt="TwirlPower" style="width:110px;height:auto;display:block" /></a>' +
            '<span class="nav-tagline">Free for families. Always.</span>' +
          '</div>' +
          '<div class="nav-links">' + navLinks + '</div>' +
          '<a href="' + ctaHref + '" class="nav-cta">' + ctaText + '</a>' +
          '<button class="nav-mobile-btn" aria-label="Menu">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
              '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="nav-mobile-menu" id="tp-mobile-menu">' + menuLinks +
        '<a href="' + ctaHref + '" style="color:var(--teal,#0d9488);font-weight:700;">' + ctaText + '</a>' +
      '</div>' +
    '</nav>';

  // Mobile menu toggle
  var btn = headerEl.querySelector('.nav-mobile-btn');
  var menu = headerEl.querySelector('#tp-mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () { menu.classList.toggle('open'); });
  }

  // Active-page highlight (inline styles only — no extra CSS needed).
  var anchors = headerEl.querySelectorAll('.nav-links .nav-link');
  for (var i = 0; i < anchors.length; i++) {
    var href = anchors[i].getAttribute('href');
    if (href && href.charAt(0) === '/' && href !== '/' && href.indexOf('#') === -1) {
      if (path === href || path.indexOf(href + '/') === 0) {
        anchors[i].style.color = '#fff';
        anchors[i].style.background = 'rgba(255,255,255,.07)';
      }
    }
  }
});
