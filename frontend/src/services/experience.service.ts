import api from '../lib/api';
import { Experience, ApiResponse } from '../types';

export const experienceService = {
  async getAll(): Promise<Experience[]> {
    const res = await api.get<ApiResponse<Experience[]>>('/experience');
    return res.data.data;
  },

  async getById(id: string): Promise<Experience> {
    const res = await api.get<ApiResponse<Experience>>(`/experience/${id}`);
    return res.data.data;
  },

  async create(data: Partial<Experience>): Promise<Experience> {
    const res = await api.post<ApiResponse<Experience>>('/experience', data);
    return res.data.data;
  },

  async update(id: string, data: Partial<Experience>): Promise<Experience> {
    const res = await api.put<ApiResponse<Experience>>(`/experience/${id}`, data);
    return res.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/experience/${id}`);
  },
};
