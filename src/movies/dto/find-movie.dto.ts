import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class FindMovieDto {
  @ApiModelProperty({ type: String, isArray: true })
  @IsOptional()
  @IsArray()
  genres: string[];

  @ApiModelProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  duration: number;
}
