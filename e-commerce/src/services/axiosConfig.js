import axios from "axios";

const BASEURL = "https://api.techspecs.io";
const APIKEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19QY3pIclc4ckNVVW93diIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNUXF5dkJESWxQbVVQcE1SWUVWdnlLZSIsImlhdCI6MTcwODg3MzY3MX0.VX5UZ7-FKqG6Um6BDMNUPxMHOrUnSUbLT7xbnS4kMvg";

const instance = axios.create({
  baseURL: BASEURL,
  headers: { Authorization: APIKEY },
});

export default instance;
