//verification du modal
export function initializeFormValidation(contactForm){
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêcher la soumission du formulaire

        const firstName = this.contactForm.querySelector('[name="first_name"]').value;
        const lastName = this.contactForm.querySelector('[name="last_name"]').value;
        const email = this.contactForm.querySelector('[name="email"]').value;
        const message = this.contactForm.querySelector('[name="message"]').value;

        if (!this.isValidInput(firstName, 2)) {
            console.error('Le prenom doit contenir au moins 2 caractères.');
            alert('Le prenom doit contenir au moins 2 caractères.');
            return;
        }
        if (!this.isValidInput(lastName, 2)) {
            console.error('Le nom doit contenirt au moins 2 caractères.');
            alert('Le nom doit contenir au moins 2 caractères.');
            return;
        }
        if (!this.isValidEmail(email)) {
            console.error('L\'email n\'est pas valide.');
            alert('L\'email n\'est pas valide.');
            return;
        }
        if (!this.isValidInput(message, 10)) {
            console.error('Le message doit contenir au moins 10 caractères.');
            alert('Le message doit contenir au moins 10 caractères.');
            return;
        }
        // Validation des champs du formulaire
        if (this.isValidInput(firstName, 2) && this.isValidInput(lastName, 2) && this.isValidEmail(email) && this.isValidInput(message, 10)) {
            // Afficher le message de succès
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';

            // Réinitialiser le formulaire après un court délai
            setTimeout(() => {
                this.contactForm.reset();
                successMessage.style.display = 'none';
            }, 3000); // Afficher le message de succès pendant 3 secondes
        }
    });

}

function isValidInput(input, minLength) {
    return input.length >= minLength;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}