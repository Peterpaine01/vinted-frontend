import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// images
import logo from "./assets/img/vinted.png";
import tear from "./assets/img/tear.884480420945b3afd77b44a6c5f98567.svg";

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
  const [idUser, setIdUser] = useState(
    Cookies.get("idUser") || null
    // Cookies.get("token") ? Cookies.get("token") : null
  );

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token, idUser) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      Cookies.set("idUser", idUser, { expires: 15 });
      setToken(token);
      setIdUser(idUser);
    } else {
      Cookies.remove("token");
      Cookies.remove("idUser");
      setToken(null);
      setIdUser(null);
    }
  };

  const [search, setSearch] = useState({
    sort: "",
    priceRange: [0, 50],
    title: "",
  });

  return (
    <Router>
      <Header
        logo={logo}
        token={token}
        idUser={idUser}
        handleToken={handleToken}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home tear={tear} search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={
            <Signup
              token={token}
              idUser={idUser}
              handleToken={handleToken}
              tear={tear}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              token={token}
              idUser={idUser}
              handleToken={handleToken}
              tear={tear}
            />
          }
        />
        <Route
          path="/publish"
          element={
            <Publish token={token} idUser={idUser} handleToken={handleToken} />
          }
        />
        <Route
          path="/payment"
          element={
            <Payment token={token} idUser={idUser} handleToken={handleToken} />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
