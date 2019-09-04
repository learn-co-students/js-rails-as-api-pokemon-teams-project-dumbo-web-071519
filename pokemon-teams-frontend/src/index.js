const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main");

//event lis
main.addEventListener('click', buttonHandler);

//funcs
function buttonHandler(e){
  
  if(e.target.classList.contains("add-poke")){
    addPokemon(e);
  }
  else if(e.target.classList.contains("release")){
    releasePokemon(e);
  }
}

function addPokemon(e){
  const trainerID = e.target.dataset.trainerId; 
  const ul = e.target.nextElementSibling;
  if(ul.children.length === 6){
    alert("This trainer already has 6 pokemon!");
    return true;
  }
  else {
    addPokeInDB(trainerID);
  }
}

function addPokeInDB(trainerID){
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerID
    })
  })
    .then(res => res.json())
    .then(obj => {
      console.log(obj);
      getTrainers();
    })
}

function releasePokemon(e){
  e.preventDefault();
  const pokemonID = e.target.dataset.pokemonId;
  fetch(POKEMONS_URL + `/${pokemonID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept" : "application/json"
    }
  })
  .then(res => res.json())
  .then(msg => {
    console.log(msg);
    getTrainers();
  })

  
}

function getTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(obj => {
      main.innerHTML = "";
      obj.data.forEach(putTrainerInDom)
    })
}

function putTrainerInDom(trainerObj){
    main.innerHTML += `<div class="card" data-id="${trainerObj.id}">
        <p>${trainerObj.attributes.name}</p>
        <button class="add-poke" data-trainer-id="${trainerObj.id}">Add Pokemon</button>
        <ul>
          ${generateLis(trainerObj.attributes.pokemon)}
        </ul>
      </div>`
}

function generateLis(pokes){
  liString = "";
  pokes.forEach(function(poke){
    liString += `<li>${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Release</button></li>` 
  })
  return liString;
}
getTrainers();
