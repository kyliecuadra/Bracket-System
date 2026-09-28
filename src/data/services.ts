import type { IconName } from './types';

/**
 * Services, from the first site's four specialties and the résumés' technical skills. Examples point at real work
 * (src/data/work.ts) or at the HR & Payroll product the team built.
 */
export interface Service {
  id: string;
  tag: string;
  title: string;
  icon: IconName;
  body: string;
  offers: string[];
  stack: string[];
  proof: { label: string; href: string }[];
}

export const services: Service[] = [
  {
    id: 'web', tag: '[ WEB DEV ]', title: 'Web platforms & business systems', icon: 'code',
    body: 'End-to-end web apps and business systems — from PHP/MySQL platforms to modern React front-ends, built to actually ship.',
    offers: ['Customer-facing web applications', 'Internal tools and dashboards', 'Role-based portals for staff and customers'],
    stack: ['React', 'TypeScript', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
    proof: [{ label: 'CavShop', href: '/work/cavshop' }, { label: 'NXS Spa Operations Suite', href: '/work/nxs-spa-operations' }],
  },
  {
    id: 'java', tag: '[ JAVA / BACKEND ]', title: 'Java & Spring Boot backends', icon: 'server',
    body: 'Backends and APIs in Java and Spring Boot, from single services to microservices, integrated with the systems a business already runs.',
    offers: ['REST APIs and integrations', 'Spring Boot microservices', 'Oracle, MS SQL and PostgreSQL data layers'],
    stack: ['Java', 'Spring Boot', 'REST', 'Oracle', 'MS SQL', 'PostgreSQL'],
    proof: [{ label: 'HR & Payroll: 24 Spring Boot services', href: '/products/hr-payroll' }],
  },
  {
    id: 'ai', tag: '[ AI / ML ]', title: 'Applied AI & computer vision', icon: 'eye',
    body: 'Custom-trained detection models and OCR pipelines that turn video feeds and paper documents into structured, actionable data.',
    offers: ['Object detection on live video', 'OCR and document extraction', 'AI-assisted features inside business apps'],
    stack: ['Python', 'YOLO', 'OpenCV', 'OCR'],
    proof: [{ label: 'PPE Scanner', href: '/work/ppe-scanner' }, { label: 'Document Flow & Extraction', href: '/work/document-flow' }],
  },
  {
    id: 'enterprise', tag: '[ ENTERPRISE ]', title: 'Enterprise & institutional systems', icon: 'building',
    body: 'Custom systems built for how a business actually runs — operations platforms, document management, and internal tools for institutions and companies.',
    offers: ['Document management with audit trails', 'Operations and workflow platforms', 'Access control that follows the org chart'],
    stack: ['Java', 'PHP', 'MySQL', 'PostgreSQL'],
    proof: [{ label: 'Accreditation DMS for Cavite State University', href: '/work/accreditation-dms' }],
  },
  {
    id: 'cloud', tag: '[ CLOUD ]', title: 'Cloud & systems architecture', icon: 'cloud',
    body: 'Secure, scalable infrastructure — from Java/Spring Boot services to cloud-backed platforms built to hold up under real institutional use.',
    offers: ['Containerised deployments with Docker', 'Service architecture and messaging', 'Monitoring, logging and health checks'],
    stack: ['Docker', 'Azure', 'Kafka', 'Redis', 'nginx'],
    proof: [{ label: 'HR & Payroll Operations Center', href: '/products/hr-payroll#operations' }],
  },
];

export const process = [
  { step: '01', title: 'Scope', body: 'We start from how the work is done today and agree what "done" looks like.' },
  { step: '02', title: 'Build', body: 'Small, working increments you can try, instead of a big reveal at the end.' },
  { step: '03', title: 'Ship', body: 'Deployed where you need it — your servers or the cloud — with the documentation to run it.' },
  { step: '04', title: 'Support', body: 'We stay available to fix, extend and hand over.' },
];
