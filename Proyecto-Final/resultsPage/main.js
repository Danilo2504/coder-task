const params = new URLSearchParams(window.location.search);
const value = params.get("value");

const inputText = document.getElementById("search-bar");
const resultsContainer = document.getElementById("results-container");
const searchButton = document.getElementById("search-button");

const buttonsContainer = document.getElementById("buttons-container");
buttonsContainer.className = "buttons-container-styles";

inputText.value = value;

const resultsPerPage = 10;
let currentPage = 1;
let allVideos = [];

buttonsContainer.innerHTML = `<div>
  <a id="go-back" class="link-navigation-styles">Anterior</a>
  <span id="current-page"></span>
  <a id="go-forward" class="link-navigation-styles">Siguiente</a>
</div>`;

const nextPageButton = document.getElementById("go-forward");
const currentPageText = document.getElementById("current-page");
const previousPageButton = document.getElementById("go-back");

getVideoByKeyWord(value, 50)
  .then((data) =>
    resultsWithChannel(data)
      .then((res) => {
        const loadingContainer = document.getElementById("loading");
        loadingContainer.remove();
        allVideos = res;
        cutResults(1);
      })
      .catch((error) => {
        console.error("Ocurrió un error al resolver resultsWithChannel", error);
        throw error;
      })
  )
  .catch((error) => {
    console.error(error);
    throw error;
  });

const resultsWithChannel = async (resultData) => {
  const promisesArray = resultData.map((result) =>
    getChannelById(result.snippet.channelId)
      .then((data) => ({
        ...result,
        channelIcon: data.snippet.thumbnails.default.url,
      }))
      .catch((error) => {
        console.error("Ocurrió un error dentro de resultsWithChannel", error);
        throw error;
      })
  );

  return Promise.all(promisesArray);
};

const createResultCard = (resultData) => {
  const newCard = document.createElement("div");
  newCard.className = "result-styles";
  newCard.innerHTML = `
  <div class="result-thumbnail-container-styles">
  <a
    href="https://www.youtube.com/watch?v=${resultData.id.videoId}"
    target="_blank"
    class="result-thumbnail-link-styles"
  >
    <img
      src="${resultData.snippet.thumbnails.high.url}"
      class="result-thumbnail-styles"
      alt=""
    />
  </a>
</div>
<div class="result-content-styles">
  <h4 class="result-title-styles">${resultData.snippet.title}</h4>
  <p class="result-channel-name-styles">${getIntervalFromDate(
    resultData.snippet.publishedAt
  )}</p>
  <div class="result-channel-styles">
    <img
      src="${resultData.channelIcon}"
      class="result-channel-icon-styles"
    />
    <p class="result-channel-name-styles">${resultData.snippet.channelTitle}</p>
  </div>
  <p class="result-channel-name-styles">${resultData.snippet.description}</p>
</div>`;

  resultsContainer.appendChild(newCard);
};

const cutResults = (page = 1) => {
  resultsContainer.innerHTML = "";
  currentPageText.textContent = currentPage;

  handlePages();

  const startInterval = (page - 1) * resultsPerPage;
  const endInterval = startInterval + resultsPerPage;

  const cutList = allVideos.slice(startInterval, endInterval);
  cutList.map((item) => createResultCard(item));
};

const handlePages = () => {
  const totalPages = Math.ceil(allVideos.length / resultsPerPage);
  if (currentPage === 1) {
    previousPageButton.className = "disabled-link";
  } else {
    previousPageButton.className = "link-navigation-styles";
  }
  if (currentPage === totalPages) {
    nextPageButton.className = "disabled-link";
  } else {
    nextPageButton.className = "link-navigation-styles";
  }
};

const nextPage = () => {
  currentPage++;
  cutResults(currentPage);
};

const previousPage = () => {
  currentPage--;
  cutResults(currentPage);
};

previousPageButton.addEventListener("click", previousPage);
nextPageButton.addEventListener("click", nextPage);

searchButton.addEventListener("click", (event) => {
  event.preventDefault();

  const text = inputText.value.toLowerCase();

  if (!text) {
    console.log("es falsy");
  } else if (!text.replace(/\s/g, "").length) {
    console.log("es todo espacios");
  } else {
    window.location.href = `./index.html?value=${text.trimStart()}`;
  }
});
