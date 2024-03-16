import { PhotographerModel } from '/scripts/Model/PhotographerModel.js';
import { PhotographerTemplate } from '/scripts/templates/PhotographerTemplate.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Charger le fichier JSON depuis le serveur
        const response = await fetch('./data/photographers.json');

        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error('Failed to fetch photographers data');
        }

        // Convertir la réponse JSON en objet JavaScript
        const photographersData = await response.json();

        // Utiliser les données récupérées
        console.log(photographersData)

        // Parcourir les données des photographes
        photographersData.photographers.forEach(photographerData => {
            // Créer une instance de PhotographerModel avec les données du photographe
            const photographer = new PhotographerModel(photographerData);

            // Créer une instance de PhotographerTemplate avec l'instance de PhotographerModel
            const photographerTemplate = new PhotographerTemplate(photographer);

            // Obtenir le DOM correspondant à la carte du photographe
            const photographerCardDOM = photographerTemplate.getUserCardDOM();

            // Ajouter le DOM de la carte du photographe à la page HTML
            const photographerContainer = document.getElementById('photographer-container');
            const sectionPhotographe = document.createElement('div')
            sectionPhotographe.classList.add('.photographe_detail')

            photographerContainer.appendChild(photographerCardDOM);
        });
    } catch (error) {
        console.error('Error fetching photographers data:', error);
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Charger le fichier JSON depuis le serveur
        const response = await fetch('./data/photographers.json');
        
        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error('Failed to fetch photographers data');
        }
        
        // Convertir la réponse JSON en objet JavaScript
        const photographersData = await response.json();
        
        // Obtenir le conteneur principal
        const mainContainer = document.querySelector('main');
        
        // Utiliser les données récupérées pour créer les conteneurs des photographes
        photographersData.photographers.forEach(photographerData => {
            // Créer l'élément div pour le photographe
            const photographerContainer = document.createElement('div');
            photographerContainer.id = `photographer-${photographerData.id}`;
            photographerContainer.classList.add('photographer-container');
            
            // Ajouter le conteneur du photographe au conteneur principal
            mainContainer.appendChild(photographerContainer);
        });
        
        // Maintenant que les conteneurs sont créés, vous pouvez utiliser les données pour remplir chaque conteneur avec les cartes des photographes
        // Vous pouvez utiliser une approche similaire à ce que j'ai montré dans ma réponse précédente pour remplir chaque conteneur avec les cartes des photographes
    } catch (error) {
        console.error('Error fetching photographers data:', error);
    }
});