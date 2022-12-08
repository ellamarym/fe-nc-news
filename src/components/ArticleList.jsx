import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { getAllArticles, getAllTopics, getArticleByTopic } from "../api"
import { TopicContext } from "../contexts/TopicContext"
import { TopicListContext } from "../contexts/TopicListContext"
import { ArticleCard } from "./ArticleCard"

export const Articles = ()=> {
    const[articlesList, setArticlesList] = useState([])
    const[isLoading , setIsLoading] = useState(true)
    const {topic, setTopic} = useContext(TopicContext)
    const {topicList, setTopicList} = useContext(TopicListContext)

    

    useEffect(()=> {
        setIsLoading(true)
        if(topic.length) {
            getArticleByTopic(topic).then((articles)=> {
                setArticlesList(articles)
                setIsLoading(false)
            })
        } else {
           getAllArticles().then((articles) => {
            setArticlesList(articles)
            setIsLoading(false)
        }) 
        }
        if(!topicList.length) {
            getAllTopics().then((allTopics)=> {
                setTopicList(allTopics)
            })
        }
        
    },[topic])

    const changeHandler = (e) => {
        e.preventDefault();
        if(e.target.value === 'Show all') {
            setTopic('')
        } else {

            setTopic(e.target.value);
        }
      };

    function filterByTopic () {
        return (
            <form >
            <label htmlfor='chooseTopic'> Filter By Topic</label>
            <select name='chooseTopic' onChange={changeHandler}>
            <option>Show all</option>
            {topicList.map(({slug}) => {
            return <option  value={slug}>{slug}</option>;
          })}
        </select>
        </form>
            )    
    }

   

   function displayArticleList () {
    return isLoading ? <p>Loading all articles...</p>:(
        <ul className="articleList">
            {articlesList.map(({author, title, created_at, topic, comment_count, votes, article_id})=> {
                return (
                    <ArticleCard key={article_id} author={author} title={title} created_at={created_at} topic={topic} comment_count={comment_count} votes={votes} article_id={article_id}/>
                )
            })}
        </ul>
    )
   }

    return (
        <section>
            {filterByTopic()}
            {displayArticleList()}
        </section>
    )
}