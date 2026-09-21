import { Collection, ObjectId } from 'mongodb';
import { getDb } from '../config/database';
import { Skill, CreateSkillInput, UpdateSkillInput } from '../models/skill.model';

export class SkillRepository {
  private get collection(): Collection<Skill> {
    return getDb().collection<Skill>('skills');
  }

  async findAll(): Promise<Skill[]> {
    return this.collection.find().sort({ category: 1, order: 1 }).toArray();
  }

  async findById(id: string): Promise<Skill | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByCategory(category: string): Promise<Skill[]> {
    return this.collection.find({ category }).sort({ order: 1 }).toArray();
  }

  async create(data: CreateSkillInput): Promise<Skill> {
    const now = new Date();
    const doc = { ...data, createdAt: now, updatedAt: now };
    const result = await this.collection.insertOne(doc as any);
    return { ...doc, _id: result.insertedId } as Skill;
  }

  async update(id: string, data: UpdateSkillInput): Promise<Skill | null> {
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
