import { Test, TestingModule } from '@nestjs/testing';

import { CreateMovieDto } from '../../dto/create-movie.dto';
import { Database } from '../../interfaces/database.interface';
import { FindMovieDto } from '../../dto/find-movie.dto';
import { MoviesService } from './movies.service';

const database: Database = {
  genres: ['Comedy', 'Crime', 'Drama', 'Fantasy', 'Music'],
  movies: [
    {
      id: 1,
      title: 'Beetlejuice',
      year: 1988,
      runtime: 92,
      genres: ['Comedy', 'Fantasy'],
      director: 'Tim Burton',
      actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
      plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
      posterUrl:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
    },
  ],
};

describe(MoviesService.name, () => {
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    moviesService.database = database;
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
  });

  describe('createMovie', () => {
    it('should call with expected params and return new movie', async () => {
      const createMovieSpy = jest.spyOn(moviesService, 'createMovie');
      const createMovieDto: CreateMovieDto = {
        title: 'The Cotton Club',
        year: 1984,
        runtime: 127,
        genres: ['Crime', 'Drama', 'Music'],
        director: 'Francis Ford Coppola',
        actors: 'Richard Gere, Gregory Hines, Diane Lane, Lonette McKee',
        plot: 'The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.',
        posterUrl:
          'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
      };
      const movie = await moviesService.createMovie(createMovieDto);

      expect(movie).toEqual({
        id: 2,
        ...createMovieDto,
      });
      expect(createMovieSpy).toHaveBeenCalledWith(createMovieDto);
    });
  });

  describe('searchMovie', () => {
    it('should call method with expected params', async () => {
      const searchMovieSpy = jest.spyOn(moviesService, 'searchMovie');
      const findMovieDto: FindMovieDto = {
        duration: 90,
        genres: ['Comedy'],
      };
      await moviesService.searchMovie(findMovieDto);
      expect(searchMovieSpy).toHaveBeenCalledWith(findMovieDto);
    });

    it('should return movie for duration 90 and Comedy', async () => {
      const findMovieDto: FindMovieDto = {
        duration: 90,
        genres: ['Comedy'],
      };
      const movie = await moviesService.searchMovie(findMovieDto);

      expect(movie).toEqual({
        id: 1,
        title: 'Beetlejuice',
        year: 1988,
        runtime: 92,
        genres: ['Comedy', 'Fantasy'],
        director: 'Tim Burton',
        actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
        plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
        posterUrl:
          'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
      });
    });

    it('should not return movie for duration 120', async () => {
      const findMovieDto: FindMovieDto = {
        duration: 120,
      };
      const movie = await moviesService.searchMovie(findMovieDto);

      expect(movie).toEqual(null);
    });
  });
});
