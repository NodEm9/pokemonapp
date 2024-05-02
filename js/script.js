// 

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
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    } else {
      console.log("You need to add a Pokemon object");
    }
  }

  //Function to get all pokemon from the list
  function getAll() {
    return pokemonList;
  }

  //Function to show details of the pokemon
   //Function to show details of each Pokémon
  function showDetails(pokemon) {
    console.log(pokemon);
    let pokemonDetails = document.querySelector(".pokemon-details");
    pokemonDetails.innerHTML = pokemon.name + " (height: " + pokemon.height + ")";
    return pokemon;
  };

    //Function to add list item to the DOM
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
    }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();

// //Create h1 element with text "Pokémon List" 
// document.write("<h1>Pokémon List</h1>");

/* Create unordered list element and use  forEach loop 
* to display Pokémon name and height in list items.
* Add conditional to display message if height is greater than 1.5
*/
pokemonRepository.getAll().forEach(function (pokemon) { 
  pokemonRepository.addListItem(pokemon);
});


