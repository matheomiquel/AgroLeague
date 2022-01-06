import { Express } from "express";
import { createValidator } from "express-joi-validation";
import { MovieServices } from "..";
import { SearchMoviesByIdSchema, SearchMoviesSchema } from "../schema";
const validator = createValidator();
export class MovieRoute {
  private readonly endpoint = "movie";
  constructor(
    { app, movieServices }: { app: Express; movieServices: MovieServices },
  ) {
    app.get(
      `/${this.endpoint}/search`,
      validator.query(SearchMoviesSchema),
      movieServices.search.bind({ ...movieServices }),
    );
    app.get(
      `/${this.endpoint}/:id`,
      validator.params(SearchMoviesByIdSchema),
      movieServices.movieById.bind({ ...movieServices }),
    );
  }
}
