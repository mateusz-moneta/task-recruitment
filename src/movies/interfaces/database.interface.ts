import { MovieDto } from '../dto/movie.dto';

export interface Database {
  genres: string[];
  movies: MovieDto[];
}
