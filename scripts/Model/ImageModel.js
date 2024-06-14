export default class ImageModel {
    constructor(data, photographerModel) {
        const { id, photographerId, title, image, likes, date , price} = data;

        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.likes = likes;
        this.date = date;
        this.price = price;

        this.photographerModel=photographerModel;
    }

    showMedia() {
        let img = document.createElement('img');
        
        console.log(this.photographerModel);
        img.src = './assets/photographers/' + this.photographerModel.getFirstName() + '/' + this.image;
        img.alt = this.title;
        img.tabIndex = 0;
        
        
        
        return img;
    }


}


