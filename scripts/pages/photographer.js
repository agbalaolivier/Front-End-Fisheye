
import { PhotographerApi } from "../Api/PhotographerApi.js";
import { MediaApi } from "../Api/MediaApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";
import MediaFactory from "../Factory/MediaFactory.js";
import MediaTemplate from "../templates/MediaTemplate.js";

class PhotographerApp {
    constructor() {
        this.photographerApi = new PhotographerApi();
        this.mediaApi = new MediaApi();
    }

    async initialize() {
        try {
            const { photographerData, mediaDatas } = await this.getPhotographerData();
            this.displayPhotographer(photographerData, mediaDatas);
        } catch (error) {
            console.error('An error occurred during initialization:', error);
        }
    }

    async getPhotographerData() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const photographerId = urlParams.get('id');
            const photographerData = await this.photographerApi.getDataById(photographerId);
            const mediaDatas = await this.mediaApi.getDatasForOnePhotographe(photographerId);
            return { photographerData, mediaDatas };
        } catch (error) {
            console.error('Error fetching photographer data:', error);
            throw error;
        }
    }

    displayPhotographer(photographerData, mediaDatas) {
        try {
            if (!photographerData || !photographerData.id) {
                throw new Error('Error: Photographer data is missing or incomplete.');
            }
           
    
            const photographer = new PhotographerModel(photographerData);
            const photographerTemplate = new PhotographerTemplate(photographer);
            const photographerPortraitDOM = photographerTemplate.getUserCardDOM1();
            photographerPortraitDOM.classList.add('photographer-image'); // Ajouter la classe à l'image du photographe
    
            const photographerHeaderElement = document.querySelector('.photograph-header');
            photographerHeaderElement.appendChild(photographerPortraitDOM);
    
            const photographerDetailsDOM = photographerTemplate.getDetailsDOM();
    
            const mediaModels = mediaDatas.map(media => new MediaFactory(media).getMedia());
            const mediaTemplate = new MediaTemplate(mediaModels);
            const mediaDOM = mediaTemplate.showMedia();
    
            let photographerContainerElement = document.getElementById('photographer-container');
            if (!photographerContainerElement) {
                photographerContainerElement = document.createElement('div');
                photographerContainerElement.id = 'photographer-container';
                document.body.appendChild(photographerContainerElement);
            }
    
            // Ajoutez les médias du photographe dans la section principale
            photographerContainerElement.appendChild(mediaDOM);
    
        } catch (error) {
            console.error('Error displaying photographer data:', error);
        }
        
   
}


}
    

const app = new PhotographerApp();
app.initialize();


        
    

    