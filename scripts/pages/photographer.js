import { PhotographerApi } from "../Api/PhotographerApi.js";
import { MediaApi } from "../Api/MediaApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";
import MediaTemplate from "../templates/MediaTemplate.js";



class Photographer {
    constructor() {
        this.photographerApi = new PhotographerApi();
        this.mediaApi = new MediaApi();
    }

    async getPhotographer() {
        // récupération de l'id dans l'adresse
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');
        
        //Récupération des données du photographe
        this.photographerData = await this.photographerApi.getDataById(photographerId);

        //Récupérations des médias du photographe
        this.mediaDatas = await this.mediaApi.getDatasForOnePhotographe(photographerId);
        console.log(this.mediaDatas);
    }
    

    async displayData() {

        if (this.photographerData && this.photographerData.id) {
            // Instance de PhotographerModel avec les données du photographe
            const photographer = new PhotographerModel(this.photographerData);
    
           
    
            // Instance de PhotographerTemplate avec l'instance de PhotographerModel
            const photographerTemplate = new PhotographerTemplate(photographer);
    
            // Détails du photographe
            const photographerDetailsDOM = photographerTemplate.getDetailsDOM();

            let mediaModels=[];
            this.mediaDatas.forEach(media => {
                mediaModels.push(new MediaFactory(media));
            });
            const mediaTemplate=new MediaTemplate(mediaModels);
            const media=mediaTemplate.showMedia();
/*
             // Création du conteneur pour les détails du photographe
             const photographerDetailsContainer = document.createElement('div');
             photographerDetailsContainer.classList.add('photographer-container');
            // Création l'élément img pour l'image du photographe
            const img = document.createElement('img');
            img.setAttribute('src', photographer.portrait);
            img.setAttribute('alt', photographer.name);
            img.classList.add('photographer-image'); 
    
            // Ajout de l'image avant les détails du photographe
            photographerDetailsContainer.appendChild(img);
            // Ajouter les détails du photographe au conteneur
            photographerDetailsContainer.appendChild(photographerDetailsDOM);
    
            // Ajout du conteneur au corps du document
            document.getElementById('main').appendChild(photographerDetailsContainer);
            */
        } else {
            console.error('Error: Photographer data is missing or incomplete.');
        }
    }
    

    }

const app = new Photographer();
app.getPhotographer().then(() => {
    
    app.displayData();
});




        
    

    