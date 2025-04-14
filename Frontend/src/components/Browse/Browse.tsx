import { useEffect, useState } from "react";
import axios from "axios";
import "./Browse.css";
import { Link } from 'react-router-dom';

function Browse() {
  const [backendData, setBackendData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    await axios
      .get("http://localhost:5000/sets")
      .then((response) => {
        console.log(response.data.sets);
        setBackendData(response.data.sets);

        // You should NOT log backendData here, it's not updated yet
        // // Log directly from the response
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="browse">
      <div className="heading" id="browse-heading">
        <span>
          <h2>Select any flashcard set to study!</h2>
        </span>
      </div>
      <div className="browse-container">
        {        
        backendData.map((set: any) => (
          <Link to={set._id}>
            <div className="ind-set">
              <h2>{set.name}</h2>
              <p>Course: {set.course}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Browse;
