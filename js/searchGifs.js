const containerGifs = document.getElementById("containerGifsSearch");
const lupa = document.querySelector(".lupa");
const input = document.getElementById("input");
const gifsSection = document.querySelector(".gifs-section");
const valueSearch = document.querySelector("#valueSearch");
let btnVerMas = document.querySelector("#btnSeeMore");
const containerSuggested = document.getElementById('containerSuggested');

btnVerMas.addEventListener("click", seeMore);

input.addEventListener("keypress", (e) => {
  if (modoStorage === "dark") {
    lupa.src = 'img/close-modo-noct.svg';
  }else{
    lupa.src = 'img/close.svg';
  }
  lupa.addEventListener('click', () =>{
    input.value = "";
    lupa.src = 'img/icon-search.svg'
  })
  if (e.target.value.length > 0) {
    suggested(e.target.value);
  }
  if (e.code === "Enter") {
    lupa.src = 'img/icon-search.svg'
    busqueda(input.value);
  }
});
