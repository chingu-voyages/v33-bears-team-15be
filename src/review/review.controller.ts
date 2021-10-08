import { ApiBody, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UseRoles } from "@/auth/decorators/role.decorator";
import { Role } from "@/auth/role.enum";
import { JwtAuthGuard } from "@/auth/guards";

import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

const CONTROLLER_NAME = "reviews";

@ApiTags(CONTROLLER_NAME)
@UseGuards(JwtAuthGuard)
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
  @UseRoles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(":reviewId")
  findOne(@Param("reviewId") id: string) {
    return this.reviewService.findOne(id);
  }

  @Get("/book/:bookId")
  findAllBookReviews(@Param("bookId") bookId: string) {
    return this.reviewService.findAllBookReviews(bookId);
  }

  @Patch(":userId/update-review/:reviewId")
  updateReview(
    @Param("userId") userId: string,
    @Param("reviewId") reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.updateReview(userId, reviewId, updateReviewDto);
  }

  @Patch(":userId/update-helpful/:reviewId")
  updateHelpful(@Param("userId") userId: string, @Param("reviewId") reviewId: string) {
    return this.reviewService.updateHelpful(userId, reviewId);
  }

  @Delete(":userId/delete/:reviewId/:bookId")
  remove(
    @Param("userId") userId: string,
    @Param("reviewId") reviewId: string,
    @Param("bookId") bookId: string
  ) {
    return this.reviewService.remove(userId, reviewId, bookId);
  }
}
