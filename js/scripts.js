const pokemonRepository = (function () {
  const pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=35";
  const modalContainer = document.getElementById("modal-container");

  const pokemonKey = {
    normal: { emoji: "🟤", color: "#A8A878" },
    fire: { emoji: "🔥", color: "#F08030" },
    water: { emoji: "💧", color: "#6890F0" },
    electric: { emoji: "⚡", color: "#F8D030" },
    grass: { emoji: "🌿", color: "#78C850" },
    ice: { emoji: "❄️", color: "#98D8D8" },
    fighting: { emoji: "🥊", color: "#C03028" },
    poison: { emoji: "☠️", color: "#A040A0" },
    ground: { emoji: "🌍", color: "#E0C068" },
    flying: { emoji: "🦅", color: "#A890F0" },
    psychic: { emoji: "🧠", color: "#F85888" },
    bug: { emoji: "🐞", color: "#A8B820" },
    rock: { emoji: "🪨", color: "#B8A038" },
    ghost: { emoji: "👻", color: "#705898" },
    dragon: { emoji: "🐉", color: "#7038F8" },
    dark: { emoji: "🌑", color: "#705848" },
    steel: { emoji: "🛠️", color: "#B8B8D0" },
    fairy: { emoji: "🧚", color: "#EE99AC" },
  };

  function capitalizeFirstLetter(string) {
    return [[string[0].toUpperCase()], [string.slice(1)]].join("");
  }

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

  function showModal(pokemon) {
    // Clear the modal
    modalContainer.innerHTML = "";
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Create the close button
    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.classList.add("modal__close");
    closeButton.addEventListener("click", hideModal);

    // Create the modal card
    const modalCard = document.createElement("div");
    modalCard.classList.add("modal__card");

    // Create the modal header
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal__header");

    // Create sequence number element
    const sequenceNumber = document.createElement("p");
    sequenceNumber.classList.add("modal__sequence-number");
    sequenceNumber.textContent =
      "#" + pokemon.order.toString().padStart(3, "0");

    // Create the left section of the header
    const headerLeft = document.createElement("div");
    headerLeft.classList.add("modal__header--left");

    // Create the header name container
    const headerNameContainer = document.createElement("div");
    headerNameContainer.classList.add("modal__header-name-container");

    // Create emoji element
    const emoji = document.createElement("div");
    emoji.classList.add("modal__emoji");
    emoji.textContent = pokemonKey[pokemon.types[0]].emoji;

    // Create the Pokemon details container
    const pokemonDetails = document.createElement("div");
    pokemonDetails.classList.add("modal__pokemon-details");

    // Create type paragraph and Pokemon name
    const typeParagraph = document.createElement("p");
    typeParagraph.textContent = pokemon.types[0].toUpperCase();

    const pokemonName = document.createElement("h2");
    pokemonName.textContent = capitalizeFirstLetter(pokemon.name);

    pokemonDetails.appendChild(typeParagraph);
    pokemonDetails.appendChild(pokemonName);

    // Append emoji and pokemon details to the header name container
    headerNameContainer.appendChild(emoji);
    headerNameContainer.appendChild(pokemonDetails);

    // Create the header details section
    const headerDetails = document.createElement("section");
    headerDetails.classList.add("modal__header-details");

    // Create the Height, Weight, and Abilities sections
    const heightDiv = document.createElement("div");
    const heightLabel = document.createElement("p");
    heightLabel.textContent = "Height";
    const heightValue = document.createElement("p");
    heightValue.textContent =
      parseFloat(pokemon.height * 0.1).toFixed(1) + " Meters";
    heightDiv.appendChild(heightLabel);
    heightDiv.appendChild(heightValue);

    const weightDiv = document.createElement("div");
    const weightLabel = document.createElement("p");
    weightLabel.textContent = "Weight";
    const weightValue = document.createElement("p");
    weightValue.textContent = (pokemon.weight * 0.1).toFixed(1) + " Kg";
    weightDiv.appendChild(weightLabel);
    weightDiv.appendChild(weightValue);

    const abilitiesDiv = document.createElement("div");
    const abilitiesLabel = document.createElement("p");
    abilitiesLabel.textContent = "Abilities";
    const ability1 = document.createElement("p");
    ability1.textContent = capitalizeFirstLetter(pokemon.abilities[0]);

    abilitiesDiv.appendChild(abilitiesLabel);
    abilitiesDiv.appendChild(ability1);

    if (pokemon.abilities[1]) {
      const ability2 = document.createElement("p");
      ability2.textContent = capitalizeFirstLetter(pokemon.abilities[1]);
      abilitiesDiv.appendChild(ability2);
    }
    // Append all the details to headerDetails section
    headerDetails.appendChild(heightDiv);
    headerDetails.appendChild(weightDiv);
    headerDetails.appendChild(abilitiesDiv);

    // Create the right side of the header
    const headerRight = document.createElement("div");
    headerRight.classList.add("modal__header--right");

    // Create the image for the Pokemon sprite
    const spriteImage = document.createElement("img");
    spriteImage.src = pokemon.sprites.other.home.front_default;
    spriteImage.alt = "placeholder";
    spriteImage.classList.add("modal__sprite");

    // Append the image to the right section
    headerRight.appendChild(spriteImage);

    // Append the children to header left
    headerLeft.appendChild(headerNameContainer);
    headerLeft.appendChild(headerDetails);

    // Append everything to modal header
    modalHeader.appendChild(sequenceNumber);
    modalHeader.appendChild(headerLeft);
    modalHeader.appendChild(headerRight);

    // Create the modal body
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal__body");

    // Create height heading
    const heightHeading = document.createElement("h3");
    heightHeading.classList.add("modal__height");
    heightHeading.textContent = "0.3M";

    // Create abilities heading
    const abilitiesHeading = document.createElement("h3");
    abilitiesHeading.classList.add("modal__ablilities");
    abilitiesHeading.textContent = "Abilities";

    // Create the ability list
    const abilityList = document.createElement("ul");
    abilityList.classList.add("modal__abilitiy-list");

    // Create ability list items
    const abilityItem1 = document.createElement("li");
    abilityItem1.classList.add("ability");
    abilityItem1.textContent = "hello";

    const abilityItem2 = document.createElement("li");
    abilityItem2.classList.add("ability");
    abilityItem2.textContent = "world";

    // Append abilities to the list

    // Append everything to modal body
    modalBody.appendChild(heightHeading);
    modalBody.appendChild(abilitiesHeading);

    // Append header and body to the modal card
    modalCard.appendChild(modalHeader);
    modalCard.appendChild(modalBody);

    // Finally, append the close button and modal card to the modal container
    modal.appendChild(closeButton);
    modal.appendChild(modalCard);

    modal.style.background = `linear-gradient(to top, ${
      pokemon.types.length === 1
        ? `${pokemonKey[pokemon.types[0]].color}, ${
            pokemonKey[pokemon.types[0]].color
          }`
        : `${pokemonKey[pokemon.types[0]].color}, ${
            pokemonKey[pokemon.types[1]].color
          }`
    })`;
    modalContainer.appendChild(modal);
    modalContainer.classList.add("isVisible");
    console.log(pokemon);
  }

  function hideModal() {
    modalContainer.classList.remove("isVisible");
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then((pokemonDetails) => {
      console.log(pokemonDetails);
      const { abilities, cries, sprites, height, weight, types, order, stats } =
        pokemonDetails;
      // compile the types into an simple array
      const typesArray = [];
      for (let i = 0; i < types.length; i++) {
        typesArray.push(types[i].type.name);
      }

      // compile the stats into an object
      const statsObj = {};
      for (let i = 0; i < stats.length; i++) {
        statsObj[stats[i].stat.name] = stats[i].base_stat;
      }

      // compile abilities into a single array
      const abilitiesArray = [];
      for (let i = 0; i < abilities.length; i++) {
        abilitiesArray.push(abilities[i].ability.name);
      }

      const pokemonCopy = {
        ...pokemon,
        abilities: abilitiesArray,
        stats: statsObj,
        cries,
        sprites,
        height,
        types: typesArray,
        order,
        weight,
      };

      showModal(pokemonCopy);
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

  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("isVisible")) {
      hideModal();
    }
  });

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
