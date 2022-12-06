import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://teal-tough-beetle.cyclic.app/api",
});

export const getAllArticles = () => {
    return ncNewsApi.get("/articles").then((response) => {
      return response.data.articles;
    });
  };

export const getIndividualArticle = (articleID) => {
    return ncNewsApi.get(`/articles/${articleID}`).then((response)=> {
        return response.data.article;
    })
}

export const getCommentsByArticleId = (articleID) => {
    return ncNewsApi.get(`/articles/${articleID}/comments`).then((response) => {
        return response.data.comments;
    })
}

export const upVoteArticleById = (articleID) => {
    const patchBody = {
        inc_votes: 1
    }
    return ncNewsApi.patch(`/articles/${articleID}`, patchBody).then((response) => {
        return response.data.article;
    })
}

export const downVoteArticleById = (articleID) => {
    const patchBody = {
        inc_votes: -1
    }
    return ncNewsApi.patch(`/articles/${articleID}`, patchBody).then((response) => {
        return response.data.article;
    })
}