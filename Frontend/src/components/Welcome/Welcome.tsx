import "./Welcome.css";
import {useEffect, useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

function Welcome() {
 
    const [backendData, setBackendData] = useState<any>(({}))
    const [loading, setLoading] = useState(true);

    

    
  return (
    <>
    
      <div className="home-text">
        <h1>
          Welcome to <br /> Instant Quiz
        </h1>
      
       <Link to="/browse">Browse</Link>

        <h2>IQ Mastery. Anytime. Anywhere.</h2>
        <p>
          We are dedicated to getting you ready for your next assignment. Browse
          and study from our vast inventory or create your own study card items.
        </p>
      </div>

      <div className="home-img">
        <img src="/assets/MainPage.png" alt="" />
      </div>
    </>
  );
}

export default Welcome;
