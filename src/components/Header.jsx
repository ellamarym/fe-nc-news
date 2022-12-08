import { Link } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export const Header = () => {
  const{user} = useContext(UserContext)

  function userDisplay (){
    if(user.username) {
      return (<section>
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
          <h1>Inn4MayShon Newz 25</h1>
        <h3>Get inn4ormed</h3>
          <nav className="navBar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/articles">All Articles</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>
          </nav>
          <section>
            {userDisplay()}
          </section>
        </header>
      );
} 