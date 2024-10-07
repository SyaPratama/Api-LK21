import { Movie } from "./EndPoint.js";
import * as cherrio from "cheerio";

const Lastpage = async (endpoint) => {
    const content = await Movie.getUrl(endpoint);
    const $ = cherrio.load(content.data);
    const pagination = $('#primary > #main').find('.pagination');
    const num = $(pagination).find('.page-numbers > li').length;
    const pageNum = $(pagination).find('.page-numbers').eq(num - 1);
    return $(pageNum).html();
}

export default Lastpage 