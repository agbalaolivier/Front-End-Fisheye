export default class Lightbox {
    constructor() {
        this.mediaModels=this.mediaModels
        this.lightbox = document.createElement('div');
            this.lightbox.id = 'lightbox';
            document.body.appendChild(this.lightbox);
            document.addEventListener('keydown', this.handleKeydown);

         // Création des éléments média de la lightbox

        this.lightboxMedia = document.createElement('img');
        this.lightboxMedia.id = 'lightbox-media';
        this.lightbox.appendChild(this.lightboxMedia);

    // Création de l'élément pour le titre du média
       this.lightboxTitle = document.createElement('p');
       this.lightboxTitle.id = 'lightbox-title'; // Ajout d'un ID pour référence facile
       this.lightbox.appendChild(this.lightboxTitle);


         // Création du bouton de fermeture

        this.closeButton = document.createElement('button');
        this.closeButton.classList.add('close-button');
        this.closeButton.innerHTML = '<i class="fas fa-times"></i>';
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
        if (this.lightbox.style.display === 'block') { // Vérifiez si la lightbox est ouverte
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
        }else if (event.key === 'Enter') { // Si la lightbox n'est pas ouverte, vérifiez pour la touche 'Enter'
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('media-container')) {
                const mediaIndex = Array.from(focusedElement.parentElement.children).indexOf(focusedElement);
                this.openLightbox(this.mediaURLs, mediaIndex);
            }
            

            }
            

            }

    openLightbox(mediaURLs, mediaTitles, startIndex) {
        this.mediaURLs = mediaURLs; // Stockage des URLs des médias
        this.mediaTitles = mediaTitles; // Stockage des titres des médias
    
        
        this.currentIndex = startIndex;
        this.lightboxMedia.src = mediaURLs[startIndex];
        this.lightboxTitle.textContent = mediaTitles[startIndex]; // Affichage du titre
        this.lightbox.style.display = 'block';

        }
        navigate(direction) {
            this.currentIndex = (this.currentIndex + direction + this.mediaURLs.length) % this.mediaURLs.length;
            this.lightboxMedia.src = this.mediaURLs[this.currentIndex];
            this.lightboxTitle.textContent = this.mediaTitles[this.currentIndex]; // Mise à jour du titre
        }

        closeLightbox() {
            this.lightbox.style.display = 'none';
            document.removeEventListener('keydown', this.handleKeydown);
        }
        

        }
    
    

    

        
