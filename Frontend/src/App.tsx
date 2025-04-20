import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Browse from "./components/Browse/Browse";
import Flashcards from "./components/Flashcards/Flashcards";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { AuthProvider } from "./AuthContext";
import { useCallback, useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/browse/:id" element={<Flashcards />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
