let pokemonList = [
  { name: "Charizard", height: 6, types: ["Fire", "Flying"] },
  { name: "Raichu", height: 3, types: ["Electric", "Psychic"] },
  { name: "Mimikyu", height: 1, types: ["Ghost", "Fairy"] },
];

//for loop to write out the full list of pokemon defined thus far and to check for certain heights
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 3) {
    document.write(
      pokemonList[i].name +
        " (height: " +
        pokemonList[i].height +
        ")" +
        " - Wow, that's big!<br>"
    );
  } else {
    document.write(
      pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>"
    );
  }
}
