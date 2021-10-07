import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional, IsString, MinLength, IsPositive } from "class-validator";

export class CreateReviewDto {
  @ApiProperty({ description: "Reviewer comment on book", required: true })
  @IsString({ message: "Comment must be of type string!" })
  @MinLength(100, { message: "Name must have at least 100 characters!" })
  //Todo?: Add @MaxLength
  @IsDefined({ message: "Comment must not be empty!" })
  comment!: string;

  @ApiProperty({ description: "Reviewer rating on book", required: false, default: 0 })
  @IsOptional()
  @IsPositive({ message: "Review must be a positive number!" })
  rating?: number;

  @ApiProperty({ description: "Reviewer ID", required: true })
  @IsOptional()
  user?: string;

  @ApiProperty({ description: "Reviewer type", required: true })
  userType?: string;
}
