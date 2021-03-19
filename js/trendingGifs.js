const arrowLeft = document.getElementById("izq");
const arrowDer = document.getElementById("der");
const gifs = document.getElementById("containerGifsTrending");
const modal = document.querySelector(".modal-section");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let imagen = document.querySelector("#imagen");
let close = document.querySelector(".close");
let info = document.querySelector(".info");

const key = "IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5";

let arrayTrending = [];
let cont = 0;
let trendingGifs;
let trendingPost = 0;

fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=12`)
  .then((response) => response.json())
  .then((json) => {
    trendingGifs = json.data;
    console.log(trendingGifs);
    drawGifs(gifs, trendingGifs);
    for (let i = 0; i < trendingGifs.length; i++) {
      arrayTrending.push(
        trendingGifs[i].images?.preview_webp?.url
          ? trendingGifs[i].images.preview_webp.url
          : trendingGifs[i].images.original.url
      );
      // console.log(
      //   trendingGifs[i].images?.preview_webp?.url
      //     ? trendingGifs[i].images.preview_webp.url
      //     : trendingGifs[i].images.original.url
      // );
    }
  })
  .catch((error) => console.log(error));

arrowDer.addEventListener("click", () => {
  gifs.scrollLeft += 745;
});
arrowLeft.addEventListener("click", () => {
  gifs.scrollLeft -= 745;
});


close.addEventListener("click", () => {
  modal.classList.toggle("active");
});

function slider(contenedor, img, indice, gifos) {
  cont = indice;
  console.log(cont);
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
}
