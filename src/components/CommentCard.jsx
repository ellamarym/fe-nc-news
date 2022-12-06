import { useState } from "react"

export const CommentCard = ({author, created_at, votes, body, comment_id})=> {
    const [commentVotes, setCommentVotes] = useState(votes)
    function handleUpVote() {
    }
    function handleDownVote() {}

    return (
        <li key={comment_id} className='commentCard'>
            <section className="commentHeader">
                <h4>Author: {author}</h4>
                <h4>Created at: {created_at}</h4>
            </section>
            <p>{body}</p>
            <h4>Votes: {commentVotes}</h4>
            <button onClick={handleUpVote}>upVote</button>
            <button onClick={handleDownVote}>downVote</button>
        </li>
    )
}