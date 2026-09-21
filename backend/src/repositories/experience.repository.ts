import { Collection, ObjectId } from 'mongodb';
import { getDb } from '../config/database';
import { Experience, CreateExperienceInput, UpdateExperienceInput } from '../models/experience.model';

export class ExperienceRepository {
  private get collection(): Collection<Experience> {
    return getDb().collection<Experience>('experiences');
  }

  async findAll(): Promise<Experience[]> {
    return this.collection.find().sort({ order: 1, startDate: -1 }).toArray();
  }

  async findById(id: string): Promise<Experience | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(data: CreateExperienceInput): Promise<Experience> {
    const now = new Date();
    const doc = { ...data, createdAt: now, updatedAt: now };
    const result = await this.collection.insertOne(doc as any);
    return { ...doc, _id: result.insertedId } as Experience;
  }

  async update(id: string, data: UpdateExperienceInput): Promise<Experience | null> {
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async count(): Promise<number> {
    return this.collection.countDocuments();
  }
}
