import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class FindMovieDto {
  @ApiModelProperty({ type: String, isArray: true })
  @IsOptional()
  @IsArray()
  genres: string[];

  @ApiModelProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  duration: number;
}
