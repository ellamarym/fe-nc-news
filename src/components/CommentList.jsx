import { useEffect } from "react"
import { getCommentsByArticleId } from "../api"
import { CommentCard } from "./CommentCard"
import { CommentForm } from "./CommentForm"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"

export const CommentList = ({articleID, displayedCommentCount, setDisplayedCommentCount}) => {
    const[isLoading , setIsLoading] = useState(true)
    const[commentList, setCommentList] = useState([])
    const [commentInputted, setCommentInputted] = useState('')
   const [newComment, setNewComment] = useState('')
   
    
    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(articleID).then((comments) => {
            setCommentList(comments.reverse())
            setIsLoading(false)
        })
    },[])
   
  

    function displayCommentList () {
        
        return isLoading ? <p>Loading all comments...</p>:(
            <ul className="comment_list">  
                
                {commentList.map(({author, created_at, votes, body, comment_id})=> {
                    return (
                        <CommentCard key={comment_id} author={author} created_at={created_at} votes={votes} body={body} comment_id={comment_id}/>
                    )
                })}
            </ul>
        )
       }
       
      
    return (
        
        <section>
            <CommentForm articleID={articleID} setDisplayedCommentCount={setDisplayedCommentCount} commentInputted={commentInputted} setCommentInputted={setCommentInputted}
            newComment={newComment} setNewComment={setNewComment} />
            
            {displayCommentList()}
        </section>
    )
}