import type { IconName } from './types';

/**
 * HR & Payroll security controls, from the product's SECURITY.md, SECURITY_AUDIT.md, ENTERPRISE_READINESS_REPORT.md and
 * code (28 Sep 2026). `partial` items say what the installer must configure. Nothing here is a certification.
 */
export const controls: { title: string; icon: IconName; body: string; status: 'implemented' | 'partial' }[] = [
  { title: 'Sign-in and sessions', icon: 'lock', status: 'implemented', body: 'Short-lived access tokens; the web app keeps its session in a secure, HttpOnly cookie. Account lockout after repeated failed sign-ins, idle sign-out and a configurable password policy.' },
  { title: 'Two-factor and single sign-on', icon: 'shield', status: 'implemented', body: 'Authenticator-app (TOTP) two-factor authentication, which administrators can require for everyone. Single sign-on through OpenID Connect; LDAP / Active Directory for on-premises installs.' },
  { title: 'Role-based access with record scopes', icon: 'people', status: 'implemented', body: 'Roles are built from fine-grained permissions, and scoped to branches or departments. Companies are isolated from each other, and every service checks access itself.' },
  { title: 'Separation of duties', icon: 'check', status: 'implemented', body: 'Payroll moves through calculate, submit, review, approve and finalize with separate permissions; nobody approves their own leave, overtime or attendance correction.' },
  { title: 'Audit trail', icon: 'document', status: 'implemented', body: 'Changes to people, pay, access and settings are recorded by an audit service, and can be exported to your SIEM. Log searches and exports are audited too.' },
  { title: 'Files encrypted and scanned', icon: 'layers', status: 'implemented', body: 'Documents are encrypted with AES-256-GCM and scanned for viruses (ClamAV) before they are accepted. Bank details, device credentials and SSO secrets are encrypted as well.' },
  { title: 'Personal data kept out of logs', icon: 'eye', status: 'implemented', body: 'Emails and long numbers (government IDs, phone and account numbers) are masked before a log line is written, and again when logs are read.' },
  { title: 'Hardened edge', icon: 'server', status: 'implemented', body: 'One API gateway in front of every service: request signing between gateway and services, rate limiting, request size limits, security headers and an optional admin IP allowlist.' },
  { title: 'Privacy requests', icon: 'person', status: 'implemented', body: 'Employees can file privacy requests (access, correction, objection and others) that a privacy officer tracks to completion.' },
  { title: 'Monitoring', icon: 'pulse', status: 'implemented', body: 'The Operations Center checks every service and data store, raises alerts and records maintenance windows.' },
  { title: 'Production configuration', icon: 'cloud', status: 'partial', body: 'Some protections depend on the installation: TLS at the web server, secured Kafka and object-storage credentials, and your backup routine. The installation guide marks each one.' },
];

export const notClaimed = [
  'No security certification (such as ISO 27001 or SOC 2) — we don\'t claim one.',
  'No third-party penetration test has been published yet.',
  'Compliance with the Data Privacy Act of 2012 (RA 10173) depends on how each company uses and configures the system; we don\'t claim it on your behalf.',
  'Statutory payroll rules should be reviewed by your accountant against current rates before going live.',
];
