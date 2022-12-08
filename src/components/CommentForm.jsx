import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { postCommentByArticleId } from "../api"
import { Link } from "react-router-dom";


export const CommentForm = ({ articleID, setDisplayedCommentCount, commentInputted, setCommentInputted, newComment, setNewComment}) => {
    const{user} = useContext(UserContext)
    const [finishedCommenting, setFinishedCommenting] = useState(false)
    const [currentComments, setCurrentComments] = useState([])
   
    function handlesubmit(e) {
        e.preventDefault()
       if(commentInputted.length) {
           setFinishedCommenting(true)
           
           setCurrentComments((currentComments) => {
            return [commentInputted, ...currentComments ]
           })
           
        setDisplayedCommentCount((currentCount) => {
            return currentCount + 1;
        })

        postCommentByArticleId(+articleID, commentInputted).then(() => { })
        setCommentInputted('')
        document.getElementById('comment-input').value = ''
       }
    }

     function handleCommentInputChange(e) {
        setFinishedCommenting(false)
        setCommentInputted(e.target.value)
    }

    

    function generateForm () {
      return  (<section>
            {finishedCommenting ?  <p>Comment posted! Add another comment?</p>
            : null }
            <form onSubmit={(e) => { handlesubmit(e) }}>
                <label>Add Comment</label>
                <input type="text" id="comment-input" name="comment-input" onChange={handleCommentInputChange}></input>
                <button type='submit'>Submit</button>
            </form>
             <ul>
                { currentComments.map((comment) => {
                    return <li key={comment} className='commentCard'>
                                <section className="commentHeader">
                                <h4>Author: {user.username}</h4>
                                <h4>Created at: just now</h4>
                        </section>
                        <p>{comment}</p>
                        <h4>Votes: 0</h4>
                    </li>
                })}
            </ul> 
        </section>)
    }
    return (
          user.username? generateForm() : <p><Link to="/users">Log in</Link> to post a comment</p>
    )
}