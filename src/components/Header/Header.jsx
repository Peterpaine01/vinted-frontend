import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        {/* ------- TOP MENU --------- */}
        <div className="top-menu">
          <div className="container">
            <div className="logo">Logo</div>
            <div className="search-offer">
              <input
                type="text"
                name="search"
                id=""
                placeholder="Rechercher des articles"
              />
            </div>
            <nav>
              <Link to={`/signup`}>s'inscrire</Link>
              <Link to={`/login`}>se connecter</Link>
              <Link to={`/vendre`}>Vends tes articles</Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
