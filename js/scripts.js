//defining pokemon repository. Changing the "limit" parameter will result in
//more or less pokemon being returned from the api
const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  const pokemonListElement = document.querySelector(".pokemon-list");

  //defines function to add new pokemon to list and performs some basic validation
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  //defines function to return entire pokemon repository
  function getAll() {
    return pokemonList;
  }

  //defines function to add new items/buttons to page.  This takes all the
  //pokemon from the repository and creates a new "li" element and button.
  //Buttons are created using the pokemon name as their innerText.  Lastly an
  //eventListener is added to listen for mouse clicks and log the details in the
  //console.
  function addListItem(pokemon) {
    const listOfPokemon = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemonButton");
    listItem.appendChild(button);
    listOfPokemon.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //the following function fetches a list of 150 pokemon from the api endpoint
  //that was defined as "apiUrl" earlier.  It returns this list in a JSON format
  //and then goes through each item in the list and pulls just the item name
  //(pokemon name) and item details url from the item list.  Using the "add"
  //function that was defined above, each new pokemon is pushed to the pokemon
  //repository.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon); //logs the name and detailsUrl in the console log for each pokemon.
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //after fetching the item detail url for each pokemon in our list of 150 via
  //the "loadList" function, this function will go to each detailsUrl and
  //provide the image location, height, and types for each pokemon in our list.
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //defines a function to log details (image url, height, and types) for pokemon
  //that is clicked.  This will be added to the bottom of the console log.
  //Reminder that the console log is pre-populated with all the names and
  //detailsURL for all pokemon in our list due to our "loadList" function above.
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    const modalContainer = document.querySelector("#modal-container");
    //clear existing content
    modalContainer.innerHTML = "";

    const modal = document.createElement("div");
    modal.classList.add("modal");

    //add close button to modal
    const closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    //add content to modal
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.imageUrl;

    const pokemonName = document.createElement("h1");
    pokemonName.innerText = pokemon.name;

    const pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = `Height: ${pokemon.height}`;

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonHeight);
    modalContainer.appendChild(modal);

    modalContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  //hide modal if ESC key is pressed
  window.addEventListener("keydown", (e) => {
    const modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //The pokemonRepository is defined and housed within an IIFE (Immediately
  //invoked function expression).  This way, you can't directly access it from
  //the outside, which is what protects it.  This makes it nearly impossible to
  //accidentally modify(or access) the shared state, since you always need to
  //explicitly access it via the repository's exposed functions.  The IIFE then
  //returns an object with the following keys.  This means whenever you access
  //the pokemonRepository somewhere in the app, it will represent an object with
  //these keys.
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
