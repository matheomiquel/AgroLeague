import { Request, Response } from "express";
import { MovieData } from "../../data";

export class MovieServices {
  private readonly movieData: MovieData;
  constructor({ movieData }: { movieData: MovieData }) {
    this.movieData = movieData;
  }
  async search(req: Request, res: Response): Promise<Response> {
    const response = await this.movieData.search();
    return res.json(response);
  }
}
