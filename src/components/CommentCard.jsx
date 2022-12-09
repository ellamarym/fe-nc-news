import { useContext, useState } from "react"
import { deleteCommentById, downVoteCommentById, upVoteCommentById } from "../api"
import { UserContext } from "../contexts/UserContext"

export const CommentCard = ({author, created_at, votes, body, comment_id})=> {
    const [commentVotes, setCommentVotes] = useState(votes)
    const [haveVoted, setHaveVoted] = useState(false)
    const [votedUp, setVotedUp] = useState(false)
    const [votedDown, setVotedDown] = useState(false)
    const {user} = useContext(UserContext)
    const [commentDeleted, setCommentDeleted] = useState(false)
     
    
    function handleUpVote() {
        setHaveVoted(true)
        setVotedUp(true)
        setCommentVotes((currentVotes) => {
            return currentVotes+1;
        })
        upVoteCommentById(comment_id).then(()=> {})
    }

    function handleReverseUpVote () {
        setHaveVoted(false)
        setVotedUp(false)
        setCommentVotes((currentVotes) => {
            return currentVotes-1;
        })
        downVoteCommentById(comment_id).then(()=> {})
    }

    function handleDownVote() {
        setHaveVoted(true)
        setVotedDown(true)
        setCommentVotes((currentVotes) => {
            return currentVotes-1;
        })
        downVoteCommentById(comment_id).then(()=> {})
    }

    function handleReverseDownVote () {
        setHaveVoted(false)
        setVotedDown(false)
        setCommentVotes((commentVotes)=> {
            return commentVotes+1
        })
    }

    function handleDelete() {
        setCommentDeleted(true)
        deleteCommentById(comment_id).then(() => {})
    }

    
    return (
        commentDeleted ? <h4>Comment Deleted!</h4> :
        <li key={comment_id} className='comment_card'>
            <section className="comment_header">
                <h4>Author: {author}</h4>
                <h4>Created at: {created_at}</h4>
            </section>
            <p>{body}</p>
            <h4>Votes: {commentVotes}</h4>
            <button disabled={votedDown} onClick={ !haveVoted ? handleUpVote: handleReverseUpVote }>{!votedUp? <p>upVote</p> : <p>Undo</p>}</button>
            <button disabled={votedUp} onClick={!haveVoted ? handleDownVote: handleReverseDownVote}>{!votedDown? <p>downVote</p> : <p>Undo</p>}</button>
            {user.username===author? <button onClick={handleDelete}>Delete comment</button> : null }

        </li>
    )
}