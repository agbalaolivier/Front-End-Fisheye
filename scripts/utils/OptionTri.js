import MediaTemplate from "../templates/MediaTemplate.js";

export default class OptionTri {
    constructor(photographerData, mediasModel, parent) {
        this.photographerData = photographerData;
        this.mediasModel = mediasModel;
        this.parent = parent;
        this.render();
        this.toggleArrowIcon(sortByPopularityButton);
    }

    render() {
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');

        const sortOptionsContainer = document.createElement('div');
        sortOptionsContainer.classList.add('option-container');
        sortOptionsContainer.textContent = 'Trier par : ';
        sortOptionsContainer.addEventListener('click', () => {
            this.toggleVisibility(sortOptionsContainer);
        });
        

        const sortByPopularityButton = this.createSortButton('Popularité', 'popularity');
        sortByPopularityButton.innerHTML = 'Popularité <i class="fas fa-chevron-down"></i>'; 
        const sortByDateButton = this.createSortButton('Date', 'date');
        const sortByTitleButton = this.createSortButton('Titre', 'title');

        sortByPopularityButton.style.display = 'none';
        sortByDateButton.style.display = 'none';
        sortByTitleButton.style.display = 'none';

        sortOptionsContainer.appendChild(sortByPopularityButton);
        sortOptionsContainer.appendChild(sortByDateButton);
        sortOptionsContainer.appendChild(sortByTitleButton);

        optionsContainer.appendChild(sortOptionsContainer);
        this.parent.parentNode.insertBefore(optionsContainer, this.parent);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');

        this.totalLikesElement = document.createElement('div');
        this.totalLikesElement.classList.add('total-likes');
        this.updateTotalLikes();
        infoContainer.appendChild(this.totalLikesElement);

        this.priceElement = document.createElement('div');
        this.priceElement.classList.add('price');
        this.priceElement.textContent = `${this.photographerData.price}€ / jour`;
        infoContainer.appendChild(this.priceElement);

        optionsContainer.appendChild(infoContainer);
    }
    

        


    createSortButton(text, criteria) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add(`sort-by-${criteria}`);
        button.addEventListener('click', () => {
            this.sortMedia(criteria);
            this.updateTotalLikes();
        });
        return button;
    }

    sortMedia(criteria) {
        if (!this.mediasModel || this.mediasModel.length === 0) {
            console.error('No media data provided for sorting.');
            return;
        }

        if (criteria === 'title') {
            this.mediasModel.sort((a, b) => a.title.localeCompare(b.title));
        } else if (criteria === 'popularity') {
            this.mediasModel.sort((a, b) => b.likes - a.likes);
        } else if (criteria === 'date') {
            this.mediasModel.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        const mediaTemplate = new MediaTemplate(this.mediasModel);
        mediaTemplate.showMedia();
    }

    updateTotalLikes() {
        if (!this.totalLikesElement) return;
        const totalLikes = this.mediasModel.reduce((sum, media) => sum + media.likes, 0);
        this.totalLikesElement.textContent = `Total Likes: ${totalLikes}`;
    }

    toggleVisibility(container) {
        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.display = button.style.display === 'none' ? 'block' : 'none';
        });
    }
}