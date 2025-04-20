import { HashRouter, Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";

function Navbar() {
  const { loggedIn, username, logout } = useAuth();

  if (loggedIn) {
    console.log("Logged in as:", username);
    return<h1>Logged in as: {username}</h1>;
  }

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
        <ul className="navitems">
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          {loggedIn ? (
            <>
              <li>
                <span>Welcome, {username}</span>
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
