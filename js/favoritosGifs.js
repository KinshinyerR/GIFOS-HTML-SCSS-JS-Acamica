
if (favList.length) {
  const containerFavGifs = document.getElementById("containerFavGifs");
  drawGifs(containerFavGifs, favList);
} else {
  const containerFavGifs = document.getElementById("containerFavGifs");
  containerFavGifs.innerHTML = `
    <div class="void">
        <img src="img/icon-fav-sin-contenido.svg" alt="void">
        <p>""¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"</p>
    </div>
  `;
}
