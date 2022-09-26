//defining the initial pokemon repository list
let pokemonRepository = (function () {
  let repository = [
    { name: "Charizard", height: 6, types: ["Fire", "Flying"] },
    { name: "Raichu", height: 3, types: ["Electric", "Psychic"] },
    { name: "Mimikyu", height: 1, types: ["Ghost", "Fairy"] },
    { name: "Dialga", height: 17, types: ["Steel", "Dragon"] },
    { name: "Braviary", height: 5, types: ["Normal", "Flying"] },
  ];

  //defines function to add new pokemon to list, as long as each new pokemon has a "name", "height", and "types" defined.
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  //defines function to return entire pokemon repository
  function getAll() {
    return repository;
  }

  //defines function to log name for pokemon that is clicked
  function showDetails(pokemon) {
    console.log(pokemon.name);
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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
