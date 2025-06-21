const pokemonRepository = (function () {
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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon !== "object") {
      return "Incorrect data type";
    }
    pokemonList.push(pokemon);
  }

  function filter(name) {
    return pokemonList.filter((pokemon) => {
      return pokemon.name === name;
    });
  }

  return {
    getAll: getAll,
    add: add,
    filter: filter,
  };
})();

pokemonRepository.getAll().forEach((pokemon) => {
  // this conditional that checks the pokemon's height lives within the document.write argument for the sake of being succinct
  document.write(
    pokemon.height > 0.5
      ? `${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!</br>`
      : `${pokemon.name} (height: ${pokemon.height})</br>`,
  );
});
