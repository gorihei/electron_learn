const button = document.getElementById("button");
const text = document.getElementById("text");

button.addEventListener("click", async () => {
  text.textContent = await await window.myAPI.openDialog();
});
