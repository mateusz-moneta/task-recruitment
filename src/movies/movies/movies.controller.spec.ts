import { Test, TestingModule } from '@nestjs/testing';

import { CreateMovieDto } from '../dto/create-movie.dto';
import { MoviesController } from './movies.controller';
import { MoviesService } from '../services/movies/movies.service';

describe(MoviesController.name, () => {
  let controller: MoviesController;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateMovieDto();
    expect(controller.create(dto)).not.toEqual(null);
  });

  it('calling createMovie method in MoviesService', () => {
    const createMovieSpy = jest.spyOn(moviesService, 'createMovie');
    const dto = new CreateMovieDto();
    controller.create(dto);
    expect(createMovieSpy).toHaveBeenCalledWith(dto);
  });

  it('calling find method', () => {
    expect(controller.find).not.toEqual(null);
  });

  it('calling searchMovie method in MoviesService', () => {
    const searchMovieSpy = jest.spyOn(moviesService, 'searchMovie');
    controller.find({ duration: 90 });
    expect(searchMovieSpy).toHaveBeenCalledWith({ duration: 90 });
  });
});
