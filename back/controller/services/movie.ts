import { Request, Response } from "express";
import { MovieData } from "../../data";
import NodeCache from "node-cache";
export class MovieServices {
  private readonly movieData: MovieData;
  private readonly cache: NodeCache;
  constructor(
    { movieData, cache }: { movieData: MovieData; cache: NodeCache },
  ) {
    this.movieData = movieData;
    this.cache = cache;
  }
  async search(req: Request, res: Response): Promise<Response> {
    const searchParameters = {
      title: `&s=${req.query.title}`,
      year: req.query.year ? `&y=${req.query.year}` : "",
      type: req.query.type ? `&type=${req.query.type}` : "",
      page: req.query.page ? `&page=${req.query.page}` : "",
    };
    try {
      let movies = this.cache.get(JSON.stringify(searchParameters));
      if (!!movies == false) {
        movies = await this.movieData.search(searchParameters);
        this.cache.set(JSON.stringify(searchParameters), movies, 7200);
      }
      return res.json(movies);
    } catch (e) {
      return res.status(500).json("error");
    }
  }
  
  async movieById(req: Request, res: Response): Promise<Response> {
    const searchParameters = {
      id: `&i=${req.params.id}`,
    };
    try {
      let movie = this.cache.get(searchParameters.id);
      if (!!movie == false) {
        movie = await this.movieData.movieById(searchParameters);
        this.cache.set(searchParameters.id, movie, 7200);
      }
      return res.json(movie);
    } catch (e) {
      return res.status(500).json("error");
    }
  }
}
