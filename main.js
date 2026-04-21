const container = document.getElementById("pokemon-container")
const path = "https://pokeapi.co/api/v2/pokemon"

async function loadPokemon(){
    let count = 1
    while (count<151){
        try {
            const res = await fetch(`${path}/${count}`)
            const data = await res.json()
        
                let newHTML = `
                <div class="pokemon-card rounded-md bg-gray-100 flex flex-col justify-center items-center shadow-md pt-2">
                    <p id = "poke-id" class = "bg-black text-white p-1 rounded-2xl text-xs">#00${data.id}</p>
                    <img class = "w-full h-full object-contain pb-8" src=${data.sprites.other.home.front_default}>
                    <div class = "p-2 bg-white min-w-full flex flex-col justify-center items-center rounded-md">
                        <p id="poke-name" class="font-bold text-lg">${data.name}</p>
                        <p id = "poke-type" class="">${data.types[0].type.name}</p>
                    </div>                                
                `
                container.innerHTML += newHTML
                console.log(data.types[0].type.name);
                
                // const type = document.getElementById("poke-type")
                // if(data.types[0].type.name=="grass"){
                //     type.classList.add("bg-green-300")             
                // }else if(data.types[0].type.name=="fire"){
                //     type.classList.add("bg-red-300")
                // }else{
                //     type.classList.add("bg-blue-300")
                // }
                count++
            
        } catch(err) {console.error(err)}
    }
}

loadPokemon()
