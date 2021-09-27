import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryRepository } from "./models/category.repository";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async create(c: CreateCategoryDto) {
    const categoryRecord = await this.categoryRepository.findOne({ name: c.name });

    if (categoryRecord) {
      throw new ConflictException("Category already exists!");
    }

    const newCategoryRecord = await this.categoryRepository.create({
      ...c,
      parent: c.parent || null,
    });
    Logger.log(`Create new category: ${newCategoryRecord._id}`, CategoryService.name);

    const { __v, ...newCategoryRecordWithoutVersion } = newCategoryRecord.toObject();

    return newCategoryRecordWithoutVersion;
  }

  public async findAll() {
    const categoryRecords = await this.categoryRepository.find();

    if (!categoryRecords || categoryRecords.length < 1) {
      throw new NotFoundException("No category records found!");
    }
    Logger.log(`Retrieved all categories`, CategoryService.name);

    return categoryRecords;
  }

  public async findOne(id: string) {
    const categoryRecord = await this.categoryRepository.findById(id);

    if (!categoryRecord) {
      throw new NotFoundException("No category record found!");
    }
    Logger.log(`Retrieved category: ${categoryRecord._id}`, CategoryService.name);

    const { __v, ...newCategoryRecordWithoutVersion } = categoryRecord.toObject();

    return newCategoryRecordWithoutVersion;
  }

  public async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryRecord = await this.categoryRepository.findById(id);

    if (!categoryRecord) {
      throw new NotFoundException("No category record found!");
    }

    const updatedCategoryRecord = await this.categoryRepository.findByIdAndUpdate(
      id,
      updateCategoryDto
    );

    Logger.log(
      `Update category: ${categoryRecord._id}\n\n${updateCategoryDto}`,
      CategoryService.name
    );

    return updatedCategoryRecord;
  }

  public async remove(id: string) {
    const categoryRecord = await this.categoryRepository.findById(id);

    if (!categoryRecord) {
      throw new NotFoundException("No category record found!");
    }

    const deletedCategoryRecord = await this.categoryRepository.deleteOne({ _id: id });

    Logger.log(`Delete category: ${categoryRecord._id}`, CategoryService.name);

    return deletedCategoryRecord;
  }
}
