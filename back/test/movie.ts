import { Main } from "../app";
import axios from "axios";
import assert from "assert";
new Main();
const serverUrl = "http://localhost:3000";
describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", async function () {
      const paramsRequest = {
        title: "guide",
        year: 2005,
      };
      const movies = await axios.get(
        `${serverUrl}/movie/search?title=${paramsRequest.title}&year=${paramsRequest.year}`,
      );
      assert.equal(movies.status, 200)
      assert.equal(typeof movies.data.Search, typeof []);
      assert.equal(typeof movies.data.Search[0], typeof {});
      assert.equal(Object.keys(movies.data.Search[0]).includes('Title'), true)
      assert.equal(Object.keys(movies.data.Search[0]).includes('Year'), true)
      assert.equal(Object.keys(movies.data.Search[0]).includes('imdbID'), true)
      assert.equal(Object.keys(movies.data.Search[0]).includes('Type'), true)
      assert.equal(Object.keys(movies.data.Search[0]).includes('Poster'), true)
      const movie = await axios.get(
        `${serverUrl}/movie/${movies.data.Search[0].imdbID}`,
      );
      assert.equal(movie.status, 200)
    });
  });
});
