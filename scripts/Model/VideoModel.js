export default class VideoModel {
    constructor(video) {
        const { id, photographerId, title, videoUrl, likes, date , price} = video;

        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.video = videoUrl;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }

    showMedia() {
        let video = document.createElement('video');
        video.src = this.video;
        video.alt = this.title;
        return video;
    }
    
}


