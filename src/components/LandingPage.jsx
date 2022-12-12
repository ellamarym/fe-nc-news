import { useState } from "react"
import { useEffect } from "react"
import { getArticleByQuery, getMostRecentArticle, getMostVotesArticle } from "../api"
import { ArticleCard } from "./ArticleCard"

export const LandingPage = () => {
    const [mostVotesArticle, setMostVotesArticle] = useState({})
    const [mostRecentArticle, setMostRecentArticle] = useState({})
       
    useEffect(() => {
       getMostVotesArticle().then((article)=> {
        setMostVotesArticle(article[0])
       })
        getMostRecentArticle().then((article) => {
            setMostRecentArticle(article[0])
        })
    },[])
    
    return (
        
         <ul className="landing_page_articles">   
            <li>
            <h4 className="landing_page_headers">Most popular article</h4>
        
            <ArticleCard key={mostVotesArticle.article_id} author={mostVotesArticle.author} title={mostVotesArticle.title} created_at={mostVotesArticle.created_at} topic={mostVotesArticle.topic} comment_count={mostVotesArticle.comment_count} votes={mostVotesArticle.votes} article_id={mostVotesArticle.article_id} />
        </li>
        <li>
        <h4 className="landing_page_headers">Most recent article</h4>
       
        <ArticleCard key={mostRecentArticle.article_id} author={mostRecentArticle.author} title={mostRecentArticle.title} created_at={mostRecentArticle.created_at} topic={mostRecentArticle.topic} comment_count={mostRecentArticle.comment_count} votes={mostRecentArticle.votes} article_id={mostRecentArticle.article_id} />
        </li>
        </ul>
        
    )
}