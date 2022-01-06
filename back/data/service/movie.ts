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
    const response = await this.http.get(
      `${process.env.URL}/?apikey=${process.env.API_KEY}${title}${year}${type}${page}`,
    );
    return response.data;
  }

  async movieById(
    { id }: {
      id: string;
    },
  ) {
    const response = await this.http.get(
      `${process.env.URL}/?apikey=${process.env.API_KEY}${id}&plot=full`,
    );
    return response.data;
  }
}
