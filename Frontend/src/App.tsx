

import {HashRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Browse from './components/Browse/Browse';

function App() {
  

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/browse" element={<Browse />} />
        </Routes>
    </Router>
  )
}

export default App
