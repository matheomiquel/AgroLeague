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
    const response = await this.movieData.search(searchParameters);
    return res.json(response);
  }
}
