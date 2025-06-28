const pokemonRepository = (function () {
  const pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=50";
  const modalContainer = document.getElementById("pokemonModal");
  const searchInput = document.querySelector(".form__input");
  const searchForm = document.getElementById("searchForm");

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

  function darkenHex(hex, percent) {
    hex = hex.replace(/^#/, "");

    const num = parseInt(hex, 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    const factor = 1 - percent / 100;
    r = Math.round(r * factor);
    g = Math.round(g * factor);
    b = Math.round(b * factor);

    const toHex = (c) => c.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
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

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    modalDialog.classList.add("modal-dialog-centered");
    modalDialog.setAttribute("role", "document");

    const modal = document.createElement("div");
    modal.classList.add("modal-content");

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

    // Append all the details to headerDetails section
    headerDetails.appendChild(heightDiv);
    headerDetails.appendChild(weightDiv);

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

    // Create the container for the abilities
    const modalAbilities = document.createElement("div");
    modalAbilities.classList.add("modal__ability-list");

    // Create abilities heading
    const abilitiesHeading = document.createElement("h3");
    abilitiesHeading.classList.add("modal__ablilities");
    abilitiesHeading.textContent = "Abilities";

    // Create the ability list
    const abilityList = document.createElement("ul");
    abilityList.classList.add("modal__abilitiy-list");
    abilityList.classList.add("list-group");
    abilityList.classList.add("list-group-horizontal");

    // Create ability list items
    const abilityItem1 = document.createElement("li");
    abilityItem1.classList.add("ability");
    abilityItem1.classList.add("list-group-item");
    abilityItem1.textContent = capitalizeFirstLetter(pokemon.abilities[0]);

    // Append abilities to the list
    abilityList.appendChild(abilityItem1);
    if (pokemon.abilities[1]) {
      const abilityItem2 = document.createElement("li");
      abilityItem2.classList.add("ability");
      abilityItem2.classList.add("list-group-item");
      abilityItem2.textContent = capitalizeFirstLetter(pokemon.abilities[1]);
      abilityList.appendChild(abilityItem2);
    }

    // create play button
    const playButton = document.createElement("button");
    playButton.setAttribute("type", "button");
    playButton.classList.add("modal__play-button");

    // create audio element and source element
    const audio = new Audio(pokemon.cries.latest);
    audio.play();

    playButton.addEventListener("click", () => {
      audio.play();
    });

    const playSvg = document.createElement("img");
    playSvg.setAttribute("src", "./img/play.svg");
    playSvg.classList.add("modal__play-button-svg");

    playButton.appendChild(playSvg);
    abilityList.appendChild(playButton);

    abilityList.appendChild(playButton);

    // Compile and create stats section
    const modalStatsTitle = document.createElement("h3");
    modalStatsTitle.classList.add("modal__stats-title");
    modalStatsTitle.textContent = "Stats";

    const modalStatsSection = document.createElement("section");
    modalStatsSection.classList.add("modal__stats");

    const stats = [
      "hp",
      "attack",
      "defense",
      "special-attack",
      "special-defense",
      "speed",
    ];

    const displayNames = {
      hp: "Hp",
      attack: "Attack",
      defense: "Defense",
      "special-attack": "Special Attack",
      "special-defense": "Special Defense",
      speed: "Speed",
    };

    stats.forEach((stat) => {
      const statDiv = document.createElement("div");
      statDiv.className = "stat";

      const label = document.createElement("p");
      label.textContent = displayNames[stat];

      const barContainer = document.createElement("div");
      barContainer.className = "stat-bar";

      const barInside = document.createElement("div");
      barInside.className = "stat-bar__inside";
      barInside.style.backgroundColor = pokemon.types.includes("electric")
        ? "#333"
        : "#fff";
      barInside.style.width = `${
        Math.floor((pokemon.stats[stat] * 100) / 255) * 1.25
      }%`;

      barContainer.appendChild(barInside);

      const value = document.createElement("p");
      value.textContent = pokemon.stats[stat]; // Replace with actual value dynamically later

      statDiv.appendChild(label);
      statDiv.appendChild(barContainer);
      statDiv.appendChild(value);

      modalStatsSection.appendChild(statDiv);
    });

    // Append everything to modal body
    modalBody.appendChild(abilitiesHeading);
    modalBody.appendChild(abilityList);
    modalBody.appendChild(modalStatsTitle);
    modalBody.appendChild(modalStatsSection);

    // Append header and body to the modal card
    modalCard.appendChild(modalHeader);
    modalCard.appendChild(modalBody);
    modalCard.classList.add("modal-body");

    // Finally, append the close button and modal card to the modal container
    const dummyHeader = document.createElement("div");
    dummyHeader.classList.add("modal-header");
    const modalTitle = document.createElement("h3");
    modalTitle.classList.add("modal-title");

    dummyHeader.appendChild(modalTitle);
    const dummyClose = document.createElement("button");
    dummyClose.setAttribute("type", "button");
    dummyClose.classList.add("btn-close");
    dummyClose.setAttribute("data-bs-dismiss", "modal");
    dummyClose.setAttribute("aria-label", "close");

    dummyHeader.appendChild(dummyClose);
    modal.appendChild(dummyHeader);
    modal.appendChild(modalCard);

    modal.style.background = `linear-gradient(to top, ${
      pokemon.types.length === 1
        ? `${darkenHex(pokemonKey[pokemon.types[0]].color, 25)}, ${
            pokemonKey[pokemon.types[0]].color
          }`
        : `${pokemonKey[pokemon.types[0]].color}, ${
            pokemonKey[pokemon.types[1]].color
          }`
    })`;

    modalDialog.appendChild(modal);
    modalContainer.appendChild(modalDialog);
    const bsModal = new bootstrap.Modal(modalContainer);
    bsModal.show();
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then((pokemonDetails) => {
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

  function renderImage(pokemon, button) {
    const url = pokemon.detailsUrl;
    let image = document.createElement("img");
    return fetch(url)
      .then((res) => res.json())
      .then((pokemonData) => {
        button.style.background = `linear-gradient(to right, ${
          pokemonData.types.length === 1
            ? `${darkenHex(
                pokemonKey[pokemonData.types[0].type.name].color,
                25
              )} 50%, ${pokemonKey[pokemonData.types[0].type.name].color} 50%`
            : `${pokemonKey[pokemonData.types[0].type.name].color} 50%, ${
                pokemonKey[pokemonData.types[1].type.name].color
              } 50%`
        })`;
        image.setAttribute("src", pokemonData.sprites.other.home.front_default);
        image.classList.add("page__pokemon-image", "image-fluid");
        button.appendChild(image);
      });
  }

  function addListItem(pokemon) {
    let button = document.createElement("button");
    button.classList.add(
      "page__pokemon-list-item",
      "list-group-item",
      "col",
      "col-lg-3",
      "col-xl-auto"
    );
    let buttonText = document.createElement("p");
    buttonText.innerText = capitalizeFirstLetter(pokemon.name);
    buttonText.classList.add("pokemon__name");

    button.appendChild(buttonText);

    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    addClickEventListener(button, pokemon);
    renderImage(pokemon, button);
    pokemonListNode.appendChild(button);
  }

  function addClickEventListener(button, pokemon) {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function search(e) {
    e.preventDefault();
    const filteredPokemon = pokemonList.filter((pokemon) => {
      return pokemon.name.includes(searchInput.value.toLowerCase());
    });

    console.log(filteredPokemon);

    if (filteredPokemon.length < 1) {
      return;
    } else {
      pokemonListNode.innerHTML = "";

      filteredPokemon.forEach((pokemon) => {
        addListItem(pokemon);
      });
    }

    searchInput.value = "";
  }

  searchForm.addEventListener("submit", search);

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
