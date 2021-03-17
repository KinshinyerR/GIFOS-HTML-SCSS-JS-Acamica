const title = document.getElementById("title");
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");

const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const number3 = document.getElementById("number3");

const video = document.getElementById("video");
const label = document.getElementById("label");
const hover = document.getElementById("hover");
const btnStart = document.getElementById("btnStart");
const check = document.getElementById("check");
const paragraph = document.getElementById("paragraph");
const spinner = document.querySelector(".spinner");

const key = "IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5";
let recorder;
let isActive;
let form = new FormData();
let myGifs = [];

function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 320 },
      },
    })
    .then(function (stream) {
      isActive = stream.active;
      video.srcObject = stream;
      video.play();
      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log("started");
        },
      });
      if (isActive) {
        contentChange(2);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
btnStart.addEventListener("click", async (e) => {
  e.preventDefault();
  switch (btnStart.innerText) {
    case "COMENZAR":
      contentChange(1);
      getStreamAndRecord();
      break;
    case "GRABAR":
      recorder.startRecording();
      btnStart.textContent = "FINALIZAR";
      timer = setInterval(chronometer, 1000);
      break;
    case "FINALIZAR":
      contentChange(3);
      clearInterval(timer);
      label.textContent = "REPETIR CAPTURA";
      recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        form.append("file", blob, "myGif.gif");
        // invokeSaveAsDialog(blob);
      });
      video.pause();
      btnStart.textContent = "SUBIR GIFO";
      label.addEventListener("click", () => {
        video.classList.toggle("display-none");
        video.play();
        btnStart.textContent = "GRABAR";
        label.textContent = "";
        seconds = "00";
        contentChange(2);
      });
      break;
    case "SUBIR GIFO":
      uploadFile(form);
      hover.classList.add("active");
      label.classList.toggle('display-none')
      setTimeout(() => {
        setTimeout(() => {
          check.classList.toggle('display-none')
        }, 50);
        spinner.classList.add("display-none");
        paragraph.textContent = 'GIFO subido con éxito';
      }, 12000);
      break;
    default:
      break;
  }
});
function uploadFile(file) {
  fetch(`https://upload.giphy.com/v1/gifs?api_key=${key}`, {
    method: "POST",
    body: file,
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      myGifs.push(json);
      //   localStorage.setItem("MisGifs", JSON.stringify(myGifs));
    })
    .catch((err) => {
      console.log(err);
    });
}
