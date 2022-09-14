let pokemonList = [
  { name: "Charizard", height: 6, types: ["Fire", "Flying"] },
  { name: "Raichu", height: 3, types: ["Electric", "Psychic"] },
  { name: "Mimikyu", height: 1, types: ["Ghost", "Fairy"] },
];

//forEach function to write out the full list of pokemon defined thus far and call out specific pokemon over a certain height
pokemonList.forEach(function (pokemon) {
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
