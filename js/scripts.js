//defining the initial pokemon repository list. Changing the "limit" parameter will result in more or less pokemon being returned from the api
const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //defines function to add new pokemon to list, as long as each new pokemon has a "name", "height", and "types" defined.
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon //&&
      //"detailsUrl" in pokemon
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

  //defines function to add new items/buttons to page.  This takes all the pokemon from the repository and creates a new "li" element and button.  Buttons are created using the pokemon name as their innerText.  Lastly an eventListener is added to listen for mouse clicks and log the details in the console.
  function addListItem(pokemon) {
    let listOfPokemon = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemonButton");
    listItem.appendChild(button);
    listOfPokemon.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //the following function fetches a list of 150 pokemon from the api endpoint that was defined as "apiUrl" earlier.  It returns this list in a JSON format  and then goes through each item in the list and pulls just the item name (pokemon name) and item details url from the item list.  Using the "add" function that was defined above, each new pokemon is pushed to the pokemon repository.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
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

  //after fetching the item detail url for each pokemon in our list of 150 via the "loadList" function, this function will go to each detailsUrl and provide the image location, height, and types for each pokemon in our list.
  function loadDetails(item) {
    let url = item.detailsUrl;
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

  //defines a function to log details (image url, height, and types) for pokemon that is clicked.  This will be added to the bottom of the console log.  Reminder that the console log is pre-populated with all the names and detailsURL for all pokemon in our list due to our "loadList" function above.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

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
