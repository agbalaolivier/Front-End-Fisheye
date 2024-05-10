export default class Lightbox {
    constructor() {
        this.lightbox = document.createElement('div');

        if (!this.lightbox) {
            // Crée la lightbox si elle n'existe pas
            this.lightbox = document.createElement('div');
            this.lightbox.id = 'lightbox';
            document.body.appendChild(this.lightbox);
        }
        
    console.log("this.lightbox");

        

        this.lightboxMedia = document.createElement('img');
        console.log(this.lightboxMedia)
        this.lightboxMedia.id = 'lightbox-media';
        this.lightbox.appendChild(this.lightboxMedia);

        this.closeButton = document.createElement('button');
        this.closeButton.textContent = 'Close';
        this.closeButton.classList.add('close-button');
        this.lightbox.appendChild(this.closeButton);

        this.prevButton = document.createElement('button');
        this.prevButton.textContent = 'Prev';
        this.prevButton.id = 'prev-button';
        this.lightbox.appendChild(this.prevButton);

        this.nextButton = document.createElement('button');
        this.nextButton.textContent = 'Next';
        this.nextButton.id = 'next-button';
        this.lightbox.appendChild(this.nextButton);

        this.currentIndex = 0;

        this.closeButton.addEventListener('click', () => {
            this.closeLightbox();
        });
    }

    openLightbox(mediaURLs, startIndex) {
        this.currentIndex = startIndex;
        this.lightboxMedia.src = mediaURLs[startIndex];
        this.lightbox.style.display = 'block';

        this.prevButton.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + mediaURLs.length) % mediaURLs.length;
            this.lightboxMedia.src = mediaURLs[this.currentIndex];
        });

        this.nextButton.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % mediaURLs.length;
            this.lightboxMedia.src = mediaURLs[this.currentIndex];
        });
    }

    closeLightbox() {
        this.lightbox.style.display = 'none';
    }
}
