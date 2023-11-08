import { Link } from "react-router-dom";
import Fil from "../components/Fil/Fil";

const Home = ({ data }) => {
  console.log(data);
  return (
    <>
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
                return <Fil key={offer._id} index={index} offer={offer} />;
              })}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
