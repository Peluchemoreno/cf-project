const pokemonList = [
  {
    name: "Caterpie",
    height: 0.3,
    types: ["bug"],
  },
  {
    name: "Charmander",
    height: 0.6,
    types: ["fire"],
  },
  {
    name: "Swinub",
    height: 0.4,
    types: ["ice", "ground"],
  },
];

for (let i = 0; i < pokemonList.length; i++) {
  // this conditional that checks the pokemon's height lives within the document.write argument for the sake of being succinct
  document.write(
    pokemonList[i].height > 0.5
      ? `${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!</br>`
      : `${pokemonList[i].name} (height: ${pokemonList[i].height})</br>`,
  );
}
