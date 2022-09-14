let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Charizard", height: 6, types: ["Fire", "Flying"] },
    { name: "Raichu", height: 3, types: ["Electric", "Psychic"] },
    { name: "Mimikyu", height: 1, types: ["Ghost", "Fairy"] },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll(pokemon) {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

//forEach function to write out the full list of pokemon defined thus far and call out specific pokemon over a certain height
pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 3) {
    document.write(
      pokemon.name +
        " (height: " +
        pokemon.height +
        ")" +
        " - Wow, that's big!<br>"
    );
  } else {
    document.write(pokemon.name + " (height: " + pokemon.height + ")<br>");
  }
});
