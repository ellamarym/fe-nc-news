import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate} from "react-router-dom";
import { getAllArticles, getAllTopics, getArticleByQuery } from "../api"
import { TopicListContext } from "../contexts/TopicListContext"
import { ArticleCard } from "./ArticleCard"
import { TopicContext } from "../contexts/TopicContext";


export const Articles = ({  }) => {

    const [articlesList, setArticlesList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [queries, setQueries] = useState('')
    const { topicList, setTopicList } = useContext(TopicListContext)
    const navigate = useNavigate()
    const [topicQuery, setTopicQuery] = useState('')
    const [sortByQuery, setSortByQuery] = useState('')
    const {setTopic, topic} = useContext(TopicContext)

    

    useEffect(() => {
        setIsLoading(true)
        if (!topicList.length) {
            getAllTopics().then((allTopics) => {
                setTopicList(allTopics)
            })
        }
        if(topic.length) {
            getArticleByQuery(topic).then((articles) => {
                setArticlesList(articles)
                setIsLoading(false)
                setTopic('')
            })
     } else if (queries.length) {
           
            getArticleByQuery(queries).then((articles) => {
                setArticlesList(articles)
                setIsLoading(false)
            })
        }
        else {
            getAllArticles().then((articles) => {
                setArticlesList(articles)
                setIsLoading(false)
            })
        }
    }, [queries])

    const topicHandler = (e) => {
        if(e.target.value !== 'Show all') {

            setTopicQuery(e.target.value)
        } else {
            setQueries('')
        }
    };



    function sortHandler(e) {
        if(e.target.value.length) {setSortByQuery(e.target.value)
    }}

    



    function displayArticleList() {
        return isLoading ? <p>Loading all articles...</p> : (
            <ul className="articleList">
                {articlesList.map(({ author, title, created_at, topic, comment_count, votes, article_id }) => {
                    return (
                        <ArticleCard key={article_id} author={author} title={title} created_at={created_at} topic={topic} comment_count={comment_count} votes={votes} article_id={article_id} />
                    )
                })}
            </ul>
        )
    }

    function handleQuery (e) {
       e.preventDefault()
       if(topicQuery.length) {
        if(sortByQuery.length) {
            setQueries(`topic=${topicQuery}&${sortByQuery}`)
            navigate(`/articles?topic=${topicQuery}&${sortByQuery}`)
        } else {
            setQueries(`topic=${topicQuery}`)
            navigate(`/articles?topic=${topicQuery}`)
        }
       } else {
        setQueries(`${sortByQuery}`)
        navigate(`/articles?${sortByQuery}`)
       }
    }

    function makeQuery () {
        return (
            <form onSubmit={(e) => {
                handleQuery(e);
              }}>
                <label htmlfor='chooseTopic'> Filter By Topic</label>
                <select name='chooseTopic' onChange={topicHandler}>
                    <option >Show all</option>
                    {topicList.map(({ slug }) => {
                        return <option value={slug}>{slug}</option>;
                    })}
                </select>
                <label htmlFor="sortby">Sort by</label>
                <select name='sortBy' onChange={sortHandler}>
                    <option value='placeholder'></option>
                    <option value='sortby=created_at'>Date: newest first</option>
                    <option value='sortby=created_at&order=asc'>Date: oldest first</option>
                    <option value='sortby=comment_count'>Comments: highest to lowest</option>
                    <option value='sortby=comment_count&order=asc'>Comments: lowest to highest</option>
                    <option value='sortby=votes'>Votes: highest to lowest</option>
                    <option value='sortby=votes&order=asc'>Votes: lowest to highest</option>
                    <option value='sortby=author&order=asc'>Author: A to Z</option>
                    <option value='sortby=author'>Author: Z to A</option>
                </select>
                <button type='submit'>Apply</button>
            </form>
        )
    }
    return (
        <section>
            {makeQuery()}
            {displayArticleList()}
        </section>
    )
}