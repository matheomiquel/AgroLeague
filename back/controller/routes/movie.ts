import { Express, NextFunction, Request, Response } from "express";
import { MovieServices } from "..";

export class MovieRoute {
  private readonly endpoint = "movie";
  constructor({ app, movieServices }: { app: Express; movieServices: MovieServices }) {
    app.get(`/${this.endpoint}`, 
    movieServices.search.bind({ ...movieServices }));
  }
}
