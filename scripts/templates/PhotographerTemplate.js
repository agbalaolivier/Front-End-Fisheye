export class PhotographerTemplate {

    constructor(photographerModel) {
        this.photographerModel=photographerModel;
    }
    
    getUserCardDOM() {
        const picture = `assets/photographers/Photographers/${this.photographerModel.portrait}`;
        
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.classList.add("photo")
        img.setAttribute("src", picture)
        
        const h2 = document.createElement( 'h2' );
       
        
       
        h2.textContent = this.photographerModel.name;
        const city = document.createElement('p');
        city.classList.add("cityCountry")
        city.textContent = `${this.photographerModel.city}, ${this.photographerModel.country}`;

        const tagline = document.createElement('p');
        tagline.textContent = this.photographerModel.tagline;

        const price = document.createElement('p');
        price.textContent = `${this.photographerModel.price} € / jour`;

        article.appendChild(img)
        article.appendChild(h2)
        
        article.appendChild(city);
        article.appendChild(tagline);
        article.appendChild(price);
        
        return (article);
        return(img)
    }
}