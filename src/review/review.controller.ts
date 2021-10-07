import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

const CONTROLLER_NAME = "reviews";

@ApiTags(CONTROLLER_NAME)
@Controller({ version: "1", path: CONTROLLER_NAME })
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBody({ type: CreateReviewDto })
  @Post(":userId/create/:bookId")
  create(
    @Param("userId") userId: string,
    @Param("bookId") bookId: string,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.reviewService.create(userId, bookId, createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(":userId/update/:reviewId")
  update(
    @Param("userId") userId: string,
    @Param("reviewId") reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.update(userId, reviewId, updateReviewDto);
  }

  @Delete(":userId/delete/:reviewId")
  remove(@Param("userId") userId: string, @Param("reviewId") reviewId: string) {
    return this.reviewService.remove(userId, reviewId);
  }
}
