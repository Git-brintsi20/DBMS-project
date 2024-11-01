// scripts.js
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector("#search-bar button");
  const searchInput = document.querySelector("#search-bar input");

  searchButton.addEventListener("click", function () {
      const query = searchInput.value;
      alert(`Searching for: ${query}`);
      // Implement search logic here
  });
});
