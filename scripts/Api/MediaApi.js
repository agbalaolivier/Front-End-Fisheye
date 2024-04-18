import { Api } from "./Api.js";

export class MediaApi {

    constructor() {
        this.api=new Api('./data/photographers.json');
    }

    async getDatas() {
        return (await this.api.fetchData()).media;
    }

    async getDatasForOnePhotographe(photographerId) {
        let datas=await this.getDatas();
        return datas.filter((data)=>  data.photographerId==photographerId);
    }
}