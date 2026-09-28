/**
 * The team, as the first site and the published résumés present them. No credentials beyond what they state; skills
 * come from each person's own role line and bio (Jansen's from his résumé).
 */
export interface Member {
  initials: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  resume: string;
  skills: string[];
  links?: { label: string; href: string }[];
  /** Shown as a status line, as on the first site. */
  availability: string;
}

export const team: Member[] = [
  {
    initials: 'KC',
    name: 'Kylie Cuadra',
    role: 'Full-Stack Developer — Java · AI · Cloud',
    bio: 'Java and Spring Boot developer by day, freelance builder since 2019 — turning enterprise systems and side projects alike into production-ready software.',
    email: 'christkylie.cuadra@gmail.com',
    resume: '/resumes/kylie-prince.pdf',
    skills: ['Java', 'Spring Boot', 'AI', 'Cloud', 'Enterprise systems'],
    availability: 'Available for freelance work',
  },
  {
    initials: 'PM',
    name: 'Prince Macalino',
    role: 'Full-Stack Developer — Java · AI · Cloud',
    bio: 'Full-stack developer working across web, AI, and cloud — focused on shipping systems that hold up under real-world use.',
    email: 'macalinoprinceallyson@gmail.com',
    resume: '/resumes/kylie-prince.pdf',
    skills: ['Java', 'Web', 'AI', 'Cloud'],
    availability: 'Available for freelance work',
  },
  {
    initials: 'JO',
    name: 'Jansen Oribello',
    role: 'Java Developer — Sapiens IDIT · APIs · Enterprise Systems',
    bio: 'Java developer specializing in the Sapiens IDIT platform, Spring Boot microservices, and RESTful API integration for core insurance and banking systems.',
    email: 'oribellojansen.fuentes@gmail.com',
    resume: '/resumes/jansen-oribello.pdf',
    skills: ['Java', 'Spring Boot', 'Sapiens IDIT', 'Oracle PL/SQL', 'REST APIs'],
    links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/jansen-oribello' }],
    availability: 'Available for freelance work',
  },
];
