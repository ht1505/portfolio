import { ContactRepository } from '../repositories/contact.repository';
import { ContactMessage, CreateContactInput } from '../models/contact.model';
import { ApiError } from '../utils/ApiError';

export class ContactService {
  private repository = new ContactRepository();

  async getAll(): Promise<ContactMessage[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<ContactMessage> {
    const msg = await this.repository.findById(id);
    if (!msg) throw ApiError.notFound('Message not found');
    return msg;
  }

  async create(data: CreateContactInput): Promise<ContactMessage> {
    // Future: Send email notification via Resend
    return this.repository.create(data);
  }

  async markAsRead(id: string): Promise<void> {
    const updated = await this.repository.markAsRead(id);
    if (!updated) throw ApiError.notFound('Message not found');
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw ApiError.notFound('Message not found');
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async countUnread(): Promise<number> {
    return this.repository.countUnread();
  }
}
