import { Genre } from "../services/Genre.js";
import { LatestMovie } from "../services/LatestMovie.js";
import SearchMovie from "../services/Search.js";

describe("Get Latest Movie", () => {
  it("Status Code Will Be 200 When Correct", async () => {
    const response = await LatestMovie(1);
    expect(response.status).toBe(200);
  });

  it('Statu Code Will Be 400 When Page Than MaxPage', async () => {
    const response = await LatestMovie(864);
    expect(response.status).toBe(400);
  })
});


describe("Get Category Movie", () => {
  it("Status Code Will Be 200 When Correct",async () => {
    const response = await Genre();
    expect(response.status).toBe(200);
  });
});

describe("Get Search Movie", () => {
  it("Status Code Will Be 200 When Correct",async() => {
    const response = await SearchMovie(1,"s");
    expect(response.status).toBe(200);
  });

  it('Status Code Will Be 404 When Not Found Search Film', async () => {
    const response = await SearchMovie(1,"asdasdasdas");
    expect(response.status).toBe(404);
  });

  it("Status Code Will Be 400 When Current Page Greater Than Max Page",async () => {
    const response = await SearchMovie(3,"setan");
    expect(response.status).toBe(400);
  });
});