import MediaTemplate from "../templates/MediaTemplate.js";

export default class OptionTri {
    constructor(photographerData, mediasModel, parent) {
        this.photographerData = photographerData;
        this.mediasModel = mediasModel;
        this.parent = parent;
        this.render();
    }

    render() {
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');

        const sortOptionsContainer = document.createElement('div');
        sortOptionsContainer.classList.add('option-container');
        sortOptionsContainer.textContent = 'Trier par : ';
        sortOptionsContainer.addEventListener('click', () => {
            this.toggleVisibility(sortOptionsContainer);
            this.toggleArrowIcon(mainSortButton);
        });

        // Création des boutons de tri
        const sortByPopularityButton = this.createSortButton('Popularité', 'popularity');
        const sortByDateButton = this.createSortButton('Date', 'date');
        const sortByTitleButton = this.createSortButton('Titre', 'title');

        // Bouton principal avec icône de flèche
        const mainSortButton = this.createSortButton('Popularité', 'popularity');
        mainSortButton.innerHTML = 'Popularité <i class="fas fa-chevron-down"></i>'; // Texte par défaut avec icône
        mainSortButton.classList.add('sort-by-default', 'active-sort');

        

        

        // Initialiser les boutons de tri comme cachés
        sortByPopularityButton.style.display = 'none';
        sortByDateButton.style.display = 'none';
        sortByTitleButton.style.display = 'none';

        sortOptionsContainer.appendChild(mainSortButton);
        sortOptionsContainer.appendChild(sortByPopularityButton);
        sortOptionsContainer.appendChild(sortByDateButton);
        sortOptionsContainer.appendChild(sortByTitleButton);

        optionsContainer.appendChild(sortOptionsContainer);
        this.parent.parentNode.insertBefore(optionsContainer, this.parent);

        // Ajouter un élément pour afficher le nombre total de likes et le prix par jour
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');

        this.totalLikesElement = document.createElement('div');
        this.totalLikesElement.classList.add('total-likes');
        infoContainer.appendChild(this.totalLikesElement);

        this.priceElement = document.createElement('div');
        this.priceElement.classList.add('price');
        this.priceElement.textContent = `${this.photographerData.price}€ / jour`;
        infoContainer.appendChild(this.priceElement);

       optionsContainer.appendChild(infoContainer);

        


 

        // Initialiser les valeurs
        this.updateTotalLikes();
    }

    createSortButton(text, criteria) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add(`sort-by-${criteria}`);
        button.addEventListener('click', () => {
            this.sortMedia(criteria);
            this.updateTotalLikes();
            // Mettre à jour le texte du bouton principal pour refléter le critère actif
            document.querySelector('.active-sort').innerHTML = `${text} <i class="fas fa-chevron-up"></i>`;
            this.toggleVisibility(); // Masquer les options après sélection
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
        this.totalLikesElement.innerHTML = ` ${totalLikes}<i class="fas fa-heart"></i> `;
    }

    toggleVisibility(container) {
        // Toggle la visibilité des boutons de tri dans le conteneur
        const buttons = container.querySelectorAll('.option-container button');
        buttons.forEach(button => {
            button.style.display = button.style.display === 'none' ? 'block' : 'none';
        });
    }
    toggleArrowIcon(button) {
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
        
    }
}