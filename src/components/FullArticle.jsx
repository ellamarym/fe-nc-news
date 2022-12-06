import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { downVoteArticleById, getIndividualArticle, upVoteArticleById } from "../api"
import { CommentList } from "./CommentList"

export const FullArticle = () => {
    const [articleToView, setArticleToView] = useState({})
    const[isLoading , setIsLoading] = useState(true)
    const [displayComments, setDisplayComments] = useState(false)
    const [commentViewToggle, setCommentViewToggle] = useState('View all Comments')
    const [articleVotes, setArticleVotes] = useState(0)
    const [finishedVoting, setFinishedVoting] = useState(false)
    const {articleID} = useParams()
    

    
    useEffect(() => {
        setIsLoading(true)
        getIndividualArticle(articleID).then((article) => {
            setArticleToView(article)
            setArticleVotes(article.votes)
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
            <h3>Votes: {articleVotes}</h3>
            <button disabled={finishedVoting} onClick={handleUpVote}>upVote</button>
            <button disabled={finishedVoting} onClick={handleDownVote}>downVote</button>
            <h3>Comments: {comment_count}</h3>
            <button onClick={displayCommentList}>{commentViewToggle}</button>
            </section>
        )
    }

    function handleUpVote () {
        setFinishedVoting(true)
        setArticleVotes((currentVotes) => {
            return currentVotes+1;
        })
        upVoteArticleById(articleID).then(() => {})
        
    }

    function handleDownVote () {
        setFinishedVoting(true)
        setArticleVotes((currentVotes) => {
            return currentVotes-1;
        })
        downVoteArticleById(articleID).then(() => {})
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