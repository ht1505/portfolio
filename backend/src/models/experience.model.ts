import { ObjectId } from 'mongodb';

export interface Experience {
  _id?: ObjectId;
  role: string;
  company: string;
  type: string; // e.g. "Internship", "Full-time"
  description: string;
  technologies: string[];
  responsibilities: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateExperienceInput = Omit<Experience, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateExperienceInput = Partial<CreateExperienceInput>;
