export default class MediaTemplate {
    constructor(mediaModels) {
        this.mediaModels = mediaModels;
    }

    showMedia() {

        let mediaContainer=document.getElementsByClassName('media-container');

        if (mediaContainer.length==0) {
            console.log('non present')
            console.log(mediaContainer)
            mediaContainer = document.createElement('div');
            mediaContainer.classList.add('media-container');
        } else {
            mediaContainer=mediaContainer[0];
        }

        mediaContainer.innerHTML = "";


        this.mediaModels.forEach(media => {
            const mediaWrapper = document.createElement('div');
            mediaWrapper.classList.add('media-wrapper');

            const mediaElement = media.showMedia(); // Récupérer l'élément DOM du média

            // Créer un conteneur pour le titre et le bouton "Like"
            const titleLikeContainer = document.createElement('div');
            titleLikeContainer.classList.add('title-like-container');

            const mediaName = document.createElement('p'); // Créer un élément pour le nom du média
            mediaName.classList.add('media-title')
            mediaName.textContent = media.title; // Définir le texte du nom du média


            // Créer le bouton "Like" représenté par une icône de cœur
            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            const heartIcon = document.createElement('i');
            heartIcon.classList.add("fas", "fa-heart", "red-heart");
            likeButton.appendChild(heartIcon);

            // Créer l'élément pour afficher le nombre de likes
            const likeCount = document.createElement('span');
            likeCount.classList.add('like-count');
            likeCount.textContent = media.likes; // Vous devriez récupérer le nombre de likes du modèle de média ici

            // Ajouter des événements pour incrémenter le nombre de likes lorsque le bouton est cliqué
            likeButton.addEventListener('click', () => {
                // Mettre à jour le nombre de likes dans le modèle de média
                media.likes++;
                // Mettre à jour le contenu du span pour refléter le nouveau nombre de likes
                likeCount.textContent = media.likes;
            });

            // Ajouter le nom du média et le bouton "Like" dans le conteneur
            titleLikeContainer.appendChild(mediaName);
            titleLikeContainer.appendChild(likeCount)
            titleLikeContainer.appendChild(likeButton);


            mediaWrapper.appendChild(mediaElement); // Ajouter l'élément média dans le conteneur
            mediaWrapper.appendChild(titleLikeContainer);
            mediaContainer.appendChild(mediaWrapper); // Ajouter le conteneur au conteneur principal
        });


        let photographerContainerElement = document.getElementById('main');



        // Ajouter les médias du photographe dans la section principale
        photographerContainerElement.appendChild(mediaContainer);
    }


}
