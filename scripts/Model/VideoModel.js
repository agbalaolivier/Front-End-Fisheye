export default class VideoModel {
    constructor(data, photographerModel) {
        const { id, photographerId, title, video, likes, date, price } = data;

        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.video = video;
        this.likes = likes;
        this.date = date;
        this.price = price;

        this.photographerModel = photographerModel;
    }

    showMedia() {
        let video = document.createElement('video');
        console.log(this.photographerModel)
        video.src = './assets/photographers/' + this.photographerModel.getFirstName() + '/' + this.video;
        video.alt = this.title;
        
        return video;
    }

}


