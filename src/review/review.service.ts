import { BookRepository } from "./../book/models/book.repository";
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

  async create(userId: string, bookId: string, r: CreateReviewDto) {
    //Todo?: User can only create one review per book
    //Todo?: User can't comment to its own book

    const bookRecord = await this.bookRepository.findById(bookId);

    if (!bookRecord)
      throw new NotFoundException(
        "The book you are trying to add the review for doesn't exist!"
      );

    const newReviewRecord = await this.reviewRepository.create({ ...r, user: userId });

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

  async findAllBookReviews(bookId: string) {
    const bookRecord = await this.bookRepository.findById(bookId);
    if (!bookRecord) throw new NotFoundException("No book record found!");

    return bookRecord.reviews;
  }

  async updateReview(userId: string, reviewId: string, updateReviewDto: UpdateReviewDto) {
    const reviewRecord = await this.reviewRepository.findById(reviewId);

    if (!reviewRecord) throw new NotFoundException("No user record found!");

    if (reviewRecord.user !== userId)
      throw new UnauthorizedException("This review doesn't belong to you!");
    const updateReviewObject = {
      comment: updateReviewDto.comment,
    };

    return this.reviewRepository.findByIdAndUpdate(reviewId, updateReviewObject);
  }

  async updateHelpful(userId: string, reviewId: string) {
    const reviewRecord = await this.reviewRepository.findById(reviewId);
    if (!reviewRecord) throw new NotFoundException("No Review record found!");

    if (reviewRecord.helpful.find((id) => id === userId)) {
      const filteredArray = reviewRecord.helpful.filter((id) => id !== userId);
      return await this.reviewRepository.findByIdAndUpdate(reviewId, {
        helpful: filteredArray,
        countHelpFul: reviewRecord.countHelpFul--,
      });
    }

    return await this.reviewRepository.findByIdAndUpdate(reviewId, {
      helpful: [...reviewRecord.helpful, userId],
      countHelpFul: reviewRecord.countHelpFul++,
    });
  }

  async remove(userId: string, reviewId: string, bookId: string) {
    const reviewRecord = await this.reviewRepository.findById(reviewId);
    const bookRecord = await this.bookRepository.findById(bookId);

    if (!reviewRecord) throw new NotFoundException("No review record found!");
    if (!bookRecord) throw new NotFoundException("This review book cannot be found!");
    if (reviewRecord.user !== userId)
      throw new UnauthorizedException("This review doesn't belong to you!");

    return {
      deleted: await this.reviewRepository.deleteOne({ _id: reviewId }),
      bookReviewCount: await this.bookRepository.findByIdAndUpdate(bookId, {
        totalReviews: bookRecord.totalReviews--,
      }),
    };
  }
}
