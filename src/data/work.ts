/**
 * Selected work: the five projects on the first site, with their published descriptions and stacks. No outcomes or
 * metrics are claimed - none were published. `problem`/`solution` restate the published description; add verified
 * results, screenshots or client quotes here when you have them (and the client's permission).
 */
export interface Project {
  slug: string;
  tag: string;
  title: string;
  client?: string;
  summary: string;
  problem: string;
  solution: string[];
  stack: string[];
  kind: 'Computer vision' | 'Document AI' | 'Enterprise system' | 'Business operations' | 'E-commerce';
}

export const projects: Project[] = [
  {
    slug: 'ppe-scanner',
    tag: '[ COMPUTER VISION ]',
    title: 'Real-Time PPE Scanner & Compliance System',
    summary:
      'A custom-trained detection model that monitors industrial video feeds in real time, recognizing safety compliance gear like helmets and vests to automate occupational safety monitoring.',
    problem: 'Checking that everyone on an industrial site wears their safety gear is slow and easy to miss when it depends on people watching video.',
    solution: [
      'A detection model trained on the gear that matters: helmets and vests.',
      'Runs against live industrial video feeds in real time.',
      'Turns what the camera sees into compliance information instead of footage someone has to review.',
    ],
    stack: ['Python', 'YOLO', 'OpenCV', 'Object Detection'],
    kind: 'Computer vision',
  },
  {
    slug: 'document-flow',
    tag: '[ DOCUMENT AI ]',
    title: 'Intelligent Document Flow & Extraction Engine',
    summary:
      'Automates the scanning, categorizing, and routing of physical institutional files — extracting metadata via OCR and image processing across multi-tiered workflows.',
    problem: 'Institutions still run on paper files that have to be scanned, classified and routed by hand across several levels of approval.',
    solution: [
      'Scans and categorizes physical files.',
      'Extracts metadata with OCR and image processing.',
      'Routes each document through multi-tiered workflows.',
    ],
    stack: ['PHP', 'OCR Engines', 'Image Processing', 'MySQL'],
    kind: 'Document AI',
  },
  {
    slug: 'accreditation-dms',
    tag: '[ ENTERPRISE SYSTEM ]',
    title: 'Accreditation Document Management System',
    client: 'Cavite State University',
    summary:
      'Built for Cavite State University: a centralized, audited document vault with version-locking, granular file security policies, and continuous compliance verification.',
    problem: 'Accreditation needs every required document in one trusted place, with proof of who changed what.',
    solution: [
      'A centralized, audited document vault.',
      'Version-locking so approved documents stay as approved.',
      'Granular file security policies and continuous compliance verification.',
    ],
    stack: ['PHP', 'MySQL', 'jQuery', 'Bootstrap'],
    kind: 'Enterprise system',
  },
  {
    slug: 'nxs-spa-operations',
    tag: '[ BUSINESS OPS ]',
    title: 'NXS Commercial Spa Operations Suite',
    client: 'NXS',
    summary:
      'A full-lifecycle operations platform handling loyalty tracking, real-time staff shift utilization, secure checkout, and multi-tier revenue reporting.',
    problem: 'A commercial spa running loyalty, staffing, checkout and reporting in separate places.',
    solution: [
      'Loyalty tracking for returning customers.',
      'Real-time staff shift utilization.',
      'Secure checkout and multi-tier revenue reporting in the same platform.',
    ],
    stack: ['PHP', 'MySQL', 'Transaction Analytics'],
    kind: 'Business operations',
  },
  {
    slug: 'cavshop',
    tag: '[ E-COMMERCE ]',
    title: 'CavShop',
    summary:
      'A lightweight PHP and MySQL e-commerce system for small retail workflows — customer storefront, cart and checkout flow, and role-based dashboards for admins and cashiers.',
    problem: 'Small retailers need a storefront and point of sale without enterprise complexity.',
    solution: [
      'A customer storefront with cart and checkout.',
      'Role-based dashboards for admins and cashiers.',
      'Lightweight enough for small retail workflows.',
    ],
    stack: ['PHP', 'MySQL', 'Frontend UI'],
    kind: 'E-commerce',
  },
];
