import { useState } from "react"
import { postCommentByArticleId } from "../api"

export const CommentForm = ({ articleID, setDisplayedCommentCount }) => {
    const [commentInputted, setCommentInputted] = useState('')
    const [finishedCommenting, setFinishedCommenting] = useState(false)


    function handlesubmit(e) {
        e.preventDefault()
       if(commentInputted.length) {
        setFinishedCommenting(true)
        setDisplayedCommentCount((currentCount) => {
            return currentCount + 1;
        })
        postCommentByArticleId(+articleID, commentInputted).then(() => { })
        setCommentInputted('')
        document.getElementById('comment-input').value = ''
       }
        
        
    }

    function handleCommentInputChange(e) {
        setCommentInputted(e.target.value)
    }
    return (
        <section>
            {finishedCommenting ? <p>Comment posted</p> : <form onSubmit={(e) => { handlesubmit(e) }}>
                <label>Comment</label>
                <input type="text" id="comment-input" name="comment-input" onChange={handleCommentInputChange}></input>
                <button type='submit'>Submit</button>
            </form>}
            
        </section>
    )
}