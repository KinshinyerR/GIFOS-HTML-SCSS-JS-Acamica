const containerGifs = document.getElementById("containerGifsSearch");
const lupa = document.querySelector(".lupa");
const input = document.getElementById("input");
const gifsSection = document.querySelector(".gifs-section");
const valueSearch = document.querySelector("#valueSearch");
let btnVerMas = document.querySelector("#btnSeeMore");
const containerSuggested = document.getElementById
('containerSuggested');
const line = document.getElementById('line');

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
    line.classList.add('display-none')
    containerSuggested.classList.add('display-none')
  })
  if (e.target.value.length > 0) {
    line.classList.remove('display-none')
    containerSuggested.classList.remove('display-none')
    suggested(e.target.value);
  }
  if (e.code === "Enter") {
    lupa.src = 'img/icon-search.svg'
    line.classList.add('display-none')
    containerSuggested.classList.add('display-none')
    busqueda(input.value);
  }
});
