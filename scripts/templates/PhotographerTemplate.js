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
    renderForPagePhotographer(){

        const headerHTML = document.querySelector('.photograph-header');
        if (!headerHTML) {
            headerHTML = document.createElement('header');
            headerHTML.classList.add('photograph-header');
            document.body.appendChild(headerHTML);
        }

        
        

        const picture = `assets/photographers/Photographers/${this.photographerModel.portrait}`;
        
        const article = document.createElement('article');
        
        const img = document.createElement('img');
        img.classList.add("photo");
        img.setAttribute("src", picture);
        img.setAttribute("alt", this.photographerModel.name); 
        
        const h1 = document.createElement('h1');
        h1.textContent = this.photographerModel.name;

        const textDetail = document.createElement('div');
        textDetail.classList.add('textDetail')

        const cityCountry = document.createElement('span');
        cityCountry.classList.add("cityCountry");
        cityCountry.textContent = `${this.photographerModel.city}, ${this.photographerModel.country}`;

        
        const tagline = document.createElement('span');
        tagline.classList.add("tagline") 
        tagline.textContent = this.photographerModel.tagline;
        
        article.appendChild(img);
        article.appendChild(h1  );
        article.appendChild(textDetail);
        textDetail.appendChild(cityCountry)
        textDetail.appendChild(tagline)
        
        article.classList.add('photographer-image');

        headerHTML.appendChild(article);

        const contactHeader = document.querySelector('.modal header h2');
        contactHeader.innerHTML = `Contactez-moi <div class="photographer-name">${this.photographerModel.name}</div>`;
        
    }
    
    
    
    getDetailsDOM() {
        const picture = `assets/photographers/Photographers/${this.photographerModel.portrait}`;
        // Créer le conteneur pour les détails
        const detailsContainer = document.createElement('div');
    
        // Créer la balise img pour afficher la photo du photographe
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', this.photographerModel.name);
        img.setAttribute('tabIndex')

        const video = document.createElement('video');
        video.setAttribute('src', picture);
        video.setAttribute('alt', this.photographerModel.name);
        video.setAttribute('tabIndex')
        
        detailsContainer.appendChild(img);
        detailsContainer.appendChild(video);
    
        // Créer le header avec le nom et la localisation du photographe
        const header = document.createElement('header');
        const name = document.createElement('h1');
        name.textContent = this.photographerModel.name;
        const location = document.createElement('span' );
        
        location.textContent = `${this.photographerModel.city}, ${this.photographerModel.country}`;
        header.appendChild(name);
        header.appendChild(location);
        detailsContainer.appendChild(header);
    
        // Ajouter la description
        const description = document.createElement('p');
        description.textContent = this.photographerModel.description;
        detailsContainer.appendChild(description);
    
        // Retourner le conteneur des détails
        return detailsContainer;
    }
    

    }
    