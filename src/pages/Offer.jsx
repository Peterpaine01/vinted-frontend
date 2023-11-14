import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({ title: "yo", price: "2" });

  const params = useParams();
  const id = params.id;
  // console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data.product_name);
        setData(response.data);
        setIsLoading(false);
        setState({
          title: `${response.data.product_name}`,
          price: `${response.data.product_price}`,
        });
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, []);

  console.log(state);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <main className="main-grey">
        <div className="container">
          <section className="details-offer">
            <div className="col-left">
              <img src={data.product_image.secure_url} alt="" />
            </div>
            <aside>
              <div className="product-detail">
                <h1>{data.product_price} €</h1>
                <div>
                  {data.product_details.map((detail) => {
                    const clefs = Object.keys(detail);
                    //   console.log(clefs);
                    const clef = clefs[0];
                    //   console.log(clef);
                    return (
                      <p key={clef}>
                        <span>{clef}</span>
                        <span>{detail[clef]}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="product-description">
                <h2>{data.product_name}</h2>
                <p>{data.product_description}</p>
                <div className="sell-block">
                  <p>
                    <span>Envoi</span>
                    <span>à partir de 2,79 €</span>
                  </p>
                  <div className="block-solid light-green">
                    <h3>Profite de réductions jusqu’à -26%</h3>
                    <p>
                      sur la livraison en point relais. Plus d'informations lors
                      du paiement.
                    </p>
                  </div>
                  <Link
                    className="btn-solid btn-large"
                    to="/payment"
                    state={state}
                  >
                    Acheter
                  </Link>
                  <div className="block-light white">
                    <h3>Frais de Protection acheteurs</h3>
                    <p>
                      Pour tout achat effectué par le biais du bouton "Acheter",
                      nous appliquons des frais couvrant notre protection
                      acheteurs. Cette protection acheteurs comprend notre
                      Politique de remboursement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="product-author">
                {data.owner.account.avatar ? (
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                ) : (
                  <img
                    src="../src/assets/img/avatar-default.jpg"
                    alt="v du logo vinted"
                  />
                )}

                <p>{data.owner.account.username}</p>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
};

export default Offer;
