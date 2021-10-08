import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
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
import { JwtAuthGuard, RolesGuard } from "@/auth/guards";

import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

const CONTROLLER_NAME = "reviews";

@ApiTags(CONTROLLER_NAME)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ version: "1", path: CONTROLLER_NAME })
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBody({ type: CreateReviewDto })
  @ApiOkResponse({ description: "The record has been successfully created." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Post(":userId/create/:bookId")
  create(
    @Param("userId") userId: string,
    @Param("bookId") bookId: string,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.reviewService.create(userId, bookId, createReviewDto);
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Get()
  @UseRoles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.reviewService.findAll();
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Get(":reviewId")
  findOne(@Param("reviewId") id: string) {
    return this.reviewService.findOne(id);
  }

  @ApiOkResponse({ description: "The record has been successfully returned." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Get("/book/:bookId")
  findAllBookReviews(@Param("bookId") bookId: string) {
    return this.reviewService.findAllBookReviews(bookId);
  }

  @ApiOkResponse({ description: "The record has been successfully updated." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Patch(":userId/update-review/:reviewId")
  updateReview(
    @Param("userId") userId: string,
    @Param("reviewId") reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.updateReview(userId, reviewId, updateReviewDto);
  }

  @ApiOkResponse({ description: "The record has been successfully updated." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Patch(":userId/update-helpful/:reviewId")
  updateHelpful(@Param("userId") userId: string, @Param("reviewId") reviewId: string) {
    return this.reviewService.updateHelpful(userId, reviewId);
  }

  @ApiOkResponse({ description: "The record has been successfully removed." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiBadRequestResponse({ description: "The record has failed validation." })
  @ApiForbiddenResponse({ description: "Forbidden!" })
  @Delete(":userId/delete/:reviewId/:bookId")
  remove(
    @Param("userId") userId: string,
    @Param("reviewId") reviewId: string,
    @Param("bookId") bookId: string
  ) {
    return this.reviewService.remove(userId, reviewId, bookId);
  }
}
