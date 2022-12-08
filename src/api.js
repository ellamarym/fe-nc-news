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

export const upVoteCommentById = (commentID) => {
    const patchBody = {inc_votes: 1}
    return ncNewsApi.patch(`/comments/${commentID}`, patchBody).then((response) => {
        return response.data.comment
    })
}

export const downVoteCommentById = (commentID) => {
    const patchBody = {inc_votes: -1}
    return ncNewsApi.patch(`/comments/${commentID}`, patchBody).then((response) => {
        return response.data.comment
    })
}

export const postCommentByArticleId = (articleID, comment) => {
    const newComment = {
        username: 'tickle122',
        body: comment
    }
    
    return ncNewsApi.post(`/articles/${articleID}/comments`, newComment).then((response) => {
        return response.data.comment;
    })
}

export const getAllTopics = () => {
    return ncNewsApi.get(`/topics`).then((response) => {
        return response.data.topics
    })
} 

export const getAllUsers = () => {
    return ncNewsApi.get(`/users`).then((response)=> {
        return response.data.users
    })
}

export const getArticleByTopic = (slug) => {
 return ncNewsApi.get(`/article?topic=${slug}`).then((response)=> {
    console.log(response.data.articles)
    return response.data.articles;
 })
}