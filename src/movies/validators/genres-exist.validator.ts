import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MoviesService } from '../services/movies/movies.service';

@ValidatorConstraint({ name: 'genresExist', async: false })
export class GenresExist implements ValidatorConstraintInterface {
  private readonly moviesService: MoviesService;

  constructor() {
    this.moviesService = new MoviesService();
  }

  validate(genres: string[]): boolean {
    return (
      Array.isArray(genres) &&
      genres.every((genre: string) => this.moviesService.genres.includes(genre))
    );
  }

  defaultMessage(): string {
    return 'all string should be allowed.';
  }
}
