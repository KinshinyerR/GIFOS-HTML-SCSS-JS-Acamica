// api.giphy.com / v1 / gifs;
const key = "IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5";
fetch(`https://giphy.com/channel/kinshinyerr?api_key=${key}`)
  .then((response) => response.json())
  .then((json) => {
    if (json.length) {
      const containerMisGifs = document.getElementById("containerMisGifs");
      drawGifs(containerMisGifs, json.data);
    } else {
      const containerMisGifs = document.getElementById("containerMisGifs");
      containerMisGifs.innerHTML = `
            <div class="void">
                <img src="img/icon-mis-gifos-sin-contenido.svg" alt="void">
                <p>""¡Anímate a crear tu primer GIFO!"</p>
            </div>
          `;
    }
  });
