

export class Api {

    constructor(url) {
        this.url=url
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            return await response.json();
        } catch (error) {
            throw new Error(error);
        }
    }
}
