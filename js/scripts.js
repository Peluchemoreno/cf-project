const pokemonRepository = (function () {
  const pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=15";

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
      return pokemon.name.toLowerCase() === name.toLowerCase();
    });
  }

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
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then((pokemonDetails) => {
      const { abilities, cries, sprites, height, types, order } =
        pokemonDetails;
      const pokemonCopy = {
        ...pokemon,
        abilities,
        cries,
        sprites,
        height,
        types,
        order,
      };
      // console.log(pokemonDetails);
      console.log(pokemonCopy);
    });
  }

  function addListItem(pokemon) {
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add("page__pokemon-list-item");
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
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

const pokemonListNode = document.querySelector(".page__pokemon-list");

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
