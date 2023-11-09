import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Import composants
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;
  // console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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

  console.log(data.owner.account.avatar);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <Header />
      <main>
        <div className="container">
          <section className="details-offer">
            <div className="col-left">
              <img src={data.product_image.secure_url} alt="" />
            </div>
            <aside>
              <div className="product-detail">
                <h1>{data.product_price} €</h1>
                {data.product_details.map((detail) => {
                  const clefs = Object.keys(detail);
                  //   console.log(clefs);
                  const clef = clefs[0];
                  //   console.log(clef);
                  return (
                    <p key={clef}>
                      {clef} : {detail[clef]}
                    </p>
                  );
                })}
              </div>
              <div className="product-description">
                <h2>{data.product_name}</h2>
                <p>{data.product_description}</p>
                <div className="author">
                  {data.owner.account.avatar ? (
                    <img src={data.owner.account.avatar.secure_url} alt="" />
                  ) : null}

                  <p>{data.owner.account.username}</p>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Offer;
