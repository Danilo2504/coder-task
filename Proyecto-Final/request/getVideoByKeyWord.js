const getVideoByKeyWord = async (keyWord, maxResults = 1) => {
  const loadingContainer = document.getElementById("loading");
  loadingContainer.className = "loading-styles";
  loadingContainer.innerHTML = "<h2>Cargando...</h2>";

  return fetch(
    CONFIG.base_url +
      "/search?" +
      new URLSearchParams({
        key: CONFIG.api_key,
        q: keyWord,
        part: "snippet",
        maxResults: maxResults,
        type: "video",
        order: "relevance",
      })
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.items)
    .catch((error) => {
      console.error(error);
      loadingContainer.innerHTML =
        "<h2>Algo salio mal. No se pudo hacer la petición</h2>";
      throw error;
    });
};
