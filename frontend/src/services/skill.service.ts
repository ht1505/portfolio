import api from '../lib/api';
import { Skill, ApiResponse } from '../types';

export const skillService = {
  async getAll(): Promise<Skill[]> {
    const res = await api.get<ApiResponse<Skill[]>>('/skills');
    return res.data.data;
  },

  async getById(id: string): Promise<Skill> {
    const res = await api.get<ApiResponse<Skill>>(`/skills/${id}`);
    return res.data.data;
  },

  async create(data: Partial<Skill>): Promise<Skill> {
    const res = await api.post<ApiResponse<Skill>>('/skills', data);
    return res.data.data;
  },

  async update(id: string, data: Partial<Skill>): Promise<Skill> {
    const res = await api.put<ApiResponse<Skill>>(`/skills/${id}`, data);
    return res.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/skills/${id}`);
  },
};
