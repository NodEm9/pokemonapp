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
    let pokemonList = document.querySelector(".pokemon-list");
    //Create list item
    let listPokemon = document.createElement("li");
    listPokemon.classList.add("pokemon-list__item");
    listPokemon.style.listStyle = "none";
    //Create button
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    //Add button to list item
    listPokemon.appendChild(button);
    //Add list item to pokemon list
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
      showModal(pokemon);
    })
    return pokemon;
  }

  //Function to hide modal
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    //Remove is-visible class to hide the modal
    modalContainer.classList.remove("is-visible");
  }


  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //Function to show modal
  function showModal(pokemon) {
    //Clear all existing modal content
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";

    //Create modal element
    let modal = document.createElement("div");
    modal.classList.add("modal");

    //Create close button in modal
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    //Create title element in modal
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    //Create content element in modal
    let contentElement = document.createElement("p");
    contentElement.innerText = "Height: " + pokemon.height;

    //Create image element in modal
    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;

    //Append modal elements to modal
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    //Add is-visible class to show the modal
    modalContainer.classList.add("is-visible");

    //Close modal when clicking outside of it
    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })
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

