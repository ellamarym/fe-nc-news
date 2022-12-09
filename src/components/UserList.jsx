import { useEffect, useState } from "react"
import { getAllUsers } from "../api"
import { UserCard } from "./UserCard"

export const UserList = () => {
    const[isLoading , setIsLoading] = useState(true)
    const[userList, setUserList] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getAllUsers().then((users) => {
            setUserList(users)
            setIsLoading(false)
        })
    },[])

function displayUserList () {
    return isLoading ? <p>Loading all users...</p>:(
        <ul className="user_list">
            {userList.map(({avatar_url, name, username})=> {
                return (
                    <UserCard key={username} avatar_url={avatar_url} name={name} username={username} />
                )
            })}
        </ul>
    )
}
   
    return (
        <section>
            {displayUserList()}
        </section>
    )
}