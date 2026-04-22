document.addEventListener("input", (e) => {
    if (e.target.placeholder === "Search by Name, Number or Type...") {
        const searchTerm = e.target.value.toLowerCase().trim();

        const container = document.getElementById("pokemon-container");
        const cards = container.getElementsByClassName("pokemon-card");

        Array.from(cards).forEach((card) => {
            const name = card.querySelector(".poke-name").textContent.toLowerCase() || "";
            const id = card.querySelector(".poke-id").textContent.toLowerCase() || "";
            const type = card.querySelector(".poke-type").textContent.toLowerCase() || "";


            if (name.includes(searchTerm) || id.includes(searchTerm) || type.includes(searchTerm)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }
});