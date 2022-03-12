import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

import { CreateMovieDto } from './create-movie.dto';

export class MovieDto extends CreateMovieDto {
  @ApiModelProperty({ type: Number })
  id: number;
}
