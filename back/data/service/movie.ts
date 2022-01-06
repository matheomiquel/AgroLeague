import axios from "axios";
export class MovieData {
  private readonly http: typeof axios;
  constructor({ http }: { http: typeof axios }) {
    this.http = http;
  }
  async search(
    { title, year, type, page }: {
      title: string;
      year: string;
      type: string;
      page: string;
    },
  ) {
    const movies = await this.http.get(
      `${process.env.URL}/?apikey=${process.env.API_KEY}${title}${year}${type}${page}`,
    );
    if (typeof movies.data === "string") {
      throw "error";
    }
    return movies.data;
  }

  async movieById(
    { id }: {
      id: string;
    },
  ) {
    const movie = await this.http.get(
      `${process.env.URL}/?apikey=${process.env.API_KEY}${id}&plot=full`,
    );
    if (typeof movie.data === "string") {
      throw "error";
    }
    return movie.data;
  }
}
