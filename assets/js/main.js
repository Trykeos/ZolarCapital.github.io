
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 30, 240)}ms`;
    observer.observe(item);
  });
} else {
  reveals.forEach((item) => item.classList.add('visible'));
}

const ZOLAR_WEBHOOK_URL = ''; // Add your Zolar Campaign Manager webhook URL here.

const forms = document.querySelectorAll('[data-zolar-form="lead"]');

forms.forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    payload.tags = buildTags(payload);
    payload.submitted_at = new Date().toISOString();

    if (submitButton) submitButton.disabled = true;
    if (status) status.textContent = 'Submitting...';

    try {
      console.log('Zolar lead payload:', payload);

      if (ZOLAR_WEBHOOK_URL) {
        await fetch(ZOLAR_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      // Production integration:
      // Replace the console line above with a POST to your Zolar Campaign Manager webhook.
      // Example:
      // await fetch('https://app.zolarcapital.com/api/public/leads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });

      await new Promise((resolve) => setTimeout(resolve, 700));
      if (status) status.textContent = 'Thank you. Your inquiry has been captured for follow-up.';
      form.reset();
    } catch (error) {
      console.error(error);
      if (status) status.textContent = 'Something went wrong. Please email contact@zolarcapital.com.';
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});

function buildTags(payload) {
  const tags = ['lead_website'];
  const interest = (payload.main_interest || '').toLowerCase();
  const industry = (payload.industry || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

  if (interest.includes('document')) tags.push('solution_document_reader');
  if (interest.includes('campaign') || interest.includes('crm')) tags.push('solution_campaign_manager');
  if (interest.includes('workflow')) tags.push('solution_workflow_manager');
  if (interest.includes('consulting')) tags.push('service_consulting');
  const workflowType = (payload.workflow_type || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
  const timeline = (payload.timeline || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

  if (industry) tags.push(`industry_${industry}`);
  if (workflowType) tags.push(`workflow_${workflowType}`);
  if (timeline) tags.push(`timeline_${timeline}`);
  if (timeline === 'now' || timeline === 'next_30_days') tags.push('lead_high_intent');

  return tags;
}


const productTabBlocks = document.querySelectorAll('[data-product-tabs]');
productTabBlocks.forEach((block) => {
  const buttons = block.querySelectorAll('[data-tab]');
  const panels = block.querySelectorAll('[data-tab-panel]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.tab;
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === selected));
    });
  });
});
