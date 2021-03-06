let numeroDeGifs = 24;
let word;
let favList = [];
let modoStorage = localStorage.getItem("modo");
let arraySearch = [];
let myGifs = [];
let searchGifs;
const key = "IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5";
const modal = document.querySelector(".modal-section");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let imagen = document.querySelector("#imagen");
let close = document.querySelector(".close");
let info = document.querySelector(".info");
let cont = 0;

if (localStorage.getItem("favList")) {
  favList = JSON.parse(localStorage.getItem("favList"));
}
if (localStorage.getItem("myGifs")) {
  myGifs = JSON.parse(localStorage.getItem("myGifs"));
}

/************************* Dark Mode *****************************/

function toggleModo() {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    modoDark.textContent = "Modo Diurno";
    localStorage.setItem("modo", "dark");
    if (nav.classList.contains("navActivo")) {
      menuBurger.src = "img/close-modo-noct.svg";
    } else {
      menuBurger.src = "img/burger-modo-noct.svg";
    }
  } else {
    localStorage.setItem("modo", "light");
    modoDark.textContent = "Modo Nocturno";
    menuBurger.src = "img/close.svg";
  }
}

/************************* buscar mas *****************************/

function seeMore() {
  valueSearch.textContent = word;
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5&limit=12&q=${word}&offset=${numeroDeGifs}`
  )
    .then((reponse) => reponse.json())
    .then((json) => {
      console.log(json.data);
      drawGifs(containerGifsSearch, json.data);
      numeroDeGifs = numeroDeGifs + 12;
    })
    .catch((error) => console.error(error));
}

/************************* mostrar Gifs *****************************/
function drawGifs(contenedor, gifos) {
  for (let i = 0; i < gifos.length; i++) {
    let containerGif = document.createElement("div");
    containerGif.classList.add("containerGif");
    let gif = gifos[i].images?.preview_webp?.url
      ? gifos[i].images.preview_webp.url
      : gifos[i].images.original.url;
    containerGif.innerHTML = `
      <div class="hoverImg">
        <div class="icons">
          <img id="iconFav" src="img/icon-fav.svg" alt="" srcset="">
          <img id="iconDown" src="img/icon-download.svg" alt="" srcset="">
          <img id="iconMax" src="img/icon-max-normal.svg" alt="" srcset="">
        </div>
        <div class="infoGif">
          <p>${gifos[i].username}</p>
          <p>${gifos[i].title}</p>
        </div>
      </div>
      <img id="imgGif" src="${gif}" alt="gif">`;

    const imgFav = containerGif.children[0].children[0].children[0];
    const imgDow = containerGif.children[0].children[0].children[1];
    const imgMax = containerGif.children[0].children[0].children[2];

    const found = favList.findIndex((elemento) => elemento.id === gifos[i].id);

    if (found !== -1) {
      imgFav.src = "img/icon-fav-active.svg";
    }

    imgFav.addEventListener("click", () => {
      const found = favList.findIndex(
        (elemento) => elemento.id === gifos[i].id
      );
      saveFav(gifos[i]);
      if (found !== -1) {
        imgFav.src = "img/icon-fav.svg";
      } else {
        imgFav.src = "img/icon-fav-active.svg";
      }
    });
    imgDow.addEventListener("click", () => {
      downloadGif(gifos[i].images.original.url, gifos[i].title);
    });
    imgMax.addEventListener("click", () => {
      const found = trendingGifs[i].id == gifos[i].id;
      if (found === true) {
        slider(modal, arrayTrending, i, gifos);
      } else {
        slider(modal, arraySearch, i, gifos);
      }
      modal.classList.toggle("active");
    });

    contenedor.appendChild(containerGif);
  }
}

function busqueda(value) {
  arraySearch = [];
  if (value.length > 0) {
    gifsSection.classList.add("active");
    valueSearch.textContent = value;
    word = value;
    containerGifsSearch.innerHTML = "";
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5&limit=12&q= ${value}`
    )
      .then((reponse) => reponse.json())
      .then((json) => {
        searchGifs = json.data;
        drawGifs(containerGifsSearch, searchGifs);
        for (let i = 0; i < searchGifs.length; i++) {
          arraySearch.push(
            searchGifs[i].images?.preview_webp?.url
              ? searchGifs[i].images.preview_webp.url
              : searchGifs[i].images.original.url
          );
        }
      })
      .catch((error) => console.error(error));
    input.value = "";
  }
}

function downloadGif(url, name) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      console.log(blob);
      const href = window.URL.createObjectURL(new Blob([blob]));
      console.log(href);
      const a = document.createElement("a");
      a.setAttribute("download", name);
      a.href = href;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}

function saveFav(gifo) {
  const found = favList.find((elemento) => elemento.id === gifo.id);
  if (found === undefined) {
    favList.push(gifo);
  } else {
    favList = favList.filter((elemento) => elemento.id !== gifo.id);
  }
  console.log(found);
  localStorage.setItem("favList", JSON.stringify(favList));
}

