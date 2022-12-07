import { Link } from "react-router-dom";
export const TopicCard = ({ slug, description}) =>{

     return(
        <li key={slug}>
            <h3>{slug}</h3>
            <p>{description}</p>
           <Link to={`/articles?topic=${slug}`}></Link>
        </li>
     )
}