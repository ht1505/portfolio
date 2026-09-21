import { Project, Skill, Experience } from '../types';
import { GITHUB_URL } from '@/config/site';

export const fallbackProjects: Project[] = [
  {
    _id: 'sample-1',
    title: 'TrustWork',
    slug: 'trustwork',
    shortDescription:
      'A decentralized and verified freelance marketplace platform connecting clients and developers with milestone-based escrow payments and reputational scoring.',
    detailedDescription:
      'TrustWork is an end-to-end platform engineered to eliminate payment dispute risks in online freelancing. It introduces smart milestone tracking, automated identity and skill verification, and escrow-based release mechanisms. The architecture separates client interaction from transactional security, offering real-time task status updates, role-based dashboards, and dispute mediation workflows.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'WebSockets', 'Tailwind CSS'],
    githubLink: `${GITHUB_URL}/TrustWork`,
    liveDemoLink: 'https://trustwork-demo.vercel.app',
    category: 'Full-Stack Web App',
    featured: true,
    order: 1,
    keyFeatures: [
      'Milestone-based automated payment and escrow release system',
      'Dual role dashboards tailored for clients and freelancers',
      'Real-time messaging and proposal submission pipeline',
      'Reputation scoring algorithm driven by client reviews and project completion rates',
      'Secure authentication with session handling and role-based access control',
    ],
    challengesAndSolutions: [
      'Challenge: Handling asynchronous payment status and dispute updates across concurrent clients. Solution: Implemented atomic status transitions and event-driven notifications.',
      'Challenge: Optimizing dashboard load times with complex project histories. Solution: Structured indexed MongoDB queries with server-side pagination.',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'sample-2',
    title: 'Credit Risk Prediction Model',
    slug: 'credit-risk-prediction-model',
    shortDescription:
      'Machine learning model and predictive analytics dashboard evaluating financial applicant default probability using supervised ensemble learning.',
    detailedDescription:
      'A predictive machine learning pipeline designed to assess credit risk and loan default probabilities. The project ingests historical financial records, applies rigorous feature engineering, addresses class imbalance using SMOTE, and evaluates multiple classification algorithms (Random Forest, XGBoost, and Logistic Regression). A companion web interface allows loan officers to input applicant profiles and receive real-time risk scores with explainable metrics.',
    technologies: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Flask', 'React', 'Docker'],
    githubLink: `${GITHUB_URL}/Credit-Risk-Prediction`,
    category: 'Machine Learning',
    featured: true,
    order: 2,
    keyFeatures: [
      'Automated feature scaling, imputation, and outlier detection pipeline',
      'Trained ensemble classifier with >88% ROC-AUC score on validation data',
      'Explainable AI insights detailing highest-weighted factors influencing credit scoring',
      'REST API endpoint for real-time inference integrated into a clean dashboard',
      'Containerized with Docker for straightforward deployment and environment parity',
    ],
    challengesAndSolutions: [
      'Challenge: Extreme class imbalance with only ~8% historical defaults. Solution: Applied SMOTE oversampling alongside cost-sensitive algorithmic learning.',
      'Challenge: High latency during multi-feature model inference. Solution: Cached pre-computed transformations and optimized Scikit-Learn pipeline export.',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'sample-3',
    title: 'Distributed Task Queue System',
    slug: 'distributed-task-queue',
    shortDescription:
      'High-throughput asynchronous job processing system with Redis-backed queueing, retry logic, and concurrent worker pools.',
    detailedDescription:
      'A lightweight distributed worker system designed to handle computationally heavy background tasks, email dispatch, and data transformations. Built with Node.js and Redis, featuring dead-letter queues, exponential backoff, and heartbeat-based worker liveness checks.',
    technologies: ['Node.js', 'TypeScript', 'Redis', 'Docker', 'Prometheus'],
    githubLink: GITHUB_URL,
    category: 'Backend / Systems',
    featured: false,
    order: 3,
    keyFeatures: [
      'Redis stream-based queue architecture with horizontal worker scaling',
      'Configurable exponential backoff and retry mechanism',
      'Real-time job progress tracking and metrics emission',
    ],
    challengesAndSolutions: [
      'Challenge: Preventing duplicate executions during worker crashes. Solution: Used Redis locks with TTL and transactional ack signals.',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackSkills: Skill[] = [
  { _id: 's1', name: 'JavaScript / TypeScript', category: 'Frontend', order: 1, createdAt: '', updatedAt: '' },
  { _id: 's2', name: 'React & Next.js', category: 'Frontend', order: 2, createdAt: '', updatedAt: '' },
  { _id: 's3', name: 'Tailwind CSS', category: 'Frontend', order: 3, createdAt: '', updatedAt: '' },
  { _id: 's4', name: 'HTML5 & CSS3', category: 'Frontend', order: 4, createdAt: '', updatedAt: '' },
  { _id: 's5', name: 'Node.js & Express', category: 'Backend', order: 5, createdAt: '', updatedAt: '' },
  { _id: 's6', name: 'RESTful API Design', category: 'Backend', order: 6, createdAt: '', updatedAt: '' },
  { _id: 's7', name: 'Python', category: 'Backend', order: 7, createdAt: '', updatedAt: '' },
  { _id: 's8', name: 'C / C++', category: 'Backend', order: 8, createdAt: '', updatedAt: '' },
  { _id: 's9', name: 'MongoDB', category: 'Database', order: 9, createdAt: '', updatedAt: '' },
  { _id: 's10', name: 'PostgreSQL / SQL', category: 'Database', order: 10, createdAt: '', updatedAt: '' },
  { _id: 's11', name: 'Redis', category: 'Database', order: 11, createdAt: '', updatedAt: '' },
  { _id: 's12', name: 'Git & GitHub', category: 'Tools', order: 12, createdAt: '', updatedAt: '' },
  { _id: 's13', name: 'Docker', category: 'Tools', order: 13, createdAt: '', updatedAt: '' },
  { _id: 's14', name: 'Linux / Bash', category: 'Tools', order: 14, createdAt: '', updatedAt: '' },
  { _id: 's15', name: 'Postman', category: 'Tools', order: 15, createdAt: '', updatedAt: '' },
];

export const fallbackExperience: Experience[] = [
  {
    _id: 'e1',
    role: 'Full-Stack Developer & Project Lead',
    company: 'TrustWork Platform',
    type: 'Academic / Capstone',
    description:
      'Engineered an escrow-based decentralized freelance portal integrating client job postings, freelancer bids, milestone verification, and real-time messaging.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    responsibilities: [
      'Designed end-to-end architecture and normalized MongoDB schemas',
      'Implemented secure JWT authorization with granular role access controls',
      'Built reactive frontend interfaces in React with responsive state handling',
    ],
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    current: false,
    order: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: 'e2',
    role: 'Computer Science & Engineering Student',
    company: 'University Engineering Program',
    type: 'Education',
    description:
      'Rigorous academic coursework encompassing Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Machine Learning.',
    technologies: ['C++', 'Python', 'Java', 'SQL', 'Algorithms'],
    responsibilities: [
      'Maintained strong academic standing with focus on core CS fundamentals',
      'Completed practical lab projects in Operating Systems, Networks, and DBMS',
      'Active participant in coding hackathons and technical symposiums',
    ],
    startDate: '2021-08-01',
    current: true,
    order: 2,
    createdAt: '',
    updatedAt: '',
  },
];
