import { PhotographerApi } from "../Api/PhotographerApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";

class Index {
    constructor() {
        this.photographerApi = new PhotographerApi();
    }

    async getPhotographers() {
        this.photographersData = await this.photographerApi.getDatas();
        console.log(this.photographersData);
    }

    async displayData() {
        const photographersSection = document.querySelector(".photographer_section");

        this.photographersData.forEach((photographer) => {
            const photographerModel = new PhotographerModel(photographer);
            const photographerTemplate = new PhotographerTemplate(photographerModel);
            const userCardDOM = photographerTemplate.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);

            // Ajouter l'événement de clic sur l'image du photographe
            const photoElement = userCardDOM.querySelector(".photo");
            photoElement.onclick = () => {
                // Rediriger vers la page du photographe
                window.location.href = `photographer.html?id=${photographer.id}`;
            };
        });
    }
}

const app = new Index();
app.getPhotographers().then(() => {
    app.displayData();
});