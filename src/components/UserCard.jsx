import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export const UserCard = ({ avatar_url, name, username}) => {
    const{setUser} = useContext(UserContext)


 function handleUserLogin () {
    setUser({avatar_url, username})
}   

 return (
    <li className="user_card">
        <h2>{username}</h2>
        <img src={avatar_url} alt={username}/>
        <h4>{name}</h4>
        <button onClick = {handleUserLogin}>Log in as {username}</button>
    </li>
)
}