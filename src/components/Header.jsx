import { Link } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";

// Je récupère en props le state token et la fonction handleToken
const Header = ({
  token,
  handleToken,
  handleSubmit,
  handleChange,
  searchReq,
  setSearchReq,
  search,
  values,
  setSearch,
  handleChangeRange,
}) => {
  return (
    <>
      <header>
        {/* ------- TOP MENU --------- */}
        <div className="top-menu">
          <div className="container">
            <div className="logo">Logo</div>

            <div className="search-offer">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  id=""
                  placeholder="Rechercher des articles"
                  onChange={handleChange}
                  value={search.title}
                />
              </form>
            </div>
            <nav>
              {/* Si token existe, c'est que je suis connecté, j'affiche le bouton déconnexion, sinon j'affiche les 2 autres boutons */}

              {token ? (
                <button
                  onClick={() => {
                    // Je me déconnecte en appelant la fonction handleToken et en lui donnant null en argument
                    handleToken(null);
                  }}
                >
                  se déconnecter
                </button>
              ) : (
                <>
                  <Link to={`/signup`}>s'inscrire</Link>
                  <Link to={`/login`}>se connecter</Link>
                </>
              )}

              <Link to={`/publish`}>Vends tes articles</Link>
            </nav>
          </div>
        </div>
        {/* ------- FILTER MENU --------- */}
        <div className="filter-menu">
          <div className="container">
            <div className="sort-filter">
              <span>Trier par prix :</span>
              <input
                type="checkbox"
                name="sort"
                id=""
                placeholder="Rechercher des articles"
                onChange={handleChange}
                value={search.sort}
              />
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
                          colors: ["#ccc", "#548BF4", "#ccc"],
                          min: 0,
                          max: 500,
                        }),
                        alignSelf: "center",
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
                      height: "42px",
                      width: "42px",
                      borderRadius: "4px",
                      backgroundColor: "#FFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        height: "16px",
                        width: "5px",
                        backgroundColor: isDragged ? "#548BF4" : "#CCC",
                      }}
                    >
                      {values[index]}
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
