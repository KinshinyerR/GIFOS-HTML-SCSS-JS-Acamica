const arrowLeft = document.getElementById("izq");
const arrowDer = document.getElementById("der");
const gifs = document.getElementById("containerGifsTrending");


// const key = "IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5";

let arrayTrending = [];

let trendingGifs;
let trendingPost = 0;

fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=12`)
  .then((response) => response.json())
  .then((json) => {
    trendingGifs = json.data;
    drawGifs(gifs, trendingGifs);
    for (let i = 0; i < trendingGifs.length; i++) {
      arrayTrending.push(
        trendingGifs[i].images?.preview_webp?.url
          ? trendingGifs[i].images.preview_webp.url
          : trendingGifs[i].images.original.url
      );
    }
  })
  .catch((error) => console.log(error));

arrowDer.addEventListener("click", () => {
  gifs.scrollLeft += 745;
});
arrowLeft.addEventListener("click", () => {
  gifs.scrollLeft -= 745;
});
