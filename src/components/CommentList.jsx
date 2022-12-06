import { useEffect } from "react"
import { useState } from "react"
import { getCommentsByArticleId } from "../api"
import { CommentCard } from "./CommentCard"

export const CommentList = ({articleID}) => {
    const[isLoading , setIsLoading] = useState(true)
    const[commentList, setCommentList] = useState([])
    
    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(articleID).then((comments) => {
            setCommentList(comments)
            setIsLoading(false)
        })
    },[])

    function displayCommentList () {
        return isLoading ? <p>Loading all comments...</p>:(
            <ul>
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
            {displayCommentList()}
        </section>
    )
}