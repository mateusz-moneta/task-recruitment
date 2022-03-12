import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsString, Validate } from 'class-validator';

import { GenresExist } from '../validators/genres-exist.validator';

export class CreateMovieDto {
  @ApiModelProperty({ type: String })
  @IsString()
  title: string;

  @ApiModelProperty({ type: String })
  @IsString()
  runtime: string;

  @ApiModelProperty({ type: String, isArray: true })
  @Validate(GenresExist)
  @IsArray()
  genres: string[];

  @ApiModelProperty({ type: String })
  @IsString()
  director: string;

  @ApiModelProperty({ type: String })
  @IsString()
  actors: string;

  @ApiModelProperty({ type: String })
  @IsString()
  plot: string;

  @ApiModelProperty({ type: String })
  @IsString()
  posterUrl: string;
}
