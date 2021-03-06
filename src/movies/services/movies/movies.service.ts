import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { CreateMovieDto } from '../../dto/create-movie.dto';
import { Database } from '../../interfaces/database.interface';
import { FindMovieDto } from '../../dto/find-movie.dto';
import { getRandomElements } from '../../utils/random-elements.util';
import { MovieDto } from '../../dto/movie.dto';

@Injectable()
export class MoviesService {
  database: Database;

  private readonly path: string = './data/db.json';

  get movies(): MovieDto[] {
    return this.database.movies;
  }

  set movies(movies: MovieDto[]) {
    this.database.movies = movies;
  }

  get genres(): string[] {
    return this.database.genres;
  }

  constructor() {
    this.readFile();
  }

  createMovie(createMovieDto: CreateMovieDto): MovieDto {
    const lastMovieId = this.movies[this.movies.length - 1].id;
    const newMovie: MovieDto = {
      id: lastMovieId + 1,
      ...createMovieDto,
    };

    this.movies = [...this.movies, newMovie];

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.database));
    } catch (error) {
      console.error(error);
    }

    return newMovie;
  }

  searchMovie(findMovieDto: FindMovieDto): MovieDto {
    if (findMovieDto.duration && findMovieDto.genres) {
      const { duration } = findMovieDto;
      const movies = this.movies.filter(
        ({ genres, runtime }) =>
          !!genres.filter((nestedGenre: string) =>
            findMovieDto.genres.some((genre: string) => nestedGenre === genre)
          ).length &&
          runtime >= duration - 10 &&
          runtime <= duration + 10
      );

      return movies.length ? getRandomElements<MovieDto>(movies, 1)[0] : null;
    }

    if (findMovieDto.duration) {
      const { duration } = findMovieDto;
      const movies = this.movies.filter(
        ({ runtime }: MovieDto) =>
          runtime >= duration - 10 && runtime <= duration + 10
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

  private readFile(): void {
    try {
      const databaseFile = fs.readFileSync(this.path, 'utf8');
      this.database = JSON.parse(databaseFile);
    } catch (error) {
      console.error(error);
    }
  }
}
