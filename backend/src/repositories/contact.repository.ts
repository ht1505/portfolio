import { Collection, ObjectId } from 'mongodb';
import { getDb } from '../config/database';
import { ContactMessage, CreateContactInput } from '../models/contact.model';

export class ContactRepository {
  private get collection(): Collection<ContactMessage> {
    return getDb().collection<ContactMessage>('contacts');
  }

  async findAll(): Promise<ContactMessage[]> {
    return this.collection.find().sort({ createdAt: -1 }).toArray();
  }

  async findById(id: string): Promise<ContactMessage | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(data: CreateContactInput): Promise<ContactMessage> {
    const doc = { ...data, read: false, createdAt: new Date() };
    const result = await this.collection.insertOne(doc as any);
    return { ...doc, _id: result.insertedId } as ContactMessage;
  }

  async markAsRead(id: string): Promise<boolean> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { read: true } }
    );
    return result.modifiedCount === 1;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async count(): Promise<number> {
    return this.collection.countDocuments();
  }

  async countUnread(): Promise<number> {
    return this.collection.countDocuments({ read: false });
  }
}
