import { Movie } from "./EndPoint.js";
import * as cherrio from "cheerio";

const Lastpage = async () => {
    const content = await Movie.getUrl('/');

    const $ = cherrio.load(content.data);
    const pagination = $('#primary > #main').find('.pagination');
    const pageNum = $(pagination).find('.page-numbers').eq(5).get(0);
    return $(pageNum).html();
}

export { Lastpage }