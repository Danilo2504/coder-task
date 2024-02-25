export const getAllPhotos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  return response;
};
