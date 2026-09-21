import { ObjectId } from 'mongodb';

export interface Project {
  _id?: ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProjectInput = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectInput = Partial<CreateProjectInput>;
