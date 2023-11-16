import { Link } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Je récupère en props le state token et la fonction handleToken
const Header = ({ logo, token, handleToken, search, setSearch }) => {
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");

  const values = search.priceRange;

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
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSearch({
        ...search,
        title: searchTitle,
      });
      navigate("/");
      setSearchTitle("");
      console.log(search);
    } catch (error) {
      console.log(error.response); // contrairement au error.message d'express
    }
  };

  return (
    <>
      <header>
        {/* ------- TOP MENU --------- */}
        <div className="top-menu">
          <div className="container">
            <Link className="logo" to="/">
              <img src={logo} alt="" />
            </Link>

            <div className="search-offer">
              <form onSubmit={handleSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  name="title"
                  placeholder="Rechercher des articles"
                  onChange={(event) => {
                    setSearchTitle(event.target.value);
                  }}
                  value={searchTitle}
                />
              </form>
            </div>
            <nav>
              {/* Si token existe, c'est que je suis connecté, j'affiche le bouton déconnexion, sinon j'affiche les 2 autres boutons */}

              {token ? (
                <button
                  className="btn-red"
                  onClick={() => {
                    // Je me déconnecte en appelant la fonction handleToken et en lui donnant null en argument
                    handleToken(null);
                  }}
                >
                  Se déconnecter
                </button>
              ) : (
                <>
                  <Link className="btn-light" to={`/signup`}>
                    S'inscrire
                  </Link>
                  <Link className="btn-light" to={`/login`}>
                    Se connecter
                  </Link>
                </>
              )}

              <Link className="btn-solid" to={`/publish`}>
                Vends tes articles
              </Link>
            </nav>
          </div>
        </div>
        {/* ------- FILTER MENU --------- */}
        <div className="filter-menu">
          <div className="container">
            <div className="sort-filter">
              <p>Trier par prix :</p>
              <label className="switch">
                <input
                  type="checkbox"
                  name="sort"
                  placeholder="Rechercher des articles"
                  onChange={handleChange}
                  value={search.sort}
                />
                <span className="slider-switch round"></span>
              </label>
            </div>
            <div className="range-filter">
              <span>Prix entre :</span>

              <Range
                values={values}
                step={5}
                min={0}
                max={500}
                onChange={(values) => {
                  handleChangeRange(values);
                }}
                renderTrack={({ props, children }) => (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#ededed", "#09b0ba", "#ededed"],
                          min: 0,
                          max: 500,
                        }),
                        alignSelf: "center",
                        position: "relative",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged, index }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "17px",
                      width: "17px",
                      borderRadius: "50%",
                      backgroundColor: "#09b0ba",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="range-cursor"
                      style={{
                        padding: "3px",
                        backgroundColor: "#09b0ba",
                        textAlign: "center",
                        position: "absolute",
                        top: "-20px",
                        borderRadius: "2px",
                      }}
                    >
                      <p>{`${values[index]} €`}</p>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
