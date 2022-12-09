import { Link } from "react-router-dom";

export const ArticleCard = ({author, title, created_at, topic, comment_count, votes, article_id}) => {

    return (
    <li className= "article_card" key={article_id}>
        <h2 >{title}</h2>
        <h3>Author: {author}</h3>
        <h3>Topic: {topic}</h3>
        <h3>Created at: {created_at}</h3>
        <section className="bottom_article_card">
        <h4>Comments: {comment_count}</h4>
        <h4>Votes: {votes}</h4>
        <Link to={`/articles/${article_id}`}>Read Full Article</Link>
        </section>
    </li>
    )
}