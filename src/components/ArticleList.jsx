import { useEffect } from "react"
import { useState } from "react"
import { getAllArticles } from "../api"
import { Article } from "./Article"

export const Articles = ()=> {
    const[articlesList, setArticlesList] = useState([])

    useEffect(()=> {
        getAllArticles().then((articles) => {
            setArticlesList(articles)
        })
    },[])

   function displayArticleList () {
    return (
        <ul className="articleList">
            {articlesList.map(({author, title, created_at, topic, comment_count, votes, article_id})=> {
                return (
                    <Article key={article_id} author={author} title={title} created_at={created_at} topic={topic} comment_count={comment_count} votes={votes} article_id={article_id}/>
                )
            })}
        </ul>
    )
   }

    return (
        <section>
            {displayArticleList()}
        </section>
    )
}