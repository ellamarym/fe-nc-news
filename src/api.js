import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://teal-tough-beetle.cyclic.app/api",
});

export const getAllArticles = () => {
    return ncNewsApi.get("/articles").then((response) => {
      return response.data.articles;
    }).catch((err) => {
        return {error: err.response.data.msg}
     });
  };

export const getIndividualArticle = (articleID) => {
    return ncNewsApi.get(`/articles/${articleID}`).then((response)=> {
        return response.data.article;
    }).catch((err) => {
       return {error: err.response.data.msg}
    })
}

export const getCommentsByArticleId = (articleID) => {
    return ncNewsApi.get(`/articles/${articleID}/comments`).then((response) => {
        return response.data.comments;
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
}

export const upVoteArticleById = (articleID) => {
    const patchBody = {
        inc_votes: 1
    }
    return ncNewsApi.patch(`/articles/${articleID}`, patchBody).then((response) => {
        return response.data.article;
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
}

export const downVoteArticleById = (articleID) => {
    const patchBody = {
        inc_votes: -1
    }
    return ncNewsApi.patch(`/articles/${articleID}`, patchBody).then((response) => {
        return response.data.article;
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
}

export const upVoteCommentById = (commentID) => {
    const patchBody = {inc_votes: 1}
    return ncNewsApi.patch(`/comments/${commentID}`, patchBody).then((response) => {
        return response.data.comment
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
}

export const downVoteCommentById = (commentID) => {
    const patchBody = {inc_votes: -1}
    return ncNewsApi.patch(`/comments/${commentID}`, patchBody).then((response) => {
        return response.data.comment
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
}

export const postCommentByArticleId = (articleID, comment) => {
  
    
    return ncNewsApi.post(`/articles/${articleID}/comments`, comment).then((response) => {
        return response.data.comment;
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
}

export const getAllTopics = () => {
    return ncNewsApi.get(`/topics`).then((response) => {
        return response.data.topics
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
} 

export const getAllUsers = () => {
    return ncNewsApi.get(`/users`).then((response)=> {
        return response.data.users
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
}

export const getArticleByQuery = (queries) => {
 return ncNewsApi.get(`/articles?${queries}`).then((response)=> {
    
    return response.data.articles;
 }).catch((err) => {
    return {error: err.response.data.msg}
 })
}

export const deleteCommentById = (commentID) => {
    return ncNewsApi.delete(`/comments/${commentID}`).then(()=> {
    }).catch((err) => {
        return {error: err.response.data.msg}
     })
}