import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

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
  const [search, setSearch] = useState({
    sort: "",
    priceRange: [0, 50],
    title: "",
  });

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

  const handleChangeRange = (values) => {
    // console.log(values);
    setSearch({
      ...search,
      priceRange: [values[0], values[1]],
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "sort") {
      if (search.sort === "price-asc" || search.sort === "") {
        setSearch({
          ...search,
          [event.target.name]: "price-desc",
        });
        // console.log(search);
      } else {
        setSearch({
          ...search,
          [event.target.name]: "price-asc",
        });
        // console.log(search);
      }
    } else if (event && event.target.name === "title") {
      const value = event.target.value;
      setSearch({
        ...search,
        [event.target.name]: value,
      });
      // console.log(search);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSearch({
        ...search,
      });
      // console.log(search);
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
        search={search}
        values={search.priceRange}
        setSearch={setSearch}
        handleChangeRange={handleChangeRange}
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
        <Route
          path="/publish"
          element={<Publish token={token} handleToken={handleToken} />}
        />
        <Route
          path="/payment"
          element={<Payment token={token} handleToken={handleToken} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
