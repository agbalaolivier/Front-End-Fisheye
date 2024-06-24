export default class Lightbox {
        constructor(){

            this.lightbox = document.createElement('div');
            this.lightbox.id = 'lightbox';
            this.lightbox.style.display = 'none'; 
            document.body.appendChild(this.lightbox);
            
    
            // Création des boutons de navigation et de fermeture
            this.createButtons();
    
            // Initialisation de l'index courant
            this.currentIndex = 0;

            
            // Création de l'élément pour le titre du média
            this.lightboxTitle = document.createElement('p');
            this.lightboxTitle.id = 'lightbox-title';
            this.lightbox.appendChild(this.lightboxTitle);
    
        }
    
        createButtons() {
            this.closeButton = document.createElement('button');
            this.closeButton.classList.add('close-button');
            this.closeButton.innerHTML = '<i class="fas fa-times"></i>';
            this.lightbox.appendChild(this.closeButton);
    
            this.prevButton = document.createElement('button');
            this.prevButton.classList.add('prev-button');
            this.prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            this.lightbox.appendChild(this.prevButton);
    
            this.nextButton = document.createElement('button');
            this.nextButton.classList.add('next-button');
            this.nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            this.lightbox.appendChild(this.nextButton);
    
            // Ajout des écouteurs d'événements
            this.closeButton.addEventListener('click', () => this.closeLightbox());
            this.prevButton.addEventListener('click', () => this.navigate(-1));
            this.nextButton.addEventListener('click', () => this.navigate(1));
        }
    
        handleKeydown = (event) => {
            if (this.lightbox.style.display === 'block') {
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
            } else if (event.key === 'Enter') {
                const focusedElement = document.activeElement;
                if (focusedElement && focusedElement.classList.contains('media-container')) {
                    const mediaIndex = Array.from(focusedElement.parentElement.children).indexOf(focusedElement);
                    this.openLightbox(this.mediaURLs, mediaIndex);
                }
            }
        }
    
        openLightbox(mediaURLs, mediaTitles, startIndex) {
            this.mediaURLs = mediaURLs;
            this.mediaTitles = mediaTitles;
            this.currentIndex = startIndex;
            this.updateMediaElement(startIndex);
            this.lightboxTitle.textContent = mediaTitles[startIndex];
            this.lightbox.style.display = 'block';
            document.addEventListener('keydown', this.handleKeydown); 
        }
    
        navigate(direction) {
            this.currentIndex = (this.currentIndex + direction + this.mediaURLs.length) % this.mediaURLs.length;
            this.updateMediaElement(this.currentIndex);
            this.lightboxTitle.textContent = this.mediaTitles[this.currentIndex];
        }
    
        updateMediaElement(index) {
            const url = this.mediaURLs[index];
            const isVideo = url.match(/\.(mp4|webm)$/i);
            let newMediaElement;
    
            if (isVideo) {
                newMediaElement = document.createElement('video');
                newMediaElement.controls = true;
            } else {
                newMediaElement = document.createElement('img');
            }
    
            newMediaElement.id = 'lightbox-media'; 
            newMediaElement.classList.add('lightbox-media-element');
    
            if (this.lightboxMedia) {
                this.lightbox.removeChild(this.lightboxMedia);
            }
    
            newMediaElement.src = url;
            this.lightbox.appendChild(newMediaElement);
            this.lightboxMedia = newMediaElement;
        }
    
        closeLightbox() {
            this.lightbox.style.display = 'none';
            document.removeEventListener('keydown', this.handleKeydown);
        }
    }
    
        
        
        

        
       
    
    

    

        
