import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_price, setProduct_price] = useState(0);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [localization, setLocalization] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [echanges, setEchanges] = useState(false);

  // State qui contient mon image sélectionnée
  const [product_image, setProduct_image] = useState();
  // State qui contient l'url fourni par cloudinary
  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Je crée une nouvelle instance du constructeur FormData
      const formData = new FormData();
      // Rajouter paires clef/valeur à mon formdata
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_price", product_price);
      formData.append("brand", brand);
      formData.append("color", color);
      formData.append("size", size);
      formData.append("sate", state);
      formData.append("localization", localization);
      formData.append("echanges", echanges);
      formData.append("product_image", product_image);

      // Je donne 3 arguments à axios.post :
      // - L'URL à interroger
      // - le body, ici un formData
      // - Les potentiels headers à envoyer : ici un token et le type du body que j'envoie
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setPictureFromCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <>
      <main>
        <div className="container">
          <section className="offer-form">
            <h1>Vends ton article</h1>
            <form onSubmit={handleSubmit}>
              <div className="white-block">
                <input
                  type="file"
                  onChange={(event) => {
                    // console.log(event);
                    setProduct_image(event.target.files[0]);
                  }}
                />
                {pictureFromCloudinary && (
                  <img src={pictureFromCloudinary} alt="" />
                )}
              </div>
              <div className="white-block">
                <div className="text-input">
                  <p>Titre</p>
                  <input
                    type="text"
                    name="product_name"
                    placeholder="ex : Chemise Sézane verte"
                    onChange={(event) => {
                      setProduct_name(event.target.value);
                      console.log(product_image);
                    }}
                  />
                </div>
                <div className="text-input">
                  <p>Décris ton article</p>
                  <input
                    type="text"
                    name="product_description"
                    placeholder="ex : Portée quelques fois"
                    onChange={(event) => {
                      setProduct_description(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="white-block">
                <div className="text-input">
                  <p>Marque</p>
                  <input
                    type="text"
                    name="brand"
                    placeholder="ex : Sézane"
                    onChange={(event) => {
                      setBrand(event.target.value);
                    }}
                  />
                </div>
                <div className="text-input">
                  <p>Taille</p>
                  <input
                    type="text"
                    name="size"
                    placeholder="ex : 37"
                    onChange={(event) => {
                      setSize(event.target.value);
                    }}
                  />
                </div>
                <div className="text-input">
                  <p>Couleur</p>
                  <input
                    type="text"
                    name="color"
                    placeholder="ex : vert"
                    onChange={(event) => {
                      setColor(event.target.value);
                    }}
                  />
                </div>
                <div className="text-input">
                  <p>Etat</p>
                  <input
                    type="text"
                    name="state"
                    placeholder="ex : bon état"
                    onChange={(event) => {
                      setState(event.target.value);
                    }}
                  />
                </div>
                <div className="text-input">
                  <p>Lieu</p>
                  <input
                    type="text"
                    name="localization"
                    placeholder="ex : Orléans"
                    onChange={(event) => {
                      setLocalization(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="white-block">
                <div className="text-input">
                  <p>Prix</p>
                  <input
                    type="text"
                    name="product_price"
                    placeholder="ex : Sézane"
                    onChange={(event) => {
                      setProduct_price(event.target.value);
                      console.log(product_price);
                    }}
                  />
                </div>
                <div className="text-input">
                  <input
                    type="checkbox"
                    name="echanges"
                    onChange={() => {
                      setEchanges(!echanges);
                    }}
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
              <input type="submit" value="Ajouter" />
            </form>
          </section>
        </div>
      </main>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
