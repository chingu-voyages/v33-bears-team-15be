import { BookRepository } from "./../book/models/book.repository";
import { UserRepository } from "@/user/models/user.repository";
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewRepository } from "./models/review.repository";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookRepository: BookRepository
  ) {}

  async create(_userId: string, bookId: string, r: CreateReviewDto) {
    //Todo?: User can only create one review per book
    //Todo?: User can't comment to its own book

    const bookRecord = await this.bookRepository.findById(bookId);

    if (!bookRecord)
      throw new NotFoundException(
        "The book you are trying to add the review for doesn't exist!"
      );

    const newReviewRecord = await this.reviewRepository.create({ ...r, user: _userId });

    await this.bookRepository.findByIdAndUpdate(bookId, {
      totalReviews: bookRecord.totalReviews++,
      reviews: [...bookRecord.reviews, newReviewRecord._id],
    });

    Logger.log(`Create new review: ${newReviewRecord}`, ReviewService.name);

    const { __v, ...newReviewRecordWithoutVersion } = newReviewRecord.toObject();

    return newReviewRecordWithoutVersion;
  }

  public async findAll() {
    const reviewRecords = await this.reviewRepository.find();
    if (!reviewRecords) throw new NotFoundException("No review records found!");
    return reviewRecords;
  }

  async findOne(id: string) {
    const reviewRecord = await this.reviewRepository.findById(id);
    if (!reviewRecord) throw new NotFoundException("No review record found!");

    return reviewRecord;
  }

  async update(userId: string, reviewId: string, updateReviewDto: UpdateReviewDto) {
    const reviewRecord = await this.reviewRepository.findById(reviewId);

    if (!reviewRecord) throw new NotFoundException("No user record found!");

    if (reviewRecord.user !== userId) throw new UnauthorizedException("Incorrect user!");

    const updateReviewObject = {
      helpful: updateReviewDto.helpful || reviewRecord.helpful,
    };

    return this.reviewRepository.findByIdAndUpdate(reviewId, updateReviewObject);
  }

  async remove(userId: string, reviewId: string) {
    const reviewRecord = await this.reviewRepository.findById(reviewId);

    if (!reviewRecord) throw new NotFoundException("No review record found!");
    if (reviewRecord.user !== userId)
      throw new UnauthorizedException("This review doesn't belong to you!");

    return {
      deleted: await this.reviewRepository.deleteOne({ _id: reviewId }),
    };
  }
}
