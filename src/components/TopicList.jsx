
import { useContext, useState } from "react"
import { useEffect } from "react"
import { getAllTopics } from "../api"
import { TopicListContext } from "../contexts/TopicListContext"
import { TopicCard } from "./TopicCard"

export const TopicList = ({}) => {
const {topicList, setTopicList} = useContext(TopicListContext)
const[isLoading , setIsLoading] = useState(true)

    useEffect(()=> {
        setIsLoading(true)
        getAllTopics().then((allTopics)=> {
            setTopicList(allTopics)
            setIsLoading(false)
        })
    }, [])
    function displayTopicList () {
        return isLoading ? <p>Loading all topics...</p>:(
            <section className="topic_list">
                {topicList.map(({slug, description, topicID})=> {
                    return (
                        <TopicCard key={topicID} slug = {slug} description={description } topicID={topicID} />
                    )
                })}
            </section>
        )
    }
    return (
        <section>
            {displayTopicList()}
        </section>
    )
}