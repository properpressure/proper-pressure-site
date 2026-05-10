const container = document.getElementById("reviews-container");
const featuredContainer = document.getElementById("featured-container");

let currentFilter = "all";

function render(filter = "all", search = "") {

  container.innerHTML = "";
  featuredContainer.innerHTML = "";

  let filtered = reviews;

  if (filter !== "all") {
    filtered = filtered.filter(r => r.rating === filter);
  }

  if (search.trim() !== "") {
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  const featured = filtered.filter(r => r.score >= 8);

  featured.forEach(r => {
    featuredContainer.appendChild(createCard(r, true));
  });

  filtered.forEach(r => {
    container.appendChild(createCard(r, false));
  });
}

function createCard(r, featured) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (featured) {
    card.style.border = "1px solid #00ff99";
  }

  card.innerHTML = `
    <div style="display:flex;justify-content:space-between;">
      <h3>${r.title}</h3>
      <span class="badge ${r.rating}">${r.verdict}</span>
    </div>

    <p class="${r.rating}">
      ${r.rating.toUpperCase()} — Score: ${r.score}/10
    </p>

    <div class="bar">
      <div class="fill" style="width:${r.score * 10}%"></div>
    </div>

    <p>${r.description}</p>
  `;

  return card;
}

function filter(type) {
  currentFilter = type;
  const search = document.getElementById("searchInput").value;
  render(type, search);
}

function searchReviews() {
  const search = document.getElementById("searchInput").value;
  render(currentFilter, search);
}

render();