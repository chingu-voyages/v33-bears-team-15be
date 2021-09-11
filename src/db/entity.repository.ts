import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";

export abstract class EntityRepository<T extends Document> {
  private readonly baseProjection = { _id: 0, __v: 0 };

  constructor(protected readonly entityModal: Model<T>) {}

  public async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModal
      .findOne(entityFilterQuery, {
        ...this.baseProjection,
        ...projection,
      })
      .exec();
  }

  public async find(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T[] | null> {
    return this.entityModal
      .find(entityFilterQuery || {}, {
        ...this.baseProjection,
        ...projection,
      })
      .exec();
  }

  public async findById(
    entityId: string,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModal.findById(entityId, { ...this.baseProjection, ...projection });
  }

  public async findByIdAndUpdate(
    entityId: string,
    updateEntityData: UpdateQuery<T>
  ): Promise<T | null> {
    return this.entityModal.findByIdAndUpdate(entityId, updateEntityData, {
      new: true,
      useFindAndModify: false,
    });
  }

  public async create(createEntityData: Partial<T>): Promise<T> {
    const entity = new this.entityModal(createEntityData);
    return entity.save();
  }

  public async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const { deletedCount } = await this.entityModal.deleteOne(entityFilterQuery);
    if (deletedCount) {
      return deletedCount > 0;
    }

    return false;
  }

  public async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const { deletedCount } = await this.entityModal.deleteMany(entityFilterQuery);
    if (deletedCount) {
      return deletedCount > 0;
    }

    return false;
  }
}
