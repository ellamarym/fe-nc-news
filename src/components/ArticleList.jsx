import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { getAllArticles, getAllTopics, getArticleByQuery } from "../api"
import { TopicContext } from "../contexts/TopicContext"
import { TopicListContext } from "../contexts/TopicListContext"
import { ArticleCard } from "./ArticleCard"

export const Articles = ()=> {
    const[articlesList, setArticlesList] = useState([])
    const[isLoading , setIsLoading] = useState(true)
    const[queries, setQueries] = useState('')
    const {topic, setTopic} = useContext(TopicContext)
    const {topicList, setTopicList} = useContext(TopicListContext)
    const navigate = useNavigate()
    
    useEffect(()=> {
        setIsLoading(true)
        if(topic.length) {
            if(queries.length){
                getArticleByQuery(queries).then((articles) =>{
                    setArticlesList(articles)
                    setIsLoading(false)
                })
            } else {
                getArticleByQuery(`topic=${topic}`).then((articles)=> {
                setArticlesList(articles)
                setIsLoading(false)
            }) 
            }
           
        } else{
            if(queries.length){
                getArticleByQuery(queries).then((articles) =>{
                    setArticlesList(articles)
                    setIsLoading(false)
                })
            } else {
                getAllArticles().then((articles) => {
            setArticlesList(articles)
            setIsLoading(false)
        }) 
            }
           
        }
        
        if(!topicList.length) {
            getAllTopics().then((allTopics)=> {
                setTopicList(allTopics)
            })
        }
        
    },[topic, queries])
    
    const selectHandler = (e) => {
        e.preventDefault();
        
        if(e.target.value === 'Show all') {
            setTopic('')
            navigate('/articles')
        } else {
            setTopic(e.target.value)
            navigate(`/articles?topic=${e.target.value}`);
        }
      };

    function filterByTopic () {
        return (
            <form >
            <label htmlfor='chooseTopic'> Filter By Topic</label>
            <select name='chooseTopic' onChange={selectHandler}>
            <option >Show all</option>
            {topicList.map(({slug}) => {
            return <option  value={slug}>{slug}</option>;
          })}
        </select>
        
        </form>
            )    
    }

    function sortHandler(e) {
        e.preventDefault()
        if(e.target.value !== 'placeholder'){
          if(topic.length) {
            setQueries(`topic=${topic}&sortby=${e.target.value}`)
            navigate(`/articles?topic=${topic}&sortby=${e.target.value}`)
        } else {
            setQueries(`sortby=${e.target.value}`)
            navigate(`/articles?sortby=${e.target.value}`)
        }  
        }
         

    }

    function sortBy () {
        return (
            <form>
                <label htmlFor="sortby">Sort by</label>
                <select name='sortBy' onChange = {sortHandler}>
                    <option value='placeholder'></option>
                    <option value='created_at'>Date: newest first</option>
                    <option value='created_at&order=asc'>Date: oldest first</option>
                    <option value='comment_count'>Comments: highest to lowest</option>
                    <option value='comment_count&order=asc'>Comments: lowest to highest</option>
                    <option value='votes'>Votes: highest to lowest</option>
                    <option value='votes&order=asc'>Votes: lowest to highest</option>
                    <option value='author&order=asc'>Author: A to Z</option>
                    <option value='author'>Author: Z to A</option>
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
            {sortBy()}
            {displayArticleList()}
        </section>
    )
}