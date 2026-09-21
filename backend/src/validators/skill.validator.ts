import { z } from 'zod';

export const createSkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(100),
  category: z.string().min(1, 'Category is required').max(100),
  proficiency: z.number().int().min(1).max(100).optional(),
  icon: z.string().optional().or(z.literal('')),
  order: z.number().int().default(0),
});

export const updateSkillSchema = createSkillSchema.partial();

export type CreateSkillBody = z.infer<typeof createSkillSchema>;
export type UpdateSkillBody = z.infer<typeof updateSkillSchema>;
