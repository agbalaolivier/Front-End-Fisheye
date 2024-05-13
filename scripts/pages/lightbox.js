export default class Lightbox {
    constructor() {
        this.lightbox = document.createElement('div');
            this.lightbox.id = 'lightbox';
            document.body.appendChild(this.lightbox);
            document.addEventListener('keydown', this.handleKeydown);

         // Création des éléments média de la lightbox

        this.lightboxMedia = document.createElement('img');
        this.lightboxMedia.id = 'lightbox-media';
        this.lightbox.appendChild(this.lightboxMedia);

         // Création du bouton de fermeture

        this.closeButton = document.createElement('button');
        this.closeButton.classList.add('close-button');
        this.closeButton.innerHTML = '<img src="assets/icons/close.svg" />';
        this.lightbox.appendChild(this.closeButton);

         // Création du bouton précédent

        this.prevButton = document.createElement('button');
        this.prevButton.classList.add ('prev-button');
        this.prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        this.lightbox.appendChild(this.prevButton);

        // Création du bouton suivant

        this.nextButton = document.createElement('button');
        this.nextButton.classList.add ('next-button');
        this.nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        this.lightbox.appendChild(this.nextButton);

        // Initialisation de l'index courant

        this.currentIndex = 0;

        // Ajout des écouteurs d'événements

        this.closeButton.addEventListener('click', () => {
            this.closeLightbox();
        });
        this.prevButton.addEventListener('click', () => {
            this.navigate(-1);
        });
        this.nextButton.addEventListener('click', () => {
            this.navigate(1);
        });
    }

    handleKeydown = (event) => {
        switch (event.key) {
            case 'ArrowRight':
                this.navigate(1);
                break;
            case 'ArrowLeft':
                this.navigate(-1);
                break;
            case 'Escape':
                this.closeLightbox();
                break;
        }
    }

    openLightbox(mediaURLs, startIndex) {
        this.mediaURLs = mediaURLs; // Stockage des URLs des médias
        this.currentIndex = startIndex;
        this.lightboxMedia.src = mediaURLs[startIndex];
        this.lightbox.style.display = 'block';

        }
        navigate(direction) {
            this.currentIndex = (this.currentIndex + direction + this.mediaURLs.length) % this.mediaURLs.length;
            this.lightboxMedia.src = this.mediaURLs[this.currentIndex];
        }

        closeLightbox() {
            this.lightbox.style.display = 'none';
            document.removeEventListener('keydown', this.handleKeydown);
        }
    }

        
