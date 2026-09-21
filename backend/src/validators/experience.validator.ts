import { z } from 'zod';

export const createExperienceSchema = z.object({
  role: z.string().min(1, 'Role is required').max(200),
  company: z.string().min(1, 'Company is required').max(200),
  type: z.string().min(1, 'Type is required'), // "Internship", "Full-time", etc.
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export type CreateExperienceBody = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceBody = z.infer<typeof updateExperienceSchema>;
