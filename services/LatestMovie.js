import { Movie } from "./EndPoint.js";
import * as cherrio from "cheerio";
import { Lastpage } from "./Pagination.js";

const LatestMovie = async function (res,page) {
  const MaxPage = await Lastpage();
  if(page > MaxPage) {
    res.status(400);
    return res.json({
      message: `Page Tidak Boleh Lebih Dari ${MaxPage}`,
      status: 400
    });
  };

  const ContentPage = await Movie.getUrl(`/page/${page}`);
  const $ = cherrio.loadBuffer(ContentPage.data,{
    encoding:'utf-8'
  });
  const movieArray = [];
  $(".gmr-maincontent > .row #primary #main #gmr-main-load").each(function(){
      $(this).children('.item').each(async function(){
        const genreArr = [];
        const thumbnail = $(this).find('.content-thumbnail > a > img').attr('src');
        const title = $(this).find('.item-article > .entry-header > h2.entry-title > a').html();
        $(this).find('.item-article > .entry-header > .gmr-movie-on').children('a').each(function(){
          genreArr.push($(this).html());
        });
        const created = $(this).find('.item-article > .entry-header > .screen-reader-text > time').html();
        const url = $(this).find('.content-thumbnail > a').attr('href');
        movieArray.push({title,genre: genreArr,thumbnail,created,url});
      });
  });

  res.status(200);
  res.json({
    message: 'Berhasil Mendapatkan Data Film',
    status: 200,
    data: movieArray
  })
};

export { LatestMovie };
