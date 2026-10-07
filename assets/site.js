const root = document.body.dataset.root || './';
const current = document.body.dataset.current || '';

const navItem = (key, path, label) => `<a href="${root}${path}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`;

const headerSlot = document.querySelector('[data-site-header]');
if (headerSlot) {
  headerSlot.outerHTML = `
    <div class="topbar"><div class="container"><span>Singapore-based infrastructure engineering</span><span class="topbar-right">UEN 201817304M &nbsp;·&nbsp; <a href="mailto:support@veyronsg.com">support@veyronsg.com</a></span></div></div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="${root}" aria-label="Veyron, home"><img src="${root}assets/veyron-logo.svg" alt="Veyron Infrastructure Engineering" width="210" height="53"></a>
        <button class="menu-button" type="button" data-menu-button aria-expanded="false" aria-controls="site-nav"><span class="bars" aria-hidden="true"></span>Menu</button>
        <nav class="site-nav" id="site-nav" data-site-nav aria-label="Primary navigation">
          ${navItem('about', 'about/', 'About')}
          ${navItem('services', 'services/', 'Services')}
          ${navItem('approach', 'approach/', 'Approach')}
          ${navItem('sectors', 'sectors/', 'Sectors')}
          ${navItem('insights', 'insights/', 'Insights')}
          ${navItem('careers', 'careers/', 'Careers')}
          <a class="nav-cta" href="${root}contact/"${current === 'contact' ? ' aria-current="page"' : ''}>Contact</a>
        </nav>
      </div>
    </header>`;
}

const footerSlot = document.querySelector('[data-site-footer]');
if (footerSlot) {
  footerSlot.outerHTML = `
    <footer class="site-footer"><div class="container">
      <div class="footer-grid">
        <div class="footer-intro"><a href="${root}"><img class="footer-logo" src="${root}assets/veyron-logo.svg" alt="Veyron Infrastructure Engineering" width="220" height="55"></a><p>Independent engineering review and temporary-works design for infrastructure.</p></div>
        <div class="footer-col"><h3>Expertise</h3><a href="${root}services/">Services</a><a href="${root}approach/">Approach</a><a href="${root}sectors/">Sectors</a><a href="${root}insights/">Insights</a></div>
        <div class="footer-col"><h3>Company</h3><a href="${root}about/">About</a><a href="${root}careers/">Careers</a><a href="${root}faq/">FAQ</a><a href="${root}contact/">Contact</a><a href="${root}privacy/">Privacy</a><a href="${root}terms/">Terms</a><a href="${root}cookies/">Cookies</a></div>
        <div class="footer-col"><h3>Singapore office</h3><p>138 Robinson Road, #24-01<br>Oxley Tower<br>Singapore 068906</p><a href="mailto:support@veyronsg.com">support@veyronsg.com</a><p>UEN 201817304M</p></div>
      </div>
      <div class="footer-bottom"><span>© <span data-year></span> Veyron Infrastructure Engineering Pte. Ltd.</span><span>Singapore · veyronsg.com</span></div>
    </div></footer>
    <aside class="cookie-banner" data-cookie-banner hidden aria-label="Cookie notice"><h2>Cookies on this site</h2><p>We use essential storage for site preferences. Analytics cookies will only be enabled when configured and accepted.</p><div class="cookie-actions"><button class="button" type="button" data-cookie-choice="accepted">Accept</button><button class="button button-secondary" type="button" data-cookie-choice="essential">Essential only</button><a class="text-link" href="${root}cookies/">Learn more</a></div></aside>`;
}

const menuButton = document.querySelector('[data-menu-button]');
const siteNav = document.querySelector('[data-site-nav]');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    siteNav.classList.toggle('is-open', !open);
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  }));
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const analytics = (eventName, params = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
};

document.querySelectorAll('a.button, .nav-cta').forEach((link) => {
  link.addEventListener('click', () => analytics('cta_click', {
    cta_text: link.textContent.trim(),
    cta_url: link.getAttribute('href')
  }));
});

document.querySelectorAll('a[href^="http"], a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => analytics('outbound_click', { link_url: link.href }));
});

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('[data-form-status]');
    const data = new FormData(form);

    if (data.get('website')) {
      status.textContent = 'Unable to submit this enquiry.';
      return;
    }

    const subject = `Website enquiry — ${data.get('name') || 'New contact'}, ${data.get('company') || 'Company not provided'}`;
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Company: ${data.get('company') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      '',
      'Message:',
      data.get('message') || ''
    ].join('\n');

    analytics('form_submit', { form_name: 'contact' });
    status.textContent = 'Your email application is opening with the enquiry pre-filled.';
    window.location.href = `mailto:support@veyronsg.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const cookieBanner = document.querySelector('[data-cookie-banner]');
if (cookieBanner) {
  const savedChoice = localStorage.getItem('veyron-cookie-choice');
  if (!savedChoice) cookieBanner.hidden = false;

  cookieBanner.querySelectorAll('[data-cookie-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const choice = button.dataset.cookieChoice;
      localStorage.setItem('veyron-cookie-choice', choice);
      cookieBanner.hidden = true;
      analytics('cookie_consent_update', { choice });
    });
  });
}

const depths = [25, 50, 75, 100];
const tracked = new Set();
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  if (total <= 0) return;
  const depth = Math.round((window.scrollY / total) * 100);
  depths.forEach((mark) => {
    if (depth >= mark && !tracked.has(mark)) {
      tracked.add(mark);
      analytics('scroll_depth', { percent_scrolled: mark });
    }
  });
}, { passive: true });
