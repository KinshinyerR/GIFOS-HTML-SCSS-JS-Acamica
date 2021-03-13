const containerGifs = document.getElementById("containerGifsSearch");
const lupa = document.querySelector(".lupa");
const input = document.getElementById("input");
const gifsSection = document.querySelector(".gifs-section");
const valueSearch = document.querySelector("#valueSearch");
let btnVerMas = document.querySelector("#btnSeeMore");

btnVerMas.addEventListener("click", seeMore);
lupa.addEventListener("click", () => {busqueda(input.value)});

input.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    busqueda(input.value);
  }
});
