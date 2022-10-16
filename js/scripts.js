//defining pokemon repository. Changing the "limit" parameter will result in
//more or less pokemon being returned from the api
const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=90";

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

  //defines function to add new pokemon cards and buttons to page.  This takes all the
  //pokemon from the repository and creates a new "li" element and button.
  //Buttons are created using the pokemon name as their innerText.  Lastly an
  //eventListener is added to listen for mouse clicks.
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      const $row = $(".row");
      const $card = $(
        '<div class="card bg-light border-dark text-center mx-auto m-3 list-group-item-action" style="width:300px"  data-toggle="modal" data-target="#modal"></div>'
      );
      const $image = $(
        '<img class="card-img-top mx-auto" alt="Card image" style="width:30%" />'
      );
      $image.attr("src", pokemon.imageUrlFront);
      const $cardBody = $('<div class="card-body"></div>');
      const $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      const $seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal">See Profile</button>'
      );

      $row.append($card);
      //append image to cards
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);

      $seeProfile.on("click", function (event) {
        showDetails(pokemon);
      });
      $card.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }

  //fetches a list of pokemon from the api endpoint that was defined as "apiUrl"
  //earlier.  This list in a JSON format.  The function then goes through each
  //item in the list and pulls just the item name (pokemon name) and item
  //details url from the item list.  Using the "add" function that was defined
  //above, each new pokemon is pushed to the pokemon repository.
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

  //after fetching the item detail url for each pokemon in our list of 90 via
  //the "loadList" function, this function will go to each detailsUrl and
  //provide specific details for each pokemon in our list.
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(" " + details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(" " + details.abilities[i].ability.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //shows the details (i.e. image url, height, and types) for pokemon
  //that are clicked.
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(item) {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");

    //Clear modal content
    modalTitle.empty();
    modalBody.empty();

    const nameElement = $("<h1>" + item.name + "</h1>");
    const imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    const imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    const heightElement = $("<p>" + "Height: " + item.height + "</p>");
    const typesElement = $("<p>" + "Types: " + item.types + "</p>");
    const abilitiesElement = $("<p>" + "Abilities: " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  const searchBar = "#searchBar";
  //add even listener for after any keypress
  $("#searchBar").keyup((e) => {
    let pokemonCard = $(".card");
    const searchString = e.target.value.toLowerCase();
    //console.log(searchString);
    //if searchString is A -> a
    //if searchString is a -> a
    let filteredPokemonList = pokemonList.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchString);
    });
    // remove all pokemon cards from the document
    $(".card").css("display", "none");
    //Re-append only the filteredPokemonList
    filteredPokemonList.forEach(function (pokemon) {
      addListItem(pokemon);
      console.log(filteredPokemonList);
    });
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
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
