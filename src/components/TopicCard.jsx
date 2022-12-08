
import { useContext } from "react"
import { Link } from "react-router-dom";
import { TopicContext } from "../contexts/TopicContext"

export const TopicCard = ({ slug, description}) =>{
const {setTopic} = useContext(TopicContext)



function setChosenTopic() {
    setTopic(slug)
}

     return(
        <li key={slug}>
            <h3>{slug}</h3>
            <p>{description}</p>
           <button onClick={setChosenTopic}><Link to='/articles'>Related articles</Link></button>
        </li>
     )
}