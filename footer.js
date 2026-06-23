// Shared site footer — injected into <footer id="site-footer"></footer> on every page.
// Self-contained: ships its own styles (with hardcoded color fallbacks) so it renders
// identically whether or not the host page already defines the footer CSS.
document.addEventListener('DOMContentLoaded', function () {
  var footerEl = document.getElementById('site-footer');
  if (!footerEl) return;

  if (!document.getElementById('tp-footer-style')) {
    var style = document.createElement('style');
    style.id = 'tp-footer-style';
    style.textContent = [
      '#site-footer { display: contents; }',
      '.container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }',
      '.footer { background: var(--navy, #0f172a); border-top: 1px solid rgba(255,255,255,.07); padding: 56px 0 32px; }',
      '.footer-inner { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,.07); }',
      '.footer-brand-logo { margin-bottom: 10px; }',
      ".footer-tagline { font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,.72); letter-spacing: .02em; margin-bottom: 14px; }",
      '.footer-narrative { font-size: 13px; color: rgba(255,255,255,.5); line-height: 1.6; max-width: 480px; margin-bottom: 20px; }',
      '.footer-col-head { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #fff; margin-bottom: 16px; }',
      '.footer-col a { display: block; font-size: 14px; color: var(--muted, #94a3b8); margin-bottom: 10px; text-decoration: none; transition: color .15s; }',
      '.footer-col a:hover { color: #fff; }',
      '.footer-bottom { padding-top: 28px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: var(--muted, #94a3b8); flex-wrap: wrap; gap: 12px; }',
      '@media (max-width: 900px) { .footer-inner { grid-template-columns: 1fr 1fr; } }',
      '@media (max-width: 560px) { .footer-inner { grid-template-columns: 1fr; } }'
    ].join('\n');
    document.head.appendChild(style);
  }

  footerEl.innerHTML =
    '<div class="footer">' +
      '<div class="container">' +
        '<div class="footer-inner">' +
          '<div class="footer-brand">' +
            '<div class="footer-brand-logo"><img src="/img/twirlpower-logo-primary.png" alt="TwirlPower" style="width:125px;height:auto;display:block" /></div>' +
            '<div class="footer-tagline">Free for families. Always.</div>' +
            '<p class="footer-narrative">TwirlPower will always be free for families. Built by a twirling family, for twirling families.</p>' +
            '<a href="https://app.twirlpower.com" style="display:inline-block;background:var(--teal,#0d9488);color:#fff;font-size:13px;font-weight:700;padding:9px 18px;border-radius:8px;text-decoration:none;">Open App →</a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<div class="footer-col-head">Product</div>' +
            '<a href="/for-families">For Families</a>' +
            '<a href="/for-coaches">For Coaches</a>' +
            '<a href="/for-directors">For Directors</a>' +
            '<a href="/news">News &amp; Updates</a>' +
            '<a href="/about">About</a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<div class="footer-col-head">Directory</div>' +
            '<a href="https://directory.twirlpower.com/coaches">Find a Coach</a>' +
            '<a href="https://directory.twirlpower.com/clubs">Clubs</a>' +
            '<a href="https://directory.twirlpower.com/competitions">Competitions</a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<div class="footer-col-head">Organizations</div>' +
            '<a href="https://ustwirling.com" target="_blank" rel="noopener">USTA</a>' +
            '<a href="https://www.nbtainternational.com" target="_blank" rel="noopener">NBTA</a>' +
            '<a href="https://www.twirlingunlimited.com" target="_blank" rel="noopener">TU</a>' +
            '<a href="https://www.dmatwirl.org" target="_blank" rel="noopener">DMA</a>' +
            '<a href="https://www.aausports.org/baton-twirling" target="_blank" rel="noopener">AAU</a>' +
            '<a href="https://worldtwirling.cc" target="_blank" rel="noopener">WTA</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© 2026 TwirlPower, a dba of OAKRAA, LLC (Colorado)</span>' +
          '<span>' +
            '<a href="/privacy" style="color:var(--muted,#94a3b8);margin-right:16px;text-decoration:none;">Privacy Policy</a>' +
            '<a href="/terms" style="color:var(--muted,#94a3b8);text-decoration:none;">Terms</a>' +
          '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
});
