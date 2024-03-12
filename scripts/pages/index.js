import { PhotographerApi } from "../Api/PhotographerApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";
class Index {

    constructor() {
        this.photographerApi = new PhotographerApi();
    }


    async getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        this.photographersData = await this.photographerApi.getDatas();
        console.log(this.photographersData);
        this.photographersData;
    }

    async displayData() {
        const photographersSection = document.querySelector(".photographer_section");

        this.photographersData.forEach((photographer) => {
            const photographerModel= new PhotographerModel(photographer);
            const photographerTemplate = new PhotographerTemplate(photographerModel);
            const userCardDOM = photographerTemplate.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async init() {
        // Récupère les datas des photographes
        await this.getPhotographers();
        this.displayData();
        
        // Créer les pages individuelles pour chaque photographe
        this.photographersData.forEach((photographer) => {
            this.createPhotographerPage(photographer);
    });
    

    }

}

const app = new Index();
app.init();

