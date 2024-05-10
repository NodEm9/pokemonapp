//IIFE for pokemonRepository
let pokemonRepository = (function () {
  //Pokemom list array
  let pokemonList = []
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    let pokemonList = document.querySelector(".list-group");
    //Create list item
    let listPokemon = document.createElement("li");
    listPokemon.classList.add("list-group-item");
    listPokemon.style.listStyle = "none";

    //Create button
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal");
    button.classList.add("btn", "btn-primary", "btn-md", "btn-block");

    //Append button to list item
    listPokemon.appendChild(button);
    //Append list item to pokemon list
    pokemonList.appendChild(listPokemon);
    //Add event listener to button
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //Function to show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      let modalBody = document.querySelector(".modal-body");
      let modalTitle = document.querySelector(".modal-title");
      // empty modal content
      modalBody.innerHTML = "";
      modalTitle.innerHTML = "";

      // add pokemon details to modal
      let pokemonName = document.createElement("h1");
      pokemonName.innerText = pokemon.name;

      // create image element
      let pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.classList.add("modal-image");
      let pokemonHeight = document.createElement("p");
      pokemonHeight.innerText = "Height: " + pokemon.height;
      let pokemonType = document.createElement("p");
      pokemonType.innerText = "Types: " + pokemon.types.join(", ");
      let pokemonWeight = document.createElement("p");
      pokemonWeight.innerText = "Weight: " + pokemon.weight;
      let pokemonAbilities = document.createElement("p");
      pokemonAbilities.innerText = "Abilities: " + pokemon.abilities.join(", ");
      let pokemonBack = document.createElement("img");
      pokemonBack.src = pokemon.back;
      pokemonBack.classList.add("modal-image");

      // append elements to modal
      modalTitle.appendChild(pokemonName);
      modalBody.appendChild(pokemonImage);
      modalBody.appendChild(pokemonBack);
      modalBody.appendChild(pokemonHeight);
      modalBody.appendChild(pokemonType);
      modalBody.appendChild(pokemonWeight);
      modalBody.appendChild(pokemonAbilities);

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
      item.weight = details.weight;
      item.abilities = details.abilities.map(function (pokemon) {
        return pokemon.ability.name;
      });
      item.back = details.sprites.back_default;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  return {
    add: add,
    showDetails: showDetails,
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
})

//Search for a pokemon
document.querySelector(".searchForm").addEventListener("input", function (event) {
  let pokemonList = document.querySelectorAll(".btn");
  let searchInput = event.target.value.toLowerCase();
  pokemonList.forEach(function (pokemon) {
    if (pokemon.innerText.toLowerCase().indexOf(searchInput) > -1) {
      pokemon.style.display = "";
    } else {
      pokemon.style.display = "none";
    }
  });
});

