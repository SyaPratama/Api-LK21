import express from "express";
import { LatestMovie } from "./services/LatestMovie.js";
import { Genre } from "./services/Genre.js";
import SearchMovie from "./services/Search.js";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { page } = req.query;
    const currentPage =  page ? page : 1; 
    const response = await LatestMovie(currentPage);
    res.status(response.status);
    res.json(response);
    res.end();
  } catch (error) {
    console.error("Error Server :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/genre", async(req,res) => {
  try{
    res.setHeader("Content-Type","application/json");
    const response = await Genre();
    res.status(response.status);
    res.json(response);
    res.end();
  }catch(error){
    console.log('Error Server : ',error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.get('/search/:keyword', async(req,res) => {
  try{
    const { keyword } = req.params;
    const { page } = req.query;
    const pagination = page ? page : 1;
    res.setHeader("Content-Type","application/json");
    const response = await SearchMovie(pagination,keyword);
    // res.status(response.status);
    res.json(response);
    res.end();
  }catch(error){
    console.log("Error Server : ",error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.listen(port, () => {
  console.info(`Server Listening In http://localhost:${port}`);
});
