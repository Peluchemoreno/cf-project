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

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    addClickEventListener(button, pokemon);
    listItem.appendChild(button);
    pokemonListNode.appendChild(listItem);
  }

  function addClickEventListener(button, pokemon) {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  return {
    getAll: getAll,
    add: add,
    filter: filter,
    addListItem: addListItem,
  };
})();

const pokemonListNode = document.querySelector(".page__pokemon-list");
pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});
