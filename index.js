const URL = "https://breakingbadapi.com/api/characters"
let characters = [];


//funcion encargada de traer los personajes de URL
const fetchCharacters = async (url = URL) =>{
 console.log("peticion..")
 const response = await fetch (url);
 console.log(response)
 characters = await response.json();
 //console.log(characters)
 return characters
}

//funcion que itera cada personaje
 const mapCharacters = (characters) => {
    characters.map(character =>  createtNode(character))
 }


//funcion crear nodo
const createtNode = ({img, name, nickname, occupation, status}) => {
    const node = `
    <div class="col-md-3 col-12">
        <div class="card mt-5 ml-3">
            <img src="${img}" alt=""/>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${nickname}</p>
                <p class="card-text">${occupation}</p>
                <p class="card-text">${status == "Alive" ? "Vivo" : "R.I.P."}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById("apiR").insertAdjacentHTML("beforeend", node)
    console.log(node)
}


const start = async () =>{
    const newNode = document.getElementById("apiR")
    // document.getElementById("find").addEventListener("click", shearchCharactetr);
    characters = await fetchCharacters();
    mapCharacters(characters);
    console.log(characters)
    
}

window.onload = start();
