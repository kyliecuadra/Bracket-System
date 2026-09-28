import type { IconName } from './types';

/** Audience-focused solutions. Each links to what already exists: the product, a service, or past work. */
export const solutions: { id: string; title: string; icon: IconName; who: string; body: string; points: string[]; cta: { label: string; href: string } }[] = [
  {
    id: 'hr-teams', title: 'HR & payroll teams', icon: 'people', who: 'For HR managers, HR officers and payroll staff',
    body: 'Replace spreadsheets and disconnected tools with one platform where records, time, leave and pay stay consistent.',
    points: ['Employee 360 records with reporting lines', 'Payroll with review, approval and separation of duties', 'Statutory contributions and withholding computed from versioned tables', 'Self-service that takes payslip and leave questions off your desk'],
    cta: { label: 'See HR & Payroll', href: '/products/hr-payroll' },
  },
  {
    id: 'businesses', title: 'Growing businesses', icon: 'briefcase', who: 'For owners and operations leads',
    body: 'Custom business platforms for the way your company actually runs — sales, operations, loyalty, reporting.',
    points: ['Operations platforms and internal tools', 'Checkout, loyalty and revenue reporting', 'Built in small increments you can try early'],
    cta: { label: 'See our services', href: '/services' },
  },
  {
    id: 'institutions', title: 'Schools & institutions', icon: 'school', who: 'For administrators and records offices',
    body: 'Document-heavy processes moved into audited systems: accreditation vaults, document routing, OCR extraction.',
    points: ['Centralized, audited document storage', 'Version-locking and granular file permissions', 'Scanning, OCR and routing of paper files'],
    cta: { label: 'See the Cavite State University project', href: '/work/accreditation-dms' },
  },
  {
    id: 'operations', title: 'Safety & operations', icon: 'eye', who: 'For plant, safety and facility teams',
    body: 'Computer vision that watches what people can\'t watch all day, and turns video into compliance information.',
    points: ['Real-time object detection on video feeds', 'Custom-trained models for your equipment and gear', 'Results as data, not just footage'],
    cta: { label: 'See the PPE Scanner', href: '/work/ppe-scanner' },
  },
  {
    id: 'it-teams', title: 'IT teams', icon: 'server', who: 'For the people who install, secure and run systems',
    body: 'Software that is honest about how it runs: documented deployment, health checks, masked logs, role-based access.',
    points: ['Self-hosted with Docker Compose and nginx', 'SSO (OpenID Connect) and LDAP / Active Directory', 'Operations Center with health, alerts and a Log Extractor', 'Java and Spring Boot backends and APIs'],
    cta: { label: 'Read the security overview', href: '/security' },
  },
];

export const faq: { q: string; a: string }[] = [
  { q: 'Is HR & Payroll a cloud service?', a: 'Not today. HR & Payroll is installed on your own infrastructure (self-hosted or on-premises) with Docker Compose behind nginx. A packaged Kubernetes or managed-cloud option isn\'t available yet.' },
  { q: 'Which statutory contributions does payroll compute?', a: 'SSS, PhilHealth and Pag-IBIG (employee and employer shares) and BIR withholding tax, from versioned statutory tables. Each payslip records the rule versions it used. As with any payroll system, have your accountant review the configuration against current rules before going live.' },
  { q: 'Can employees see their own payslips?', a: 'Yes. Employees see only their own payslips, and only from finalized payroll runs — with the full breakdown and a PDF.' },
  { q: 'Does it work with biometric time clocks?', a: 'It supports the ZKTeco push protocol (ADMS / "iclock") and a generic HTTP pull. It was built against the published protocol; confirm it with your device firmware during setup.' },
  { q: 'Can we sign in with our company accounts?', a: 'Yes: single sign-on through any OpenID Connect provider, or LDAP / Active Directory for on-premises installs. Two-factor authentication is built in.' },
  { q: 'How much does it cost?', a: 'Pricing depends on the edition and on the number of employees, branches and users. Tell us about your company and we\'ll send a quote.' },
  { q: 'Is there a live demo?', a: 'The product tour on this site uses screenshots of the real application with fictional data. For a walkthrough of the running system, request a demo and we\'ll schedule one.' },
  { q: 'Do you build custom software too?', a: 'Yes — web platforms, Java and Spring Boot backends, computer vision and OCR, and enterprise systems. See our services and selected work.' },
];

/** Product guides that ship with HR & Payroll (in its repository's docs/). Shared with customers on request. */
export const guides = [
  { title: 'User Guide', body: 'Every screen for employees, managers and HR, with screenshots.' },
  { title: 'Administrator Guide', body: 'People, pay, reports, users, security settings, license and the Operations Center.' },
  { title: 'Installation & Setup Guide', body: 'Requirements, configuration and a first installation with Docker Compose.' },
  { title: 'Technical Documentation', body: 'Architecture, services, data, security model and known limitations.' },
  { title: 'Operations & Maintenance Guide', body: 'Health, alerts, backups, upgrades, logging and troubleshooting.' },
];

/** Highlights from the HR & Payroll changelog. */
export const releaseNotes = [
  { date: '2026-09-28', title: 'Fixes from full-data testing', items: ['Payslips named by pay period and pay date', 'Clear 405/400/404 answers instead of server errors for bad requests', 'The gateway follows services that restart on a new address'] },
  { date: '2026-09-28', title: 'Reporting line', items: ['Each employee can have a manager; the record shows the line up to the top and the direct reports'] },
  { date: '2026-09-28', title: 'Fill in qualifications from a CV', items: ['Built-in rules or optional AI suggest education, experience, certifications and skills for review'] },
  { date: '2026-09-28', title: 'Branding and sessions', items: ['Product name, colours and logo per installation', 'Sessions survive a page reload through a secure, HttpOnly cookie'] },
  { date: '2026-09-28', title: 'Operations and logs', items: ['Operations Center with health, alerts and maintenance windows', 'Log Extractor with masked personal data'] },
  { date: '2026-09-27', title: 'New web interface', items: ['Payroll, attendance, leave, documents, CV and policy screens on a new design system'] },
];
