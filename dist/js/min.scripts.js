const pokemonRepository = (function () {
    let e = [],
      t = document.getElementById("pokemonModal"),
      l = document.querySelector(".form__input"),
      a = document.getElementById("searchForm"),
      i = {
        normal: { emoji: "\uD83D\uDFE4", color: "#A8A878" },
        fire: { emoji: "\uD83D\uDD25", color: "#F08030" },
        water: { emoji: "\uD83D\uDCA7", color: "#6890F0" },
        electric: { emoji: "⚡", color: "#F8D030" },
        grass: { emoji: "\uD83C\uDF3F", color: "#78C850" },
        ice: { emoji: "❄️", color: "#98D8D8" },
        fighting: { emoji: "\uD83E\uDD4A", color: "#C03028" },
        poison: { emoji: "☠️", color: "#A040A0" },
        ground: { emoji: "\uD83C\uDF0D", color: "#E0C068" },
        flying: { emoji: "\uD83E\uDD85", color: "#A890F0" },
        psychic: { emoji: "\uD83E\uDDE0", color: "#F85888" },
        bug: { emoji: "\uD83D\uDC1E", color: "#A8B820" },
        rock: { emoji: "\uD83E\uDEA8", color: "#B8A038" },
        ghost: { emoji: "\uD83D\uDC7B", color: "#705898" },
        dragon: { emoji: "\uD83D\uDC09", color: "#7038F8" },
        dark: { emoji: "\uD83C\uDF11", color: "#705848" },
        steel: { emoji: "\uD83D\uDEE0️", color: "#B8B8D0" },
        fairy: { emoji: "\uD83E\uDDDA", color: "#EE99AC" },
      };
    function n(e) {
      return [[e[0].toUpperCase()], [e.slice(1)]].join("");
    }
    function o(e, t) {
      e = e.replace(/^#/, "");
      let l = parseInt(e, 16),
        a = (l >> 16) & 255,
        i = (l >> 8) & 255,
        n = 255 & l,
        o = 1 - t / 100;
      (a = Math.round(a * o)), (i = Math.round(i * o)), (n = Math.round(n * o));
      let d = (e) => e.toString(16).padStart(2, "0");
      return `#${d(a)}${d(i)}${d(n)}`;
    }
    function d() {
      return e;
    }
    function s(t) {
      if ("object" != typeof t) return "Incorrect data type";
      e.push(t);
    }
    function r(e) {
      return fetch(e.detailsUrl)
        .then((e) => e.json())
        .then((e) => e);
    }
    function c(e) {
      let l = document.createElement("button");
      l.classList.add(
        "page__pokemon-list-item",
        "list-group-item",
        "col",
        "col-lg-3",
        "col-xl-auto"
      );
      let a = document.createElement("p");
      (a.innerText = n(e.name)),
        a.classList.add("pokemon__name"),
        l.appendChild(a),
        l.setAttribute("data-toggle", "modal"),
        l.setAttribute("data-target", "#pokemonModal"),
        (function e(l, a) {
          l.addEventListener("click", () => {
            !(function e(l) {
              r(l).then((e) => {
                let {
                    abilities: a,
                    cries: d,
                    sprites: s,
                    height: r,
                    weight: c,
                    types: p,
                    order: m,
                    stats: h,
                  } = e,
                  u = [];
                for (let C = 0; C < p.length; C++) u.push(p[C].type.name);
                let g = {};
                for (let f = 0; f < h.length; f++)
                  g[h[f].stat.name] = h[f].base_stat;
                let E = [];
                for (let y = 0; y < a.length; y++) E.push(a[y].ability.name);
                let L = {
                  ...l,
                  abilities: E,
                  stats: g,
                  cries: d,
                  sprites: s,
                  height: r,
                  types: u,
                  order: m,
                  weight: c,
                };
                !(function e(l) {
                  t.innerHTML = "";
                  let a = document.createElement("div");
                  a.classList.add("modal-dialog"),
                    a.classList.add("modal-dialog-centered"),
                    a.setAttribute("role", "document");
                  let d = document.createElement("div");
                  d.classList.add("modal-content");
                  let s = document.createElement("div");
                  s.classList.add("modal__card");
                  let r = document.createElement("div");
                  r.classList.add("modal__header");
                  let c = document.createElement("p");
                  c.classList.add("modal__sequence-number"),
                    (c.textContent = "#" + l.order.toString().padStart(3, "0"));
                  let p = document.createElement("div");
                  p.classList.add("modal__header--left");
                  let m = document.createElement("div");
                  m.classList.add("modal__header-name-container");
                  let h = document.createElement("div");
                  h.classList.add("modal__emoji"),
                    (h.textContent = i[l.types[0]].emoji);
                  let u = document.createElement("div");
                  u.classList.add("modal__pokemon-details");
                  let C = document.createElement("p");
                  C.textContent = l.types[0].toUpperCase();
                  let g = document.createElement("h2");
                  (g.textContent = n(l.name)),
                    u.appendChild(C),
                    u.appendChild(g),
                    m.appendChild(h),
                    m.appendChild(u);
                  let f = document.createElement("section");
                  f.classList.add("modal__header-details");
                  let E = document.createElement("div"),
                    y = document.createElement("p");
                  y.textContent = "Height";
                  let L = document.createElement("p");
                  (L.textContent =
                    parseFloat(0.1 * l.height).toFixed(1) + " Meters"),
                    E.appendChild(y),
                    E.appendChild(L);
                  let $ = document.createElement("div"),
                    b = document.createElement("p");
                  b.textContent = "Weight";
                  let k = document.createElement("p");
                  (k.textContent = (0.1 * l.weight).toFixed(1) + " Kg"),
                    $.appendChild(b),
                    $.appendChild(k),
                    f.appendChild(E),
                    f.appendChild($);
                  let v = document.createElement("div");
                  v.classList.add("modal__header--right");
                  let j = document.createElement("img");
                  (j.src = l.sprites.other.home.front_default),
                    (j.alt = "placeholder"),
                    j.classList.add("modal__sprite"),
                    v.appendChild(j),
                    p.appendChild(m),
                    p.appendChild(f),
                    r.appendChild(c),
                    r.appendChild(p),
                    r.appendChild(v);
                  let A = document.createElement("div");
                  A.classList.add("modal__body");
                  let _ = document.createElement("div");
                  _.classList.add("modal__ability-list");
                  let x = document.createElement("h3");
                  x.classList.add("modal__ablilities"),
                    (x.textContent = "Abilities");
                  let S = document.createElement("ul");
                  S.classList.add("modal__abilitiy-list"),
                    S.classList.add("list-group"),
                    S.classList.add("list-group-horizontal");
                  let w = document.createElement("li");
                  if (
                    (w.classList.add("ability"),
                    w.classList.add("list-group-item"),
                    (w.textContent = n(l.abilities[0])),
                    S.appendChild(w),
                    l.abilities[1])
                  ) {
                    let F = document.createElement("li");
                    F.classList.add("ability"),
                      F.classList.add("list-group-item"),
                      (F.textContent = n(l.abilities[1])),
                      S.appendChild(F);
                  }
                  let D = document.createElement("button");
                  D.setAttribute("type", "button"),
                    D.classList.add("modal__play-button");
                  let B = new Audio(l.cries.latest);
                  B.play(),
                    D.addEventListener("click", () => {
                      B.play();
                    });
                  let M = document.createElement("img");
                  M.setAttribute("src", "./img/play.svg"),
                    M.classList.add("modal__play-button-svg"),
                    D.appendChild(M),
                    S.appendChild(D),
                    S.appendChild(D);
                  let N = document.createElement("h3");
                  N.classList.add("modal__stats-title"),
                    (N.textContent = "Stats");
                  let I = document.createElement("section");
                  I.classList.add("modal__stats");
                  let U = {
                    hp: "Hp",
                    attack: "Attack",
                    defense: "Defense",
                    "special-attack": "Special Attack",
                    "special-defense": "Special Defense",
                    speed: "Speed",
                  };
                  [
                    "hp",
                    "attack",
                    "defense",
                    "special-attack",
                    "special-defense",
                    "speed",
                  ].forEach((e) => {
                    let t = document.createElement("div");
                    t.className = "stat";
                    let a = document.createElement("p");
                    a.textContent = U[e];
                    let i = document.createElement("div");
                    i.className = "stat-bar";
                    let n = document.createElement("div");
                    (n.className = "stat-bar__inside"),
                      (n.style.backgroundColor = l.types.includes("electric")
                        ? "#333"
                        : "#fff"),
                      (n.style.width = `${
                        1.25 * Math.floor((100 * l.stats[e]) / 255)
                      }%`),
                      i.appendChild(n);
                    let o = document.createElement("p");
                    (o.textContent = l.stats[e]),
                      t.appendChild(a),
                      t.appendChild(i),
                      t.appendChild(o),
                      I.appendChild(t);
                  }),
                    A.appendChild(x),
                    A.appendChild(S),
                    A.appendChild(N),
                    A.appendChild(I),
                    s.appendChild(r),
                    s.appendChild(A),
                    s.classList.add("modal-body");
                  let H = document.createElement("div");
                  H.classList.add("modal-header");
                  let R = document.createElement("h3");
                  R.classList.add("modal-title"), H.appendChild(R);
                  let q = document.createElement("button");
                  q.setAttribute("type", "button"),
                    q.classList.add("btn-close"),
                    q.setAttribute("data-bs-dismiss", "modal"),
                    q.setAttribute("aria-label", "close"),
                    H.appendChild(q),
                    d.appendChild(H),
                    d.appendChild(s),
                    (d.style.background = `linear-gradient(to top, ${
                      1 === l.types.length
                        ? `${o(i[l.types[0]].color, 25)}, ${
                            i[l.types[0]].color
                          }`
                        : `${i[l.types[0]].color}, ${i[l.types[1]].color}`
                    })`),
                    a.appendChild(d),
                    t.appendChild(a);
                  let T = new bootstrap.Modal(t);
                  T.show();
                })(L);
              });
            })(a);
          });
        })(l, e),
        (function e(t, l) {
          let a = t.detailsUrl,
            n = document.createElement("img");
          return fetch(a)
            .then((e) => e.json())
            .then((e) => {
              (l.style.background = `linear-gradient(to right, ${
                1 === e.types.length
                  ? `${o(i[e.types[0].type.name].color, 25)} 50%, ${
                      i[e.types[0].type.name].color
                    } 50%`
                  : `${i[e.types[0].type.name].color} 50%, ${
                      i[e.types[1].type.name].color
                    } 50%`
              })`),
                n.setAttribute("src", e.sprites.other.home.front_default),
                n.classList.add("page__pokemon-image", "image-fluid"),
                l.appendChild(n);
            });
        })(e, l),
        pokemonListNode.appendChild(l);
    }
    return (
      a.addEventListener("submit", function t(a) {
        a.preventDefault();
        let i = e.filter((e) => e.name.includes(l.value.toLowerCase()));
        console.log(i),
          !(i.length < 1) &&
            ((pokemonListNode.innerHTML = ""),
            i.forEach((e) => {
              c(e);
            }),
            (l.value = ""));
      }),
      {
        getAll: d,
        add: s,
        filter: function t(l) {
          return e.filter((e) => e.name.toLowerCase() === l.toLowerCase());
        },
        addListItem: c,
        loadList: function e() {
          return fetch("https://pokeapi.co/api/v2/pokemon/?limit=500")
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              e.results.forEach(function (e) {
                s({ name: e.name, detailsUrl: e.url });
              });
            })
            .catch(function (e) {
              console.error(e);
            });
        },
        loadDetails: r,
      }
    );
  })(),
  pokemonListNode = document.querySelector(".page__pokemon-list");
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((e) => {
    pokemonRepository.addListItem(e);
  });
});
