import { ObjectId } from 'mongodb';

export interface Skill {
  _id?: ObjectId;
  name: string;
  category: string; // e.g. "Programming Languages", "Frontend", "Backend", etc.
  proficiency?: number; // 1-100, optional
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateSkillInput = Omit<Skill, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateSkillInput = Partial<CreateSkillInput>;