function apiWords() {
  fetch(`https://api.giphy.com/v1/trending/searches?api_key=${key}`)
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < 5; i++) {
        var word = document.createElement("a");
        word.classList.add("word");
        // word.setAttribute('id', `word${i}`);
        word.href = "";
        word.textContent = ` ${json.data[i]}`;
        suggestedWords.appendChild(word);
      }
      // json.data.slice(0,5).forEach((element) => {
      //   let word = document.createElement("a");
      //   word.classList.add("word");
      //   word.href = "";
      //   word.textContent = ` ${element}`;
      //   suggestedWords.appendChild(word);
      // });

      const word0 = suggestedWords.children[0];
      const word1 = suggestedWords.children[1];
      const word2 = suggestedWords.children[2];
      const word3 = suggestedWords.children[3];
      const word4 = suggestedWords.children[4];

      word0.addEventListener("click", (e) => {
        e.preventDefault();
        busqueda(word0.innerHTML);
      });
      word1.addEventListener("click", (e) => {
        e.preventDefault();
        busqueda(word1.innerHTML);
      });
      word2.addEventListener("click", (e) => {
        e.preventDefault();
        busqueda(word2.innerHTML);
      });
      word3.addEventListener("click", (e) => {
        e.preventDefault();
        busqueda(word3.innerHTML);
      });
      word4.addEventListener("click", (e) => {
        e.preventDefault();
        busqueda(word4.innerHTML);
      });
    });
}

function contentChange(value) {
  switch (value) {
    case 1:
      number1.style = "background: #572EE5; color: #fff";
      title.textContent = "??Nos das acceso a tu c??mara?";
      paragraph1.textContent = "El acceso a tu camara ser?? v??lido s??lo";
      paragraph2.textContent = "por el tiempo en el que est??s creando el GIFO.";
      btnStart.textContent = "GRABAR";
      break;
    case 2:
      number1.style = "background: #fff; color: #572EE5";
      number2.style = "background: #572EE5; color: #fff";
      number3.style = "background: #fff; color: #572EE5";
      video.classList.toggle("display-none");
      title.classList.add("display-none");
      paragraph1.classList.add("display-none");
      paragraph2.classList.add("display-none");
      break;
    case 3:
      number2.style = "background: #fff; color: #572EE5";
      number3.style = "background: #572EE5; color: #fff";
      break;
    default:
      break;
  }
}

let timer;
let hours = "00";
let minutes = "00";
let seconds = "00";

function chronometer() {
  seconds++;

  if (seconds < 10) seconds = `0` + seconds;

  if (seconds > 59) {
    seconds = `00`;
    minutes++;

    if (minutes < 10) minutes = `0` + minutes;
  }

  if (minutes > 59) {
    minutes = `00`;
    hours++;

    if (hours < 10) hours = `0` + hours;
  }

  label.textContent = `${hours}:${minutes}:${seconds}`;
}

function suggested(palabra) {
  fetch(
    `https://api.giphy.com/v1/tags/related/${palabra}?api_key=IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5`
  )
    .then((response) => response.json())
    .then((json) => {
      response = json.data;
      containerSuggested.innerHTML = "";
      response.forEach((word) => {
        const li = document.createElement("li");
        li.classList.add("sug");
        const lup = document.createElement("img");
        lup.src = "img/icon-search-grey.svg";
        lup.alt = "lupa";
        lup.classList.add("lupa");
        const term = document.createElement("a");
        term.innerText = word.name;
        term.tabIndex = 0;

        li.appendChild(lup);
        li.appendChild(term);
        containerSuggested.appendChild(li);

        lup.addEventListener("click", () => {
          input.value = term.innerText;
          line.classList.toggle("display-none");
          containerSuggested.classList.toggle("display-none");
          lupa.src = "img/icon-search.svg";
          busqueda(input.value);
        });
        
        term.addEventListener("click", () => {
          input.value = term.innerText;
          line.classList.toggle("display-none");
          containerSuggested.classList.toggle("display-none");
          lupa.src = "img/icon-search.svg";
          busqueda(input.value);
        });
      });
    })
    .catch((error) => console.log(error));
}

function slider(contenedor, img, indice, gifos) {
  cont = indice;
  imagen.src = img[cont];
  updateInfo(gifos);
  contenedor.addEventListener("click", (e) => {
    let tgt = e.target;

    if (tgt == left) {
      if (cont > 0) {
        imagen.src = img[cont - 1];
        cont--;
      } else {
        imagen.src = img[img.length - 1];
        cont = img.length - 1;
      }
    } else if (e.target == right) {
      if (cont < img.length - 1) {
        imagen.src = img[cont + 1];
        cont++;
      } else {
        imagen.src = img[0];
        cont = 0;
      }
    }
    updateInfo(gifos);
  });
}

function updateInfo(gifos) {
  info.innerHTML = `
      <div class="infoGif">
        <p class="title">${gifos[cont].username}</p>
        <p class="paragraph">${gifos[cont].title}</p>
      </div>
      <div class="icons">
          <img id="iconFav" src="img/icon-fav.svg" alt="" srcset="">
          <img id="iconDown" src="img/icon-download.svg" alt="" srcset="">
      </div>
    `;

  const imgFav = info.children[1].children[0];
  const imgDow = info.children[1].children[1];

  const found = favList.findIndex((elemento) => elemento.id === gifos[cont].id);

  if (found !== -1) {
    imgFav.src = "img/icon-fav-active.svg";
  }

  imgFav.addEventListener("click", () => {
    const found = favList.findIndex(
      (elemento) => elemento.id === gifos[cont].id
    );
    saveFav(gifos[cont]);
    if (found !== -1) {
      imgFav.src = "img/icon-fav.svg";
    } else {
      imgFav.src = "img/icon-fav-active.svg";
    }
  });
  imgDow.addEventListener("click", () => {
    downloadGif(gifos[cont].images.original.url, gifos[cont].title);
  });
  close.addEventListener("click", () => {
    modal.classList.toggle("active");
  });
}

function saveGifos(id) {
  fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${key}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      myGifs.push(json.data)
      localStorage.setItem("myGifs", JSON.stringify(myGifs));
    });
}