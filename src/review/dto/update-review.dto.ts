import { ApiProperty, PartialType } from "@nestjs/swagger";

import { CreateReviewDto } from "./create-review.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty({ description: "Reviewer found it useful ", required: false })
  @IsString({ message: "Review must be of type string(ObjectId)!" })
  @IsOptional()
  helpful?: string[];

  @ApiProperty({ description: "Review total count", required: false })
  @IsString({ message: "Review must be of type String!" })
  @IsOptional()
  countHelpful?: string;
}
