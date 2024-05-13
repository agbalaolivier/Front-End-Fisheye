import { PhotographerApi } from "../Api/PhotographerApi.js";
import { MediaApi } from "../Api/MediaApi.js";
import { PhotographerModel } from "../Model/PhotographerModel.js";
import { PhotographerTemplate } from "../templates/PhotographerTemplate.js";
import MediaFactory from "../Factory/MediaFactory.js";
import MediaTemplate from "../templates/MediaTemplate.js";
import {displayModal , closeModal} from "../utils/contactForm.js";
import Lightbox from "../pages/lightbox.js";




class PhotographerApp {
    constructor() {
        this.photographerApi = new PhotographerApi();
        this.mediaApi = new MediaApi();
        this.modal = document.getElementById("contact_modal");
        this.contactForm = document.querySelector('form');
        this.initializeFormValidation(); // Ajouter cette ligne pour initialiser la validation 
        

    }

    async initialize() {
        try {
            const { photographerData, mediaDatas } = await this.getPhotographerData();
            this.displayPhotographer(photographerData, mediaDatas);
            this.initLightbox(); 
            this.createSortOptions(); // Appeler la méthode pour créer et insérer les options de tri
            this.sortMedia(criteria)

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
    const mediaArray = [...document.querySelectorAll('.media-container img,.media-container video')];
    const mediaURLs = mediaArray.map(media => media.src);

    // Ajoutez un gestionnaire d'événements à chaque média
    mediaArray.forEach((media, index) => {
        media.removeEventListener('click', this.handleMediaClick); // Supprimez l'ancien gestionnaire pour éviter les doublons
        media.addEventListener('click', () => {
            console.log(`Media at index ${index} clicked`, media.src); // Affiche l'URL du média cliqué
            lightbox.openLightbox(mediaURLs, index);
        });
    });

   
}
handleMediaClick = (mediaURLs, index) => {
    console.log(`Media at index ${index} clicked`, mediaURLs[index]); // Affiche l'URL du média cliqué
    lightbox.openLightbox(mediaURLs, index);
}
//verification modale
initializeFormValidation() {
    this.contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêcher la soumission du formulaire
        const firstName = this.contactForm.querySelector('[name="first_name"]').value;
        const lastName = this.contactForm.querySelector('[name="last_name"]').value;
        const email = this.contactForm.querySelector('[name="email"]').value;
        const message = this.contactForm.querySelector('[name="message"]').value;

        if (!this.isValidInput(firstName, 2)) {
            alert('Le nom doit contenir au moins 2 caractères.');
            return;
        }
        if (!this.isValidInput(lastName, 2)) {
            alert('Le prénom doit contenir au moins 2 caractères.');
            return;
        }
        if (!this.isValidEmail(email)) {
            alert('L\'email n\'est pas valide.');
            return;
        }
        if (!this.isValidInput(message, 10)) {
            alert('Le message doit contenir au moins 10 caractères.');
            return;
        }

        this.contactForm.submit(); // Soumettre le formulaire si tout est valide
    });
}

isValidInput(input, minLength) {
    return input.length >= minLength;
}

isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// option de triage
createSortOptions() {
    const mainContainer = document.getElementById('main'); 

    if (!mainContainer) {
        console.error('Élément main non trouvé');
        return;
    }

    
    
    const sortOptionsContainer = document.createElement('div');
    sortOptionsContainer.classList.add('option-container');
    sortOptionsContainer.textContent = 'Trier par';
    sortOptionsContainer.addEventListener('click', () => {
        optionsContainer.style.display = optionsContainer.style.display === 'none' ? 'block' : 'none';
    });
    
    const sortByTitleButton = document.createElement('button');
    sortByTitleButton.classList.add('sort-by-title');
    sortByTitleButton.textContent = 'Titre';
    sortByTitleButton.addEventListener('click', () => this.sortMedia('title')); 

    const sortByPopularityButton = document.createElement('button');
    sortByPopularityButton.classList.add('sort-by-popularity');
    sortByPopularityButton.textContent = 'Popularité';
    sortByPopularityButton.addEventListener('click', () => this.sortMedia('popularity'));

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    optionsContainer.style.display = 'none'; // Caché par défaut

    optionsContainer.appendChild(sortByTitleButton);
    optionsContainer.appendChild(sortByPopularityButton);

    sortOptionsContainer.appendChild(optionsContainer);


    const photographHeaderElement = document.querySelector('.photograph-header');
    mainContainer.insertBefore(sortOptionsContainer, photographHeaderElement.nextSibling);


}
sortMedia(criteria) {
    
    const mainContainer = document.getElementById('main');
    const mediaContainers = document.querySelectorAll('.media-container');

    mediaContainers.forEach(container => {
        const mediaArray = Array.from(container.children);
        if (criteria === 'title') {
            mediaArray.sort((a, b) => {
                const titleA = a.dataset.title.toUpperCase();
                const titleB = b.dataset.title.toUpperCase();
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            });
        } else if (criteria === 'popularity') {
            mediaArray.sort((a, b) => {
                const popularityA = parseInt(a.dataset.popularity);
                const popularityB = parseInt(b.dataset.popularity);
                return popularityB - popularityA;
            });
        }
        mediaArray.forEach(media => container.appendChild(media));
    });
    

    }



}


const app = new PhotographerApp();
app.initialize()





    








