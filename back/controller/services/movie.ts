import { Request, Response } from "express";
import { MovieData } from "../../data";

export class MovieServices {
  private readonly movieData: MovieData;
  constructor({ movieData }: { movieData: MovieData }) {
    this.movieData = movieData;
  }
  async search(req: Request, res: Response): Promise<Response> {
    const searchParameters = {
      title: `&s=${req.query.title}`,
      year: req.query.year ? `&y=${req.query.year}` : "",
      type: req.query.type ? `&type=${req.query.type}` : "",
      page: req.query.page ? `&page=${req.query.page}` : "",
    };
    const movies = await this.movieData.search(searchParameters);
    return res.json(movies);
  }
  async movieById(req: Request, res: Response): Promise<Response> {
    const searchParameters = {
      id: `&i=${req.params.id}`,
    };
    const movie = await this.movieData.movieById(searchParameters);
    return res.json(movie);
  }
}
