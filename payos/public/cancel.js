const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

document.addEventListener("DOMContentLoaded", function () {
  const returnBtn = document.getElementById("return-page-btn");

  returnBtn.addEventListener("click", function () {
    window.location.href = `/?userId=${userId}`;
  });
});
