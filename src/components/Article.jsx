export const Article = ({author, title, created_at, topic, comment_count, votes, article_id}) => {

    return (
    <li className= "articleCard" key={article_id}>
        <h2>{title}</h2>
        <h3>Author: {author}</h3>
        <h3>Topic: {topic}</h3>
        <h4>Created at: {created_at}</h4>
        <h4>Comments: {comment_count}</h4>
        <h4>Votes: {votes}</h4>
    </li>
    )
}