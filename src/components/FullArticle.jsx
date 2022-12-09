import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { downVoteArticleById, getIndividualArticle, upVoteArticleById } from "../api"
import { CommentList } from "./CommentList"

export const FullArticle = () => {
    const [articleToView, setArticleToView] = useState({})
    const[isLoading , setIsLoading] = useState(true)
    const [displayComments, setDisplayComments] = useState(false)
    const [commentViewToggle, setCommentViewToggle] = useState('View Comments')
    const [articleVotes, setArticleVotes] = useState(0)
    const [haveVoted, setHaveVoted] = useState(false)
    const [votedUp, setVotedUp] = useState(false)
    const [votedDown, setVotedDown] = useState(false)
    const [ setCreateAComment] = useState(false)
    const [displayedCommentCount, setDisplayedCommentCount] = useState()
    const {articleID} = useParams()
    
   
    


    

    
    useEffect(() => {
        setIsLoading(true)
        getIndividualArticle(articleID).then((article) => {
            setArticleToView(article)
            setArticleVotes(article.votes)
            setIsLoading(false)
            setDisplayedCommentCount(article.comment_count)
        })
    },[])
    
    function displayArticle () {
        if(articleToView.error) {
            return <h2>ERROR: {articleToView.error}</h2>
        } else {
           const {author, body, title, created_at} = articleToView 
        return isLoading? <p>Loading article...</p>:(
            <section className="full_article">
            <h1>{title}</h1>
            <h2>Author: {author}</h2>
            <h2>Created at: {created_at}</h2>
            <p>{body}</p>
            <section className="article_actions">
            <h3>Votes: {articleVotes}</h3>
            <button disabled={votedDown} onClick={ !haveVoted ? handleUpVote: handleReverseUpVote }>{!votedUp? <p>upVote</p> : <p>Undo</p>}</button>
            <button disabled={votedUp} onClick={!haveVoted ? handleDownVote: handleReverseDownVote}>{!votedDown? <p>downVote</p> : <p>Undo</p>}</button>
            <h3>Comments: {displayedCommentCount}</h3>
            <button onClick={displayCommentList}>{commentViewToggle}</button>
           </section> 
           
           </section>
        ) 
        }
        
    }

    function createCommentForm() {
        setCreateAComment(true)
    }
 
    function handleUpVote () {
        setHaveVoted(true)
        
        setVotedUp(true)
        setArticleVotes((currentVotes) => {
            return currentVotes+1;
        })
        upVoteArticleById(articleID).then(() => {})
        
    }

    function handleReverseUpVote () {
        setHaveVoted(false)
        setVotedUp(false)
        setArticleVotes((currentVotes) => {
            return currentVotes-1;
        })
        downVoteArticleById(articleID).then(()=> {})
    }

    function handleDownVote () {
        setHaveVoted(true)
        setVotedDown(true)
        setArticleVotes((currentVotes) => {
            return currentVotes-1;
        })
        downVoteArticleById(articleID).then(() => {})
    }


    function handleReverseDownVote () {
        setHaveVoted(false)
        setVotedDown(false)
        setArticleVotes((currentVotes) => {
            return currentVotes+1;
        })
        upVoteArticleById(articleID).then(()=> {})
    }

    function displayCommentList () {
        setDisplayComments((currentDisplay) => {
            return !currentDisplay
        })
        if(displayComments) {
            setCommentViewToggle('View Comments')
        } else { setCommentViewToggle('Hide Comments')}
    }
   

    return (
        <section>
            {displayArticle()}
            
            {displayComments ? <CommentList articleID={articleID} displayedCommentCount={displayedCommentCount} setDisplayedCommentCount={setDisplayedCommentCount} /> : null}
            
        </section>
    )
}