export default class ImageModel {
    constructor(image) {
        const { id, photographerId, title, imageUrl, likes, date , price} = image;

        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = imageUrl;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }

    showMedia() {
        let img = document.createElement('img');
        img.src = this.image;
        img.alt = this.title;
        img.width = 300; // Définissez une largeur appropriée
        img.height = 200; // Définissez une hauteur appropriée
        return img;
    }


}


