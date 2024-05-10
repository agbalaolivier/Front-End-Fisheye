import { PhotographerApi } from "../Api/PhotographerApi.js";
import { MediaApi } from "../Api/MediaApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";
import MediaFactory from "../Factory/MediaFactory.js";
import MediaTemplate from "../templates/MediaTemplate.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import Lightbox from "../pages/lightbox.js";




class PhotographerApp {
    constructor() {
        this.photographerApi = new PhotographerApi();
        this.mediaApi = new MediaApi();
        this.modal = document.getElementById("contact_modal");
        this.contactForm = document.querySelector('form'); 

    }

    async initialize() {
        try {
            const { photographerData, mediaDatas } = await this.getPhotographerData();
            this.displayPhotographer(photographerData, mediaDatas);
            this.initLightbox(); 
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
    
            // Afficher le photographe et ses détails dans le header
            const photographer = new PhotographerModel(photographerData);
            const photographerTemplate = new PhotographerTemplate(photographer);
            const photographerHeaderElement = document.querySelector('.photograph-header');
            const photographerPortraitDOM = photographerTemplate.getUserCardDOM1();
            photographerPortraitDOM.classList.add('photographer-image');
            photographerHeaderElement.appendChild(photographerPortraitDOM);
    
            // Afficher les médias du photographe dans la section principale
            console.log(photographer);
            const mediaModels = mediaDatas.map(media =>  new MediaFactory(media,photographer).getMedia());
            const mediaTemplate = new MediaTemplate(mediaModels);
            const mediaDOM = mediaTemplate.showMedia();
    
            let photographerContainerElement = document.getElementById('main');
            if (!photographerContainerElement) {
                photographerContainerElement = document.createElement('div');
                photographerContainerElement.id = 'main';
                document.body.appendChild(photographerContainerElement);
            }
    
            // Ajouter les médias du photographe dans la section principale
            photographerContainerElement.appendChild(mediaDOM);
    
        } catch (error) {
            console.error('Error displaying photographer data:', error);
        }
        
     // Ajouter l'événement pour afficher le modal
const contactButton = document.querySelector('.contact_button');
contactButton.addEventListener('click', () => {
    this.displayModal();
});

// Ajouter l'événement pour fermer le modal
const closeButton = document.querySelector('.modal header img');
closeButton.addEventListener('click', () => {
    this.closeModal();
});
 // Récupérer le nom du photographe
 const photographerName = photographerData.name;

 // Modifier le titre "Contactez-moi" pour inclure le nom du photographe
 const contactHeader = document.querySelector('.modal header h2');
 contactHeader.innerHTML = `Contactez-moi <div class="photographer-name">${photographerName}</div>`;

 }






displayModal() {
this.modal.style.display = "block";
}

closeModal() {
this.modal.style.display = "none";

}

initLightbox() {
    // Instance de la classe Lightbox
    const lightbox = new Lightbox();

    // Sélectionnez vos médias et créez un tableau d'URL
    const mediaArray = [...document.querySelectorAll('.media-container img')];
    const mediaURLs = mediaArray.map(media => media.src);

    // Ajoutez un gestionnaire d'événements à chaque média
    mediaArray.forEach((media, index) => {
        media.addEventListener('click', () => {
            lightbox.openLightbox(mediaURLs, index);
        });
    });
}


}


const app = new PhotographerApp();
app.initialize()





    








