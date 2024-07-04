//verification du modal
export function initializeFormValidation(contactForm){
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêcher la soumission du formulaire

        const fields = {
            firstName: contactForm.querySelector('[name="first_name"]').value,
            lastName: contactForm.querySelector('[name="last_name"]').value,
            email: contactForm.querySelector('[name="email"]').value,
            message: contactForm.querySelector('[name="message"]').value
        };

        const errors = {
            firstName: 'Le prénom doit contenir au moins 2 caractères.',
            lastName: 'Le nom doit contenir au moins 2 caractères.',
            email: 'L\'email n\'est pas valide.',
            message: 'Le message doit contenir au moins 10 caractères.'
        };

        for (let key in fields) {
            if (key === 'email') {
                if (!isValidEmail(fields[key])) {
                    console.error(errors[key]);
                    alert(errors[key]);
                    return;
                }
            } else {
                let minLength = key === 'message' ? 10 : 2;
                if (!isValidInput(fields[key], minLength)) {
                    console.error(errors[key]);
                    alert(errors[key]);
                    return;
                }
            }
        }

        // Afficher le message de succès
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';

        // Réinitialiser le formulaire après un court délai
        setTimeout(() => {
            contactForm.reset();
            successMessage.style.display = 'none';
        }, 3000); // Afficher le message de succès pendant 3 secondes
    });
}

function isValidInput(input, minLength) {
    return input.length >= minLength;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}