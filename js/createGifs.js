const title = document.getElementById("title");
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");

const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const number3 = document.getElementById("number3");

const video = document.getElementById("video");
const btnStart = document.getElementById("btnStart");
const key = "IiIY2wGSJZqSqezBTIxgg2kEsVdCq2P5";
let recorder;
let form = new FormData();
let myGifs = [];

getStreamAndRecord();

// number1.addEventListener("click", () => contentChange(number1, 1));
// number2.addEventListener("click", () => {
//   getStreamAndRecord();
//   contentChange(number2, 2);
// });
// number3.addEventListener("click", () => contentChange(number3, 3));

function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 320 },
      },
    })
    .then(function (stream) {
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
      btnStart.addEventListener("click", (e) => {
        e.preventDefault();
        contentChange(number1, 1);
        setTimeout(() => {
          contentChange(number2, 2);
          recorder.startRecording();
          setTimeout(() => {
            contentChange(number3, 3);
            recorder.stopRecording(function () {
              let blob = recorder.getBlob();
              form.append("file", blob, "myGif.gif");
              // invokeSaveAsDialog(blob);
              uploadFile(form);
            });
          }, 5000);
        }, 5000);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

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
