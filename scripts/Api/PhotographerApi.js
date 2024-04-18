import { Api } from "./Api.js";

export class PhotographerApi {

    constructor() {
        this.api=new Api('./data/photographers.json');
    }

    async getDatas() {
        return (await this.api.fetchData()).photographers;
    }

    async getDataById(photographerId) {
        let datas=await this.getDatas();
        return datas.find((data)=>  data.id==photographerId);
    }
}