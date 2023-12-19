const videosContainer = document.getElementById("videos-container");
const inputText = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

const buttonsContainer = document.getElementById("buttons-container");
buttonsContainer.className = "buttons-container-styles";

const resultsPerPage = 8;
let currentPage = 1;
let allVideos = [];

const data = JSON.parse(localStorage.getItem("cachedData"));

buttonsContainer.innerHTML = `<div>
  <a id="go-back" class="link-navigation-styles">Anterior</a>
  <span id="current-page"></span>
  <a id="go-forward" class="link-navigation-styles">Siguiente</a>
</div>`;

const nextPageButton = document.getElementById("go-forward");
const currentPageText = document.getElementById("current-page");
const previousPageButton = document.getElementById("go-back");

getAllVideos("snippet,statistics", 48)
  .then((data) => {
    videosWithChannel(data.items)
      .then((res) => {
        const loadingContainer = document.querySelector(".loading-styles");
        loadingContainer.remove();

        allVideos = res;
        cutResults(1);
      })
      .catch((error) => {
        console.error("Ocurrió un error al resolver videosWithChannel", error);
        throw error;
      });
  })
  .catch((error) => {
    console.error("Ocurrió un error al hacer el fetch de getAllVideos", error);
    throw error;
  });

const videosWithChannel = async (videoData) => {
  const dataPromises = videoData.map((video) =>
    getChannelById(video.snippet.channelId)
      .then((data) => ({
        ...video,
        channelIcon: data.snippet.thumbnails.default.url,
      }))
      .catch((error) => {
        console.error("Ocurrió un error dentro de videosWithChannel", error);
        throw error;
      })
  );

  return Promise.all(dataPromises);
};

const createVideoCard = (videoData) => {
  const newCard = document.createElement("div");
  newCard.className = "video-styles";
  newCard.innerHTML = `
    <a href="https://www.youtube.com/watch?v=${
      videoData.id
    }" target="_blank" class="thumbnail-link-styles">
    <img src="${
      videoData.snippet.thumbnails.high.url
    }" class="thumbnail-styles" alt=""/>
    <a/>
    <div class="content-styles">
      <div>
        <img src="${
          videoData.channelIcon
        }" class="channel-icon-styles" alt="" />
      </div>
      <div class="info-styles">
        <h4 class="title-styles">${videoData.snippet.title}</h4>
        <p class="channel-name-styles">${videoData.snippet.channelTitle}</p>
        <p class="channel-name-styles">${viewsConverter(
          videoData.statistics.viewCount
        )} views - ${getIntervalFromDate(videoData.snippet.publishedAt)}</p>
      </div>
    </div>
  `;

  videosContainer.appendChild(newCard);
};

const cutResults = (page = 1) => {
  videosContainer.innerHTML = "";
  currentPageText.textContent = currentPage;

  handlePages();

  const startInterval = (page - 1) * resultsPerPage;
  const endInterval = startInterval + resultsPerPage;

  const cutList = allVideos.slice(startInterval, endInterval);
  cutList.map((item) => createVideoCard(item));
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
    window.location.href = `./resultsPage/index.html?value=${text.trimStart()}`;
  }
});
