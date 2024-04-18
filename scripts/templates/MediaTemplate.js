export default class MediaTemplate {
    constructor(mediaModels) {
        this.mediaModels = mediaModels;
    }

    showMedia() {
        let div=document.createElement('div');
        div.classList.add('media-container');
        this.mediaModels.forEach(media => {
            div.appendChild(media.showMedia());
        });
        return div;
    }


}

