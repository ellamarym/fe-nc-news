
import { useContext } from "react"

import { TopicContext } from "../contexts/TopicContext"

export const TopicCard = ({ slug, description}) =>{
const {setTopic, topic} = useContext(TopicContext)



function setChosenTopic() {
    setTopic(slug)
}

     return(
        <li key={slug}>
            <h3>{slug}</h3>
            <p>{description}</p>
           <button onClick={setChosenTopic}>Related articles</button>
        </li>
     )
}