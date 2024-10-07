import express from "express";
import { LatestMovie } from "./services/LatestMovie.js";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const currentPage =  page ? page : 1; 
    res.setHeader("Content-Type", "application/json");
    await LatestMovie(res,currentPage);
  } catch (error) {
    console.error("Error Server :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.info(`Server Listening In http://localhost:${port}`);
});
