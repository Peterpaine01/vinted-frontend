import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// images
import defaultAvatar from "../assets/img/avatar-default.jpg";

// Import composants
import Fil from "../components/Fil";

const Home = ({ tear, search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search.title}&sort=${search.sort}&priceMin=${search.priceRange[0]}&priceMax=${search.priceRange[1]}`
        );
        console.log(response.data);
        // console.log(search);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
    document.body.className = "home";
    return () => {
      document.body.className = "";
    };
  }, [search]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <main className="main-white">
        <div className="slider">
          <div className="container">
            <div className="promo-insert">
              <h1>Prêts à faire du tri dans vos placards ?</h1>
              <Link className="btn-solid btn-large" to={`/publish`}>
                Vends maintenant
              </Link>
            </div>
            <img src={tear} alt="" />
          </div>
        </div>
        <div className="sections">
          <div className="container">
            <section>
              <h2>Fil d'actu</h2>
              <div className="list-offer">
                {data.offers.map((offer, index) => {
                  // console.log(offer.owner.account.avatar.secure_url);
                  return (
                    <Fil
                      key={offer._id}
                      index={index}
                      offer={offer}
                      defaultAvatar={defaultAvatar}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        </div>
        <img src={tear} alt="" />
      </main>
    </>
  );
};

export default Home;
