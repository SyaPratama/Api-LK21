import { Movie } from "./EndPoint.js";
import * as cherrio from "cheerio";
import Lastpage from "./Pagination.js";

const SearchMovie = async (page, keyword) => {
  const url = `page/${page}/?s=${keyword}&post_type%5B%5D=post&post_type%5B%5D=tv`;
  const maxPage = await Lastpage(
    `?s=${keyword}&post_type%5B%5D=post&post_type%5B%5D=tv`
  );
  if (Number(page) > Number(maxPage) && maxPage) {
    return {
      message: `Page Tidak Boleh Lebih Dari ${maxPage}`,
      status: 400,
    };
  }
  const Content = await Movie.getUrl(url);
  const $ = cherrio.load(Content.data);
  let error = {};
  const movieArr = [];
  $("#main").each(function () {
    const movieList = $(this).has("#gmr-main-load");
    if (movieList.html() !== null) {
      movieList.each(function () {
        const colFilm = $(this).find(".item > .gmr-box-content").each(function(){
            const thumbnail = $(this)
          .find(".content-thumbnail > a > img")
          .attr("src");
        const title = $(this)
          .find(".item-article > .entry-header > .entry-title > a")
          .html();
        const link = $(this)
          .find(".item-article > .entry-header > .entry-title > a")
          .attr("href");
        const date = $(this)
          .find(".item-article > .entry-header > .screen-reader-text").children('time').html() ?? "";
        movieArr.push({title, thumbnail, link, date});
        });
      });
    } else {
      error = {
        message: "Film Yang Di Cari Tidak Ditemukan!",
        status: 404,
      };
    }
});
  if(movieArr.length > 0){
    return {
        message: "Berhasil Mendapatkan Data Search Film",
        status: 200,
        currentPage:Number(page),
        maxPage: Number(maxPage),
        data: movieArr,
    };
  }else{
    return error;
  }
};

export default SearchMovie;
