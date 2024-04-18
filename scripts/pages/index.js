import { PhotographerApi } from "../Api/PhotographerApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";

class Index {
    constructor() {
        this.photographerApi = new PhotographerApi();
    }

    async getPhotographers() {
        try {
            // Récupérer les données des photographes depuis l'API
            this.photographersData = await this.photographerApi.getDatas();
            console.log(this.photographersData);
        } catch (error) {
            console.error('Error fetching photographers:', error);
        }
    }

    async displayData() {
        const photographersSection = document.querySelector(".photographer_section");

        // Vérifier si les données des photographes ont été récupérées avec succès
        if (this.photographersData && Array.isArray(this.photographersData)) {
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
        } else {
            console.error('Photographers data is missing or invalid.');
        }
    }
    

    }
    
const app = new Index();
app.getPhotographers().then(() => {
    app.displayData();
});