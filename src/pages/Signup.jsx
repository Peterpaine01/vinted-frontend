import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

// Import composants
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Signup = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  Cookies.set("nomDuCookie", "valeurDuCookie");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://lereacteur-vinted-api.herokuapp.com/user/signup`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    if (event === "email") {
      setEmail(event.target.value);
    } else if (event === "username") {
      setUsername(event.target.value);
    } else if (event === "password") {
      setPassword(event.target.value);
      if (password !== "" && password.length >= 8) {
        setShowError(false);
      } else {
        console.log("password is empty");
        setShowError(true);
      }
    } else if (event === "newsletter") {
      setNewsletter(event.target.value);
    }
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <Header />
      <main>
        <div className="container">
          <section className="signup-form">
            <h1>S'inscrire</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  name="username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  value={username}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={() => {
                    handleChange("email");
                  }}
                  value={email}
                />
              </div>
              <div>
                {/* {showError === true ? (
                  <p className="showed">
                    Votre mot de passe doit faire plus de 8 caractères.
                  </p>
                ) : (
                  <p className="hidden">
                    Votre mot de passe doit faire plus de 8 caractères.
                  </p>
                )} */}
                <input
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (password !== "" && password.length >= 8) {
                      setShowError(false);
                    } else {
                      console.log("password is empty");
                      setShowError(true);
                    }
                  }}
                  value={password}
                />
              </div>

              <div>
                <input
                  className="submit-button"
                  type="submit"
                  value="S'inscrire"
                ></input>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
