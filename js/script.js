//IIFE for pokemonRepository
let pokemonRepository = (function () {
  //Pokemom list array
let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
  { name: "Venusaur", height: 1.4, types: ["grass", "poison"]},
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Charmeleon", height: 1.1, types: ["fire"] },
  { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
  { name: "Squirtle", height: 0.5, types: ["water"] },
  { name: "Wartortle", height: 1, types: ["water"] },
  { name: "Blastoise", height: 1.5, types: ["water"] }
  ];
  
  //Function to add new pokemon to the list
  function add(pokemon) {
    if (typeof pokemon !== "object") {
      console.log("You need to add a Pokemon object.");
      return;
    }
  
    if (!pokemon.name || !pokemon.height || !pokemon.types || Object.keys(pokemon).length !== 3) {
      console.log("You need to add a Pokemon object with name, height, and types.");
      return;
    }

    pokemonList.push(pokemon);
  }

  //Function to get all pokemon from the list
  function getAll() {
    return pokemonList;
  } 

    //Function to add list item to the DOM
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      listPokemon.classList.add("pokemon-list__item");
      listPokemon.style.listStyle = "none";
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
  }
  
   //Function to show details of the pokemon
   //Function to show details of each Pokémon
   function showDetails(pokemon) {
    console.log(pokemon);
    let pokemonDetails = document.querySelector(".pokemon-details");
    pokemonDetails.innerHTML = pokemon.name + " (height: " + pokemon.height + ")";
    return pokemon;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };

})();

//Add new pokemon to the list
pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] });

//Get all pokemon from the list
pokemonRepository.getAll().forEach(function (pokemon) { 
  pokemonRepository.addListItem(pokemon);
});

//Search for a pokemon
pokemonRepository.getAll().filter(function () {
  document.querySelector(".searchForm").addEventListener("input", function (event) {
    let pokemonList = document.querySelectorAll(".button-class");
    let searchInput = event.target.value.toLowerCase();
    pokemonList.forEach(function (pokemon) {
      if (pokemon.innerText.toLowerCase().indexOf(searchInput) > -1) {
        pokemon.style.display = "";
      } else {
        pokemon.style.display = "none";
      }
    });
  });
});

