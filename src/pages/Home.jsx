import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import composants
import Fil from "../components/Fil/Fil";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Header />
      <main>
        <div className="slider">
          <div className="container">
            <div className="promo-insert">
              <h1>Prêts à faire du tri dans vos placards ?</h1>
              <Link>Vends maintenant</Link>
            </div>
          </div>
        </div>
        <div className="sections">
          <div className="container">
            <section>
              <h2>Fil d'actu</h2>
              {data.offers.map((offer, index) => {
                // console.log(offer.owner.account.avatar.secure_url);
                return <Fil key={offer._id} index={index} offer={offer} />;
              })}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
