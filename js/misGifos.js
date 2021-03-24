
if (myGifs.length) {
  const containerMisGifs = document.getElementById("containerMisGifs");
  drawGifs(containerMisGifs, myGifs);
} else {
  const containerMisGifs = document.getElementById("containerMisGifs");
  containerMisGifs.innerHTML = `
      <div class="void">
          <img src="img/icon-mis-gifos-sin-contenido.svg" alt="void">
          <p>""¡Anímate a crear tu primer GIFO!"</p>
      </div>
    `;
}
