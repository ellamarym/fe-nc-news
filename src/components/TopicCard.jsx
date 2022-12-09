
import { useContext } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TopicContext } from "../contexts/TopicContext";

export const TopicCard = ({ slug, description, topicID}) =>{
const {setTopic} = useContext(TopicContext)
const navigate = useNavigate()


function setChosenTopic() {
    setTopic(`topic=${slug}`)
    navigate(`/articles?topic=${slug}`)
}

     return(
        <section className="topic_card">
        
            <h3>{slug}</h3>
            <p>{description}</p>
           <button onClick={setChosenTopic}><Link to={`/articles?topic=${slug}`}>Related articles</Link></button>
        
        </section>
        
     )
}