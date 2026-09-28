/**
 * HR & Payroll: every claim below was checked against the product's code and documentation (the HR Payroll System
 * repository: routes in frontend/src/app/App.tsx, license editions in license-service License.Edition, the
 * Administrator Guide, INTEGRATIONS.md, SECURITY.md, ENTERPRISE_READINESS_REPORT.md) on 28 Sep 2026.
 * `status` keeps planned or API-only features from reading as finished screens.
 */
import type { Product } from '../types';

export const hrPayroll: Product = {
  slug: 'hr-payroll',
  name: 'HR & Payroll',
  fullName: 'Bracket Systems HR & Payroll',
  tag: '[ FLAGSHIP PRODUCT ]',
  headline: 'One connected platform for people, pay and time.',
  summary:
    'Employee records, Philippine payroll, attendance, leave, documents, reports and self-service in one platform — with the controls and operations tooling IT teams expect.',
  audience: 'Built for Philippine companies, installed on your own infrastructure.',
  heroShot: 'dashboard',

  /** Tabs of the product tour on the home page and /demo (ids from src/data/screenshots.json). */
  tour: [
    { id: 'dashboard', label: 'Dashboard', caption: 'What needs attention today: headcount, pending leave, the latest payroll cost and quick actions — for the signed-in role.' },
    { id: 'employees', label: 'Employees', caption: 'The directory, filtered by status, department and branch, limited to the records the user may see.' },
    { id: 'employee-record', label: 'Employee 360', caption: 'One record in tabs: profile, employment and the reporting line up to the top, government IDs, family, compensation, CV and documents.' },
    { id: 'payroll-run', label: 'Payroll', caption: 'A run moves through draft, calculated, submitted, review, approval and finalization — each step with its own permission.' },
    { id: 'attendance', label: 'Attendance', caption: 'Daily timesheets with lateness and undertime, audited corrections and overtime approvals.' },
    { id: 'leave', label: 'Leave', caption: 'Leave requests across the company, decided by the people allowed to decide them.' },
    { id: 'my-payslips', label: 'Self-service', caption: 'Employees see their own finalized payslips with the full breakdown and a PDF, plus leave, attendance, documents and CV.' },
    { id: 'reports', label: 'Reports', caption: 'Payroll register, remittance summaries, masterlists, attendance, leave, headcount and 13th-month reports as CSV, XLSX or PDF.' },
    { id: 'roles', label: 'Administration', caption: 'Roles built from fine-grained permissions, with record scopes by branch or department.' },
    { id: 'system-health', label: 'System health', caption: 'The Operations Center checks every service and data store, raises alerts and schedules maintenance windows.' },
    { id: 'log-extractor', label: 'Log Extractor', caption: 'Search, follow and export logs across services — personal data masked, every search recorded in the audit trail.' },
  ],

  modules: [
    {
      id: 'employees', title: 'Employee records', icon: 'people', shot: 'employee-record', status: 'available',
      summary: 'Every employee in one record — an "Employee 360" organised in tabs.',
      points: [
        'Profile, employment, government IDs, family and emergency contacts, compensation, CV and documents',
        'Reporting line: who each employee reports to, up to the top, and their direct reports',
        'Employment history with effective dates; separation with its own confirmed action',
        'Directory search and filters, limited to each user\'s record scope',
      ],
    },
    {
      id: 'payroll', title: 'Philippine payroll', icon: 'payroll', shot: 'payroll-run', status: 'available',
      summary: 'Payroll runs with review, approval and separation of duties, computed from versioned statutory tables.',
      points: [
        'SSS, PhilHealth, Pag-IBIG contributions (employee and employer shares) and BIR withholding tax',
        'Overtime, holiday premiums, rest-day pay, night differential, absences, tardiness and unpaid leave',
        'Allowances, taxable and de minimis benefits, 13th-month pay, loans and final-pay runs',
        'Draft → calculated → submitted → review → approved → finalized; reversals create a linked correction run',
        'Each payslip records the statutory rule versions it was computed with',
      ],
    },
    {
      id: 'attendance', title: 'Attendance & time', icon: 'clock', shot: 'attendance', status: 'available',
      summary: 'Time in and out, shifts, lateness and undertime, feeding straight into payroll.',
      points: [
        'Timesheets with worked time, lateness, undertime and status',
        'Corrections with a reason, audited — nobody corrects their own record',
        'Overtime requests approved in full, in part, or declined with a reason',
        'Work locations with an optional geofence and time zone',
        'Biometric time-clock integration (ZKTeco push protocol)',
      ],
    },
    {
      id: 'leave', title: 'Leave', icon: 'calendar', shot: 'leave', status: 'available',
      summary: 'Balances, requests and approvals, with unpaid leave flowing into payroll.',
      points: [
        'Employees file leave and see their balances',
        'Managers and HR decide within their scope',
        'Leave types and allocations are managed through the API today',
      ],
    },
    {
      id: 'self-service', title: 'Employee self-service', icon: 'person', shot: 'my-payslips', status: 'available',
      summary: 'Employees handle their own records from a browser or phone.',
      points: [
        'Payslips with the full breakdown and a PDF',
        'Leave, attendance and overtime, documents, policies to acknowledge',
        'CV and qualifications — fill them in from an uploaded CV with built-in rules or optional AI, reviewed before saving',
        'Announcements, recognition, notifications and privacy requests',
      ],
    },
    {
      id: 'documents', title: 'Documents', icon: 'document', shot: 'documents', status: 'available',
      summary: 'Employee documents stored encrypted, scanned for viruses, tracked for expiry.',
      points: [
        'Document types the company keeps, with renewals across the user\'s scope',
        'Files encrypted at rest (AES-256-GCM) and scanned by ClamAV before they are accepted',
        'Expiring and expired documents listed for HR',
      ],
    },
    {
      id: 'reports', title: 'Reports & insights', icon: 'chart', shot: 'reports', status: 'available',
      summary: 'Reports generated in the background, as CSV, XLSX or PDF.',
      points: [
        'Payroll register, government remittance summaries, employee masterlist',
        'Attendance and leave summaries, headcount, turnover, lates and absences, leave balances, 13th month',
        'Saved report definitions; insights on headcount, hires, separations and payroll',
      ],
    },
    {
      id: 'administration', title: 'Administration & security', icon: 'shield', shot: 'roles', status: 'available',
      summary: 'Access control that matches how HR and payroll teams actually divide work.',
      points: [
        'Roles from fine-grained permissions; record scopes by branch or department',
        'Two-factor authentication, sign-in policy, admin IP allowlist',
        'Single sign-on with OpenID Connect; LDAP / Active Directory for on-premises installs',
        'Branding: product name, colours and logo per installation',
      ],
    },
    {
      id: 'operations', title: 'Operations Center', icon: 'pulse', shot: 'system-health', status: 'available',
      summary: 'Health, alerts, maintenance windows and logs for the people who run the system.',
      points: [
        'Health of every service and data store, with alerts',
        'Maintenance windows: the platform answers "under maintenance" while you work',
        'Log Extractor: search, follow and export logs across services, with personal data masked',
      ],
    },
    {
      id: 'integrations', title: 'Integrations', icon: 'plug', status: 'available',
      summary: 'Connections to the systems around payroll.',
      points: [
        'Biometric time clocks (ZKTeco push; a generic HTTP pull) — validate against your device firmware',
        'Bank payee accounts and bank disbursement files in configurable fixed-width layouts',
        'Accounting journal exports and webhooks',
        'Audit export to your SIEM',
      ],
    },
    {
      id: 'recruitment', title: 'Recruitment & referrals', icon: 'search', status: 'api',
      summary: 'Postings, applications, interviews, offers and employee referrals.',
      points: [
        'Public careers page for each posting',
        'The rest of the hiring pipeline works through the API; its screens are planned',
      ],
    },
  ],

  /** License editions from license-service (License.Edition.defaultModules). No prices exist yet. */
  editions: [
    {
      name: 'Basic', blurb: 'Core HR for a single team.',
      includes: ['Employee records and directory', 'Employee self-service', 'Announcements, policies and recognition'],
    },
    {
      name: 'Standard', blurb: 'Adds time and offboarding.',
      includes: ['Everything in Basic', 'Attendance and time tracking', 'Offboarding'],
    },
    {
      name: 'Professional', blurb: 'Adds Philippine payroll.', featured: true,
      includes: ['Everything in Standard', 'Payroll runs and payslips', 'SSS, PhilHealth, Pag-IBIG and BIR'],
    },
    {
      name: 'Enterprise', blurb: 'For multi-branch organisations.',
      includes: ['Everything in Professional', 'Multi-branch and advanced access control', 'Advanced integrations', 'Recruitment and referrals', 'Single sign-on'],
    },
  ],
  editionNote: 'Each license also sets how many employees, branches and users it covers.',

  deployment: [
    { title: 'Self-hosted / on-premises', status: 'available', detail: 'Docker Compose behind nginx on your own servers — the shipped, documented deployment.' },
    { title: 'Your directory', status: 'available', detail: 'LDAP / Active Directory sign-in for on-premises installs, or single sign-on through your OpenID Connect provider.' },
    { title: 'Signed license file', status: 'available', detail: 'Editions and limits come from a license file signed by Bracket Systems.' },
    { title: 'Kubernetes or managed cloud', status: 'planned', detail: 'The services follow the same rules (one image per service, configuration by environment, health probes); not shipped as a packaged option yet.' },
  ],

  architecture: [
    { label: 'Web app', value: 'React 18 · TypeScript · Vite' },
    { label: 'Services', value: '24 Spring Boot 3 (Java 21) services behind an API gateway' },
    { label: 'Data', value: 'PostgreSQL (a database per service) · Redis' },
    { label: 'Events', value: 'Kafka' },
    { label: 'Files', value: 'S3-compatible storage (MinIO) · ClamAV scanning' },
    { label: 'Delivery', value: 'Docker images · nginx · health probes' },
  ],
};
