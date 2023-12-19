const getChannelById = async (channelId) => {
  return fetch(
    CONFIG.base_url +
      "/channels?" +
      new URLSearchParams({
        key: CONFIG.api_key,
        part: "snippet",
        id: channelId,
      })
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((channel) => channel.items[0])
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
