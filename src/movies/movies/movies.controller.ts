import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMovieDto } from '../dto/create-movie.dto';
import { FindMovieDto } from '../dto/find-movie.dto';
import { MovieDto } from '../dto/movie.dto';
import { MoviesService } from '../services/movies/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiTags('movies')
  @ApiResponse({
    status: 201,
    description: 'An endpoint that will create an movie.',
    type: MovieDto,
  })
  async create(
    @Body() createMovieDto: CreateMovieDto
  ): Promise<CreateMovieDto> {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  @ApiTags('movies')
  @ApiResponse({
    status: 200,
    description: 'An endpoint that will return an array of movies.',
    type: MovieDto,
    isArray: true,
  })
  async find(@Body() findMovieDto: FindMovieDto): Promise<MovieDto> {
    return this.moviesService.searchMovie(findMovieDto);
  }
}
