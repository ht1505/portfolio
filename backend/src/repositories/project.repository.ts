import { Collection, ObjectId } from 'mongodb';
import { getDb } from '../config/database';
import { Project, CreateProjectInput, UpdateProjectInput } from '../models/project.model';

export class ProjectRepository {
  private get collection(): Collection<Project> {
    return getDb().collection<Project>('projects');
  }

  async findAll(): Promise<Project[]> {
    return this.collection.find().sort({ order: 1, createdAt: -1 }).toArray();
  }

  async findById(id: string): Promise<Project | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.collection.findOne({ slug });
  }

  async findFeatured(): Promise<Project[]> {
    return this.collection.find({ featured: true }).sort({ order: 1 }).toArray();
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const now = new Date();
    const doc = { ...data, createdAt: now, updatedAt: now };
    const result = await this.collection.insertOne(doc as any);
    return { ...doc, _id: result.insertedId } as Project;
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project | null> {
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
