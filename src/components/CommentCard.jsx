import { useState } from "react"
import { upVoteCommentById } from "../api"

export const CommentCard = ({author, created_at, votes, body, comment_id})=> {
    const [commentVotes, setCommentVotes] = useState(votes)
    const [finishedVoting, setFinishedVoting] = useState(false)
    function handleUpVote() {
        setFinishedVoting(true)
        setCommentVotes((currentVotes) => {
            return currentVotes+1;
        })
        upVoteCommentById(comment_id).then(()=> {})
    }
    function handleDownVote() {
        setFinishedVoting(true)
        setCommentVotes((currentVotes) => {
            return currentVotes-1;
        })
    }

    return (
        <li key={comment_id} className='commentCard'>
            <section className="commentHeader">
                <h4>Author: {author}</h4>
                <h4>Created at: {created_at}</h4>
            </section>
            <p>{body}</p>
            <h4>Votes: {commentVotes}</h4>
            <button disabled={finishedVoting} onClick={handleUpVote}>upVote</button>
            <button disabled={finishedVoting} onClick={handleDownVote}>downVote</button>
        </li>
    )
}