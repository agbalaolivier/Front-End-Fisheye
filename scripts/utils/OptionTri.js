import MediaTemplate from "../templates/MediaTemplate.js";

export default class OptionTri {
    constructor(photographerData, mediasModel, parent) {
        this.mediasModel = mediasModel;
        this.photographerData = photographerData;
        this.parent = parent;
        this.render();
    }

    render() {


        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        optionsContainer.style.display='none';
        

        const sortOptionsContainer = document.createElement('div');
        sortOptionsContainer.classList.add('option-container');
        console.log(sortOptionsContainer);
        sortOptionsContainer.textContent = 'Trier par';
        sortOptionsContainer.addEventListener('click', () => {
        optionsContainer.style.display = optionsContainer.style.display === 'none' ? 'block' : 'none';
        });

        const sortByPopularityButton = document.createElement('button');
        sortByPopularityButton.classList.add('sort-by-popularity');
        sortByPopularityButton.textContent = 'Popularité';
        sortByPopularityButton.addEventListener('click', () => this.sortMedia('popularity'));

        const sortByDateButton = document.createElement('button');
        sortByDateButton.classList.add('sort-by-date');
        sortByDateButton.textContent = 'Date';
        sortByDateButton.addEventListener('click', () => this.sortMedia('date'));

        const sortByTitleButton = document.createElement('button');
        sortByTitleButton.classList.add('sort-by-title');
        sortByTitleButton.textContent = 'Titre';
        sortByTitleButton.addEventListener('click', () => this.sortMedia('title'));

        optionsContainer.appendChild(sortByPopularityButton);
        optionsContainer.appendChild(sortByDateButton);
        optionsContainer.appendChild(sortByTitleButton);

        sortOptionsContainer.appendChild(optionsContainer);

        (this.parent.parentNode).insertBefore(sortOptionsContainer,this.parent);
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
    

    }