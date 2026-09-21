import api from '../lib/api';
import { ContactMessage, ContactFormData, ApiResponse } from '../types';

export const contactService = {
  async sendMessage(data: ContactFormData): Promise<ContactMessage> {
    const res = await api.post<ApiResponse<ContactMessage>>('/contact', data);
    return res.data.data;
  },

  async getAllMessages(): Promise<ContactMessage[]> {
    const res = await api.get<ApiResponse<ContactMessage[]>>('/contact');
    return res.data.data;
  },

  async markAsRead(id: string): Promise<void> {
    await api.patch(`/contact/${id}/read`);
  },

  async deleteMessage(id: string): Promise<void> {
    await api.delete(`/contact/${id}`);
  },
};
