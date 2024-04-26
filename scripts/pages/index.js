import { PhotographerApi } from "../Api/PhotographerApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";


class Index {
    constructor() {
        this.photographerApi = new PhotographerApi();
    }

    async initialize() {
        try {
            await this.fetchPhotographersData();
            this.displayPhotographers();
        } catch (error) {
            console.error('An error occurred during initialization:', error);
        }
    }

    async fetchPhotographersData() {
        try {
            // Récupérer les données des photographes depuis l'API
            this.photographersData = await this.photographerApi.getDatas();
            console.log(this.photographersData);
        } catch (error) {
            throw new Error('Failed to fetch photographers data:', error);
        }
    }

    displayPhotographers() {
        const photographersSection = document.querySelector(".photographer_section");

        if (!Array.isArray(this.photographersData)) {
            console.error('Photographers data is missing or invalid.');
            return;
        }

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
app.initialize();

