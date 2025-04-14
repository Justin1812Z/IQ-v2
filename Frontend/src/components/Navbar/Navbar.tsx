import { HashRouter, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <div className="container">
        <a href="/" className="logo">
          IQ
        </a>

        <div className="search-bar">
          <form className="search-form">
            <input type="text" name="search" placeholder="Search sets.." />
            <button>Search</button>
          </form>
        </div>
      </div>

      <div className="container">
        <HashRouter>
      <ul className="navitems">
       
        <li>
        <Link to="/browse">Browse</Link>
        </li>
        <li>
          <a href="/user/getLogin">Log In</a>
        </li>
        <li>
          <a href="/user/signup">Sign Up</a>
        </li>
      </ul>
      </HashRouter>
      </div>
    </header>
  );
}

export default Navbar;
