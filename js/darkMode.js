const body = document.querySelector("body");
const modoDark = document.querySelector("#modoDark");

if (modoStorage === "dark") {
  toggleModo();
}
modoDark.addEventListener("click", toggleModo);
