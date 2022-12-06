import { Link } from "react-router-dom";

export const Header = () => {
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
            </ul>
          </nav>
        </header>
      );
} 