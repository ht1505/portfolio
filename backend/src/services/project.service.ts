import { ProjectRepository } from '../repositories/project.repository';
import { Project, CreateProjectInput, UpdateProjectInput } from '../models/project.model';
import { ApiError } from '../utils/ApiError';

export class ProjectService {
  private repository = new ProjectRepository();

  async getAll(): Promise<Project[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Project> {
    const project = await this.repository.findById(id);
    if (!project) throw ApiError.notFound('Project not found');
    return project;
  }

  async getBySlug(slug: string): Promise<Project> {
    const project = await this.repository.findBySlug(slug);
    if (!project) throw ApiError.notFound('Project not found');
    return project;
  }

  async getFeatured(): Promise<Project[]> {
    return this.repository.findFeatured();
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const existing = await this.repository.findBySlug(data.slug);
    if (existing) throw ApiError.badRequest('A project with this slug already exists');
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project> {
    if (data.slug) {
      const existing = await this.repository.findBySlug(data.slug);
      if (existing && existing._id?.toString() !== id) {
        throw ApiError.badRequest('A project with this slug already exists');
      }
    }
    const project = await this.repository.update(id, data);
    if (!project) throw ApiError.notFound('Project not found');
    return project;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw ApiError.notFound('Project not found');
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
