import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getIndividualArticle } from "../api"
import { CommentList } from "./CommentList"

export const FullArticle = () => {
    const [articleToView, setArticleToView] = useState({})
    const[isLoading , setIsLoading] = useState(true)
    const [displayComments, setDisplayComments] = useState(false)
    const [commentViewToggle, setCommentViewToggle] = useState('View all Comments')
    const {articleID} = useParams()
    
    useEffect(() => {
        setIsLoading(true)
        getIndividualArticle(articleID).then((article) => {
            setArticleToView(article)
            setIsLoading(false)
        })
    },[])

    function displayArticle () {
        const {author, body, title, comment_count, votes, created_at} = articleToView 
        return isLoading? <p>Loading article...</p>:(
            <section>
            <h1 className="articleTitle">{title}</h1>
            <h2>Author: {author}</h2>
            <h3>Created at: {created_at}</h3>
            <p>{body}</p>
            <h3>Votes: {votes}</h3>
            <h3>Comments: {comment_count}</h3>
            <button onClick={displayCommentList}>{commentViewToggle}</button>
            </section>
        )
    }

    function displayCommentList () {
        setDisplayComments((currentDisplay) => {
            return !currentDisplay
        })
        if(displayComments) {
            setCommentViewToggle('View all Comments')
        } else { setCommentViewToggle('Hide all Comments')}
    }

    return (
        <section>
            {displayArticle()}
            {displayComments ? <CommentList articleID={articleID}/> : null}
        </section>
    )
}