import { PhotographerApi } from "../Api/PhotographerApi.js";
import { MediaApi } from "../Api/MediaApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";
import MediaFactory from "../Factory/MediaFactory.js";
import MediaTemplate from "../templates/MediaTemplate.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { initializeFormValidation } from "../pages/formValidation.js";
import Lightbox from "../utils/lightbox.js";
import OptionTri from "../utils/OptionTri.js";

class PhotographerApp {
    constructor() {
        this.photographerApi = new PhotographerApi();
        this.mediaApi = new MediaApi();
        this.modal = document.getElementById('contact_modal');
        this.contactForm = this.modal ? this.modal.querySelector('form') : null;
        initializeFormValidation(this.contactForm);
        this.lightbox = new Lightbox();
    }

    async initialize() {
        try {
            const { photographerDataJson, mediaDatasJson } = await this.getPhotographerData();
            this.displayPhotographer(photographerDataJson);
            this.displayPhotographerMedias( mediaDatasJson);
            this.initLightbox();
        } catch (error) {
            console.log('An error occurred during initialization:', error);
        }
    }



    async getPhotographerData() {
        try {
            const photographerId = this.getId();
            const photographerDataJson = await this.photographerApi.getDataById(photographerId);
            const mediaDatasJson = await this.mediaApi.getDatasForOnePhotographe(photographerId);
            return { photographerDataJson, mediaDatasJson };
        } catch (error) {
            console.log('Error fetching photographer data:', error);
            throw error;
        }
    }

    getId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    displayPhotographer(photographerDataJson) {
        try {
            if (!photographerDataJson || !photographerDataJson.id) {
                throw new Error('Error: Photographer data is missing or incomplete.');
            }

            this.photographerModel = new PhotographerModel(photographerDataJson);
            const photographerTemplate = new PhotographerTemplate(this.photographerModel);
            
            photographerTemplate.renderForPagePhotographer();



        } catch (error) {
            console.error('Error displaying photographer data:', error);
        }

        const contactButton = document.querySelector('.contact_button');
        contactButton.addEventListener('click', () => {
            this.displayModal();
        });

        const closeButton = document.querySelector('.modal header img');
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });

    }

    displayPhotographerMedias( mediaDatasJson) {
       // try {
            const mediaModels = mediaDatasJson.map(media => new MediaFactory(media, this.photographerModel).getMedia());
            const mediaTemplate = new MediaTemplate(mediaModels);
            mediaTemplate.showMedia();


            this.sortOptions = new OptionTri(this.photographerModel, mediaModels,(document.getElementsByClassName('media-container'))[0]);
            
       } catch (error) {
            console.error('Error displaying photographer data:', error);
        

        const contactButton = document.querySelector('.contact_button');
        contactButton.addEventListener('click', () => {
            this.displayModal();
        });

        const closeButton = document.querySelector('.modal header img');
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });

        const photographerName = photographerData.name;
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
        const lightbox = new Lightbox();

        const mediaArray = [...document.querySelectorAll('.media-container img, .media-container video')];
        const mediaURLs = mediaArray.map(media => media.src);
        const mediaTitles = mediaArray.map(media => media.parentElement.querySelector('.media-title').textContent);

        mediaArray.forEach((media, index) => {
            media.tabIndex = 0;
            media.addEventListener('click', () => {
                console.log(`Media at index ${index} clicked`, media.src);
                lightbox.openLightbox(mediaURLs, mediaTitles, index);
            });
            media.addEventListener('focus', () => {
                lightbox.openLightbox(mediaURLs, mediaTitles, index);
            });
        });
    }
}




document.addEventListener('DOMContentLoaded', () => {


    const app = new PhotographerApp();
    app.initialize();

})
