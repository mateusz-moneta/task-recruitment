import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { CreateMovieDto } from '../../dto/create-movie.dto';
import { Database } from '../../interfaces/database.interface';
import { FindMovieDto } from '../../dto/find-movie.dto';
import { getRandomElements } from '../../utils/random-elements.util';
import { MovieDto } from '../../dto/movie.dto';

@Injectable()
export class MoviesService {
  private readonly database: Database;
  private readonly path: string = './data/db.json';

  private get movies(): MovieDto[] {
    return this.database.movies;
  }

  private set movies(movies: MovieDto[]) {
    this.database.movies = movies;
  }

  get genres(): string[] {
    return this.database.genres;
  }

  constructor() {
    const databaseFile = fs.readFileSync(this.path, 'utf8');
    this.database = JSON.parse(databaseFile);
  }

  createMovie(createMovieDto: CreateMovieDto): MovieDto {
    const lastMovieId = this.movies[this.movies.length - 1].id;
    const newMovie: MovieDto = {
      id: lastMovieId + 1,
      ...createMovieDto,
    };

    this.movies = [...this.movies, newMovie];

    fs.writeFileSync(this.path, JSON.stringify(this.database));

    return newMovie;
  }

  searchMovie(findMovieDto: FindMovieDto): MovieDto {
    if (findMovieDto.duration && findMovieDto.genres) {
      return getRandomElements<MovieDto>(this.movies, 1)[0];
    }

    if (findMovieDto.duration) {
      const movies = this.movies.filter(
        (movie: MovieDto) =>
          +movie.runtime >= findMovieDto.duration - 10 &&
          +movie.runtime <= findMovieDto.duration + 10
      );

      return movies.length ? getRandomElements<MovieDto>(movies, 1)[0] : null;
    }

    if (findMovieDto.genres) {
      const movies = this.movies.filter(
        ({ genres }) =>
          !!genres.filter((nestedGenre: string) =>
            findMovieDto.genres.some((genre: string) => nestedGenre === genre)
          ).length
      );

      return movies.length ? getRandomElements<MovieDto>(movies, 1)[0] : null;
    }

    return getRandomElements<MovieDto>(this.movies, 1)[0];
  }
}
