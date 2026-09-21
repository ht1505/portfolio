import api from '../lib/api';
import { Project, ApiResponse } from '../types';

export const projectService = {
  async getAll(): Promise<Project[]> {
    const res = await api.get<ApiResponse<Project[]>>('/projects');
    return res.data.data;
  },

  async getBySlug(slug: string): Promise<Project> {
    const res = await api.get<ApiResponse<Project>>(`/projects/${slug}`);
    return res.data.data;
  },

  async create(data: Partial<Project>): Promise<Project> {
    const res = await api.post<ApiResponse<Project>>('/projects', data);
    return res.data.data;
  },

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const res = await api.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return res.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },
};
