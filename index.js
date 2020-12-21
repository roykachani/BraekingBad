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
 
 // funcion filtrar personaje
 const shearchCharacter = () =>{
     let input = document.getElementById("input").value.toLowerCase()
     console.log(input)
     characters.filter(character => input == character.name.toLowerCase() ? showCharacter(character) : null)
     characters.filter(character => input == character.nickname.toLowerCase() ? showCharacter(character) : null)
     document.getElementById("input").value =""
 }

//funcion crear nodo cards
const createtNode = ({img, name, nickname, occupation, status,char_id}) => {
    const node = `
    <div id="${char_id}" class="col-md-4 col-12">
        <div class="card mt-5 ml-3 main-card">
            <img src="${img}" alt="imagen de ${name}"/>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Apodo: ${nickname}</p>
                <p class="card-text">Ocupacion: ${occupation[0] === "Unknown" ? "/" : occupation[0]}</p>
                <p class="card-text">${status == "Alive" ? "Vivo" : "R.I.P."}</p>
                <div class="d-flex justify-content-between">
                <button onclick="delCharacter(${char_id})" class="btn btn-danger btn-block">Borar</button>
                <button onclick="selectCharacter(${char_id})" class="btn btn-success btn-block">Ver</button>
                </div>
            </div>
        </div>
    </div>
    `
    document.getElementById("apiR").insertAdjacentHTML("beforeend", node)
    console.log(node)
}

//funcion borrar card
const delCharacter = (char_id) => {
   document.getElementById(char_id).remove()
   
}

//funcion seleccionar personaje
const selectCharacter = (id) => {
    characters.filter(character => id == character.char_id ? showCharacter(character) : null)

}

//funcion mostrar personaje unico buscado y borra listado anterior de cards
const showCharacter = ({name,nickname,occupation,status,img}) =>{
    let oldChild = document.getElementById("apiR")
    while (oldChild.firstChild) {
        oldChild.removeChild(oldChild.firstChild);
      }
    const node = `
    <div class="container-fluid">
        <div class="row justify-content-center mt-3 mb-3 character">
            <div class="col-md-7">
                <img   src="${img}" alt="imagen de ${name}"/>
            </div>
            <div class="col-md-4">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Apodo: ${nickname}</p>
                <p class="card-text">Ocupacion: ${occupation[0] === "Unknown" ? "/" : occupation[0]}</p>
                <p class="card-text">${status == "Alive" ? "Vivo" : "R.I.P."}</p>
                <p class="card-text">
            </div>
         </div>
    </div>
    `
    document.getElementById("apiR").insertAdjacentHTML("beforeend", node)
    console.log(node)
}

const start = async () =>{
    const newNode = document.getElementById("apiR")
    characters = await fetchCharacters();
    mapCharacters(characters);
    console.log(characters)
    document.getElementById("find").addEventListener("click", shearchCharacter);
    
}

window.onload = start();
