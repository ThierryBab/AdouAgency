document.addEventListener("DOMContentLoaded", function () {
    const translateBtn = document.getElementById("translate-btn");
    if (!translateBtn) return;

    const savedLang = localStorage.getItem("language") || "en";
    translateBtn.textContent = savedLang === "en" ? "FR" : "EN"; 
    loadTranslations(savedLang);

    translateBtn.addEventListener("click", function () {
        const newLang = translateBtn.textContent === "FR" ? "fr" : "en";
        translateBtn.textContent = newLang === "en" ? "FR" : "EN";
        loadTranslations(newLang);
        localStorage.setItem("language", newLang);
    });

    function loadTranslations(lang) {
        fetch(`translate/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll("[data-key]").forEach(el => {
                    const key = el.getAttribute("data-key");
                    if (data[key]) el.textContent = data[key];
                });
            })
            .catch(error => console.error("Error loading translations:", error));
    }
});
