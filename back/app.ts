import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MovieRoute, MovieServices } from "./controller";
import { MovieData } from "./data";
import axios from "axios";
import NodeCache from "node-cache";
export class Main {
  constructor() {
    let path = ".env";
    if (process.env.APP_ENV) {
      path = `${path}.${process.env.APP_ENV}`;
    }
    dotenv.config({ path: path });
    const PORT = process.env.PORT ?? 3000;

    const app = Express();
    app.use(cors());
    app.use(bodyParser.json());

    const cache = new NodeCache({ checkperiod: 120 });
    const http = axios;
    const movieData = new MovieData({ http });
    const movieServices = new MovieServices({ movieData, cache });
    new MovieRoute({ app, movieServices });
    const startLog = async function log() {
      console.log(`server lauch on port ${PORT}`);
    };

    app.listen(PORT, startLog);
  }
}