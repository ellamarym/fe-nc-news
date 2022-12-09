import { Link } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export const Header = () => {
  const{user} = useContext(UserContext)

  function userDisplay (){
    if(user.username) {
      return (<section className="user_login">
        <h3>Logged in as {user.username}</h3>
        <img id="header-user-image" src={user.avatar_url} alt={user.username}/>
        <Link to="/users">Switch user?</Link>
      </section>)
    } else {
      return <Link to="/users">Log in</Link>
    }
  }

     return (
        <header>
          <nav>
            
                <Link className="nav_link" to="/">Home</Link>
            
                <Link className="nav_link" to="/articles">All Articles</Link>
             
                <Link className="nav_link" to="/topics">Topics</Link>
             
          </nav>
          <section className="titles">
          <h1>Inn4MayShon Newz 25</h1>
          <h3>Get inn4ormed</h3>
          </section>
        <section className="user_login">
          
            {userDisplay()}
          </section>
          
          
        </header>
      );
} 