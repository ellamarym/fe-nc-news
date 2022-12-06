import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://teal-tough-beetle.cyclic.app/api",
});

export const getAllArticles = () => {
    return ncNewsApi.get("/articles").then((response) => {
      return response.data.articles;
    });
  };