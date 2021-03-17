let numeroDeGifs = 24;
let word;
let favList = [];
let modoStorage = localStorage.getItem("modo");

if (localStorage.getItem("favList")) {
  favList = JSON.parse(localStorage.getItem("favList"));
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
    imgMax.addEventListener("click", () => {});

    contenedor.appendChild(containerGif);
  }
}

function busqueda(value) {
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
        drawGifs(containerGifsSearch, json.data);
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
      title.textContent = "¿Nos das acceso a tu cámara?";
      paragraph1.textContent = "El acceso a tu camara será válido sólo";
      paragraph2.textContent = "por el tiempo en el que estés creando el GIFO.";
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

function suggested(term) {
  fetch(
    `https://api.giphy.com/v1/tags/related/${term}?api_key=IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5`
  )
    .then((response) => response.json())
    .then((json) => {
      response = json.data;
      console.log(response);
      containerSuggested.innerHTML = "";
      response.forEach((word) => {
        const term = document.createElement("li");
        term.innerText = word.name;
        term.tabIndex = 0;
        containerSuggested.appendChild(term);
      });
    })
    .catch((error) => console.log(error));
}
