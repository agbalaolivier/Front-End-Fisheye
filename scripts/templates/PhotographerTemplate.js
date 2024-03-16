export class PhotographerTemplate {
    constructor(photographerModel) {
        this.photographerModel = photographerModel;
    }
    
    getUserCardDOM() {
        const picture = `assets/photographers/Photographers/${this.photographerModel.portrait}`;
        
        const article = document.createElement('article');
        
        const img = document.createElement('img');
        img.classList.add("photo");
        img.setAttribute("src", picture);
        img.setAttribute("alt", this.photographerModel.name); 
        
        const h2 = document.createElement('h2');
        h2.textContent = this.photographerModel.name;
        
        const cityCountry = document.createElement('span');
        cityCountry.classList.add("cityCountry");
        cityCountry.textContent = `${this.photographerModel.city}, ${this.photographerModel.country}`;
        
        const tagline = document.createElement('span'); 
        tagline.textContent = this.photographerModel.tagline;
        
        const price = document.createElement('span');
        price.textContent = `${this.photographerModel.price} € / jour`;
        
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityCountry);
        article.appendChild(tagline);
        article.appendChild(price);
        
        return article;
    }
}