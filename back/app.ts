import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MovieRoute, MovieServices } from "./controller";
import { MovieData } from "./data";
let path = ".env";
if (process.env.APP_ENV) {
  path = `${path}.${process.env.APP_ENV}`;
}
dotenv.config({ path: path });
const PORT = process.env.PORT ?? 3000;

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const movieData = new MovieData();
const movieServices = new MovieServices({ movieData });
new MovieRoute({ app, movieServices });
const startLog = async function log() {
  console.log(`server lauch on port ${PORT}`);
};
app.listen(PORT, startLog);
