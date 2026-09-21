/**
 * Main application site configuration and personal profile constants.
 * Single source of truth for social links, contact info, and portfolio metadata.
 */

export const SITE_CONFIG = {
  name: 'Hitesh Thacker',
  shortName: 'Hitesh',
  role: 'Computer Science & Engineering Student | Full-Stack Developer',
  tagline: 'Computer Science & Engineering Student & Full-Stack Engineer',
  email: 'thackerhitesh9712@gmail.com',
  location: 'Gujarat / India (Open to Remote & Relocation)',
  links: {
    github: 'https://github.com/ht1505',
    linkedin: 'https://linkedin.com/in/hitesh-thacker-b22682284/',
    mailTo: 'mailto:thackerhitesh9712@gmail.com',
  },
  socials: {
    github: 'https://github.com/ht1505',
    linkedin: 'https://linkedin.com/in/hitesh-thacker-b22682284/',
  },
} as const;

// Individual exported variable names for convenient direct usage
export const EMAIL = SITE_CONFIG.email;
export const GITHUB_URL = SITE_CONFIG.links.github;
export const LINKEDIN_URL = SITE_CONFIG.links.linkedin;
export const MAILTO_URL = SITE_CONFIG.links.mailTo;
