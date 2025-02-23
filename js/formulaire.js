document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        let name = document.getElementById("name")?.value.trim();
        let email = document.getElementById("email")?.value.trim();
        let phone = document.getElementById("phone")?.value.trim();
        let entreprise = document.getElementById("entreprise")?.value.trim();
        let message = document.getElementById("message")?.value.trim();
        let budget = document.querySelector('input[name="budget"]:checked')?.value;

        let errorMessage = "Veuillez remplir tous les champs requis :";
        let hasError = false;

        // Email regex for validation
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation checks
        if (!name) { errorMessage += "\n- Nom complet"; hasError = true; }
        if (!email) { 
            errorMessage += "\n- Courriel"; 
            hasError = true; 
        } else if (!emailRegex.test(email)) {
            errorMessage += "\n- Format du courriel invalide";
            hasError = true;
        }
        if (!phone) { errorMessage += "\n- Téléphone"; hasError = true; }
        if (!entreprise) { errorMessage += "\n- Nom de l'entreprise"; hasError = true; }
        if (!message) { errorMessage += "\n- Description du projet"; hasError = true; }
        if (!budget) { errorMessage += "\n- Budget"; hasError = true; }

        if (hasError) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: errorMessage
            });
            return;
        }

        // Convert form data to JSON
        let formData = JSON.stringify({
            name,
            email,
            phone,
            entreprise,
            message,
            budget
        });

        try {
            let response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Formulaire envoyé!",
                    text: "Nous avons bien reçu votre message.",
                    showConfirmButton: false,
                    timer: 2500
                });

                setTimeout(() => {
                    form.reset();
                }, 2000);
            } else {
                throw new Error("Erreur lors de l'envoi du formulaire.");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur s'est produite. Veuillez réessayer plus tard."
            });
            console.error("Form submission error:", error);
        }
    });
});
