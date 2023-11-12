import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(
    Cookies.get("token") || null
    // Cookies.get("token") ? Cookies.get("token") : null
  );
  const [searchReq, setSearchReq] = useState(
    { sort: "price-asc" },
    { priceMin: 10 }
  );
  const [search, setSearch] = useState("");

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  let newSearch = "?";
  const keysTab = Object.keys(searchReq);
  const ValuesTab = Object.values(searchReq);
  for (let i = 0; i < keysTab.length; i++) {
    if (i > 0) {
      newSearch = newSearch + "&";
    }
    newSearch = newSearch + `${keysTab[i]}=${ValuesTab[i]}`;
  }

  const handleChange = (event) => {
    const value = event.target.value;

    if (event.target.name === "sort") {
      if (searchReq.sort === "price-asc" || searchReq.sort === "") {
        setSearchReq({
          ...searchReq,
          [event.target.name]: "price-desc",
        });
        console.log(searchReq);
        setSearch(newSearch);
      } else {
        setSearchReq({
          ...searchReq,
          [event.target.name]: "price-asc",
        });
        console.log(searchReq);
        setSearch(newSearch);
      }
    } else {
      setSearchReq({
        ...searchReq,
        [event.target.name]: value,
      });
      console.log(searchReq);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(newSearch);
      setSearch(newSearch);
    } catch (error) {
      console.log(error.response); // contrairement au error.message d'express
    }
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchReq={searchReq}
        setSearchReq={setSearchReq}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup token={token} handleToken={handleToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} handleToken={handleToken} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
