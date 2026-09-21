import { SkillRepository } from '../repositories/skill.repository';
import { Skill, CreateSkillInput, UpdateSkillInput } from '../models/skill.model';
import { ApiError } from '../utils/ApiError';

export class SkillService {
  private repository = new SkillRepository();

  async getAll(): Promise<Skill[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Skill> {
    const skill = await this.repository.findById(id);
    if (!skill) throw ApiError.notFound('Skill not found');
    return skill;
  }

  async getByCategory(category: string): Promise<Skill[]> {
    return this.repository.findByCategory(category);
  }

  async create(data: CreateSkillInput): Promise<Skill> {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateSkillInput): Promise<Skill> {
    const skill = await this.repository.update(id, data);
    if (!skill) throw ApiError.notFound('Skill not found');
    return skill;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw ApiError.notFound('Skill not found');
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
