import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
