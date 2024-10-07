import axios from "axios";
export const URL = "https://89.110.109.31/";

class EndPoint{
    constructor(url){
        this.url = url;
    }

    async getUrl(endpoint){
        return axios.get(`${this.url}/${endpoint}`,{
            headers:{
                "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
            }
        });
    }

    async customUrl(url,endpoint){
        return axios.get(`${url}/${endpoint}`,{
            headers:{
                "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
            }
        })
    }

    async postUrl(endpoint,data){
        return axios.post(`${this.url}/${endpoint}`,data,{
            headers:{
                "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
            }
        });
    }
}

const Movie = new EndPoint(URL);

export { Movie };