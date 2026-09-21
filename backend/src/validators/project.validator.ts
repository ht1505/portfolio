import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  shortDescription: z.string().min(1, 'Short description is required').max(500),
  detailedDescription: z.string().min(1, 'Detailed description is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  githubLink: z.string().url().optional().or(z.literal('')),
  liveDemoLink: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  keyFeatures: z.array(z.string()).default([]),
  challengesAndSolutions: z.array(z.string()).default([]),
  category: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectBody = z.infer<typeof createProjectSchema>;
export type UpdateProjectBody = z.infer<typeof updateProjectSchema>;
