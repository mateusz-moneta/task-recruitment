import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';

import { GenresExist } from '../validators/genres-exist.validator';

export class CreateMovieDto {
  @ApiModelProperty({ type: String })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiModelProperty({ type: Number })
  @IsNumber()
  @Type(() => Number)
  year: number;

  @ApiModelProperty({ type: Number })
  @IsNumber()
  @Type(() => Number)
  runtime: number;

  @ApiModelProperty({ type: String, isArray: true })
  @Validate(GenresExist)
  @IsArray()
  genres: string[];

  @ApiModelProperty({ type: String })
  @IsString()
  @MaxLength(255)
  director: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  @IsString()
  actors: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  @IsString()
  plot: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  @IsString()
  posterUrl: string;
}
