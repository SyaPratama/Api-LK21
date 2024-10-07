import { Movie } from "./EndPoint.js";
import * as cherrio from "cheerio";

const Genre = async () => {
    const Content = await Movie.getUrl('/');
    const $ = cherrio.load(Content.data);
    const navGenre = $("#menu-item-66").children('.sub-menu');
    const listGenre = [];
    navGenre.each(function(){
        const allGenre = $(this).find(".menu-item > a > span[itemprop='name']");
        allGenre.each(function(){
           const genre = $(this).text();
           listGenre.push(genre);
        });
    });
    return {
        message: "Berhasil Mendapatkan Genre Movie",
        status: 200,
        data: listGenre
    }
};


export { Genre };
