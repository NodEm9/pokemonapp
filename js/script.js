//IIFE for pokemonRepository
let pokemonRepository = (function () {
  //Pokemom list array
  let pokemonList = []
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=950";

  // Function to add new pokemon to the list
  function add(pokemon) {
    if (typeof pokemon !== "object" || !("name" in pokemon) || !("detailsUrl" in pokemon)) {
      console.log("pokemon is not correct");
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
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //Function to show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    })
    return pokemon;
  }

  //Function to show loading message
  function showLoadingMessage() {
    let loading = document.querySelector(".loading");
    loading.innerText = "Loading data...";
    loading.classList.add("is-visible");
  }

  //Function to hide loading message
  function hideLoadingMessage() {
    let loading = document.querySelector(".loading");
    loading.innerText = "";
    loading.classList.remove("is-visible");
  }

  //Function to load the list of pokemon from the API
  async function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  //Function to load details of each pokemon
  async function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(function (pokemon) {
        return pokemon.type.name;
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  return {
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    getAll: getAll,
    addListItem: addListItem,
  };

})();

//Get all pokemon from the list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
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

