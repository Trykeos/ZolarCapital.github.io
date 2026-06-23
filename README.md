# Zolar Capital Website Starter, Version 3

This package contains an upgraded static website for zolarcapital.com.

## What changed in Version 3

- Sharper premium positioning
- New platform command center section
- Interactive product tabs on the homepage
- Stronger Request Early Access conversion path
- Better contact form routing fields
- Webhook URL constant in main.js
- Open Graph social preview image
- Apple touch icon and logo SVG
- Additional CRM tags for workflow type and timeline

## Pages included

- index.html
- solutions.html
- use-cases.html
- consulting.html
- about.html
- contact.html
- privacy.html

## Recommended launch setup

1. Use Microsoft 365 for email.
2. Host the website using one of these options:
   - Cloudflare Pages
   - Netlify
   - Vercel
   - Webflow rebuild using this copy and structure
   - Framer rebuild using this copy and structure
3. Point zolarcapital.com DNS to the chosen host.
4. Connect contact forms to the Zolar Campaign Manager webhook.
5. Add Google Analytics and Google Search Console.
6. Review the privacy page with legal counsel before publishing.

## Form integration

The form currently logs a structured payload in the browser console, simulates a short submit cycle, and shows a success message. In production, update this section in assets/js/main.js:

```js
await fetch('https://app.zolarcapital.com/api/public/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

Suggested fields:

- first_name
- last_name
- email
- phone
- company
- website
- industry
- main_interest
- message
- consent
- source
- tags
- submitted_at

Suggested tags:

- lead_website
- solution_document_reader
- solution_campaign_manager
- solution_workflow_manager
- service_consulting
- industry_construction
- industry_manufacturing
- industry_distribution
- industry_field_services
- industry_professional_services
- industry_industrial_services
- industry_b2b_sales

## Suggested subdomains

- zolarcapital.com: public website
- app.zolarcapital.com: future product login
- mail.zolarcapital.com: campaign sending infrastructure
- m.zolarcapital.com: tracking or campaign links
- demo.zolarcapital.com: demos or staging

## DNS and email notes

For Microsoft 365, configure SPF, DKIM, and DMARC before sending campaigns. Use a sending subdomain for marketing email instead of sending all campaigns from the root domain.
