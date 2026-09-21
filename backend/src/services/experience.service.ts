import { ExperienceRepository } from '../repositories/experience.repository';
import { Experience, CreateExperienceInput, UpdateExperienceInput } from '../models/experience.model';
import { ApiError } from '../utils/ApiError';

export class ExperienceService {
  private repository = new ExperienceRepository();

  async getAll(): Promise<Experience[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Experience> {
    const exp = await this.repository.findById(id);
    if (!exp) throw ApiError.notFound('Experience not found');
    return exp;
  }

  async create(data: CreateExperienceInput): Promise<Experience> {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateExperienceInput): Promise<Experience> {
    const exp = await this.repository.update(id, data);
    if (!exp) throw ApiError.notFound('Experience not found');
    return exp;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw ApiError.notFound('Experience not found');
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
