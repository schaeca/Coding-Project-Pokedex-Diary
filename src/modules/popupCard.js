const typeColors = {
    grass: "bg-green-400",
    fire: "bg-red-500",
    water: "bg-blue-400",
    bug: "bg-lime-500",
    poison: "bg-purple-400",
    psychic: "bg-pink-400",
    ghost: "bg-purple-700",
    ground: "bg-yellow-700",
    fairy: "bg-pink-200",
    fighting: "bg-orange-600",
    rock: "bg-stone-400",
    electric: "bg-yellow-300",
    ice: "bg-cyan-200",
    dragon: "bg-indigo-600",
    normal: "bg-gray-300"
};

document.addEventListener('click', async (event) => {
    const card = event.target.closest('.pokemon-card');
    if (!card) return;

    const name = card.querySelector('.poke-name').innerText.toLowerCase();

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        createPopup(data);
    } catch (e) { console.error(e); }
});

function createPopup(pokemon) {
    const overlay = document.createElement('div');

    overlay.className = "fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50";


    const badges = pokemon.types.map(t => {
        const color = typeColors[t.type.name] || "bg-gray-400";
        return `<span class="${color} text-white px-2 py-1 rounded mx-1">${t.type.name}</span>`;
    }).join('');

    overlay.innerHTML = `
        <div class="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg relative">
            <button id="close-btn" class="absolute top-2 right-2 font-bold text-xl">X</button>
            
            <div class="text-center">
                <p class="text-gray-500 text-sm">#${pokemon.id}</p>
                <h2 class="text-2xl font-bold capitalize">${pokemon.name}</h2>
                
                <img src="${pokemon.sprites.other.home.front_default}" class="w-32 h-32 mx-auto my-4">
                
                <div class="mb-4">${badges}</div>
                
                <div class="flex justify-around border-t pt-4">
                    <div><b>${pokemon.weight / 10}kg</b><br><small>Gewicht</small></div>
                    <div><b>${pokemon.height / 10}m</b><br><small>Größe</small></div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);


    overlay.querySelector('#close-btn').onclick = () => overlay.remove();
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}