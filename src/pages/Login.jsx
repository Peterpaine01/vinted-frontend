import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //   State qui gère les messages d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        email: user.email,
        password: user.password,
      };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        userData
      );
      console.log(response.data);
      handleToken(response.data.token, response.data._id);
      // Cookies.set("id", id, { expires: 15 });

      navigate("/");
    } catch (error) {
      // console.log(error.message);
      if (error.response.data.message === "Missing parameters") {
        // Je met à jour mon state errorMessage
        setErrorMessage("Merci de remplir tous les champs");
      } else if (error.response.status === 401) {
        setErrorMessage("Email ou mot de passe invalide");
      }
    }
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="signup-form">
            <h1>S'inscrire</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </label>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button type="submit">Login</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
