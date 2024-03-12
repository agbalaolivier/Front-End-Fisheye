import { Api } from "./Api.js";

export class PhotographerApi {

    constructor() {
        this.api=new Api('./data/photographers.json');
    }

    async getDatas() {
        return (await this.api.fecthData()).photographers;
    }
}