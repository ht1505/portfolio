export interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  githubLink?: string;
  liveDemoLink?: string;
  imageUrl?: string;
  keyFeatures: string[];
  challengesAndSolutions?: string[];
  category?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  type: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency?: number;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: { field: string; message: string }[];
}

export interface DashboardStats {
  projects: number;
  experiences: number;
  skills: number;
  messages: number;
  unreadMessages: number;
}

export interface AuthResponse {
  token: string;
  expiresIn: string;
}
