import { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import { useParams } from "react-router-dom";

function Profile () {

    const [backendData, setBackendData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        fetchAPI();
    }, []);

    useEffect(() => {
        //console.log("Backend Data: ", backendData.firstName); // Log backendData whenever it changes
    }
    , [backendData]); // Log backendData whenever it changes

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://localhost:5000/profile/" + params.userId);
            setBackendData(response.data); // Set the fetched data
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setLoading(false); // Ensure loading is set to false even if there's an error
        }
        
    };

    if (loading || !backendData) {
        return <h1>Loading...</h1>; // Show a loading message while data is being fetched
    }

return(
    <section className="profile">
        <h1>Profile for {backendData.firstName}</h1>
        
        <div className="profile-sets-container">
            <h1>My Sets</h1>

        </div>
    </section>
)
}   

export default Profile;