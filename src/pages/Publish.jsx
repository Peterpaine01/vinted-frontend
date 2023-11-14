import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [city, setCity] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [exchange, setExchange] = useState(false);

  // State qui contient mon image sélectionnée
  const [picture, setPicture] = useState();
  // State qui contient l'url fourni par cloudinary
  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Je crée une nouvelle instance du constructeur FormData
      const formData = new FormData();
      // Rajouter paires clef/valeur à mon formdata
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("color", color);
      formData.append("size", size);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("exchange", exchange);
      formData.append("picture", picture);

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

      console.log(response.data);
      navigate(`/offer/${response.data._id}`);
      setPictureFromCloudinary(response.data.secure_url);
    } catch (error) {
      //   console.log(error.response);
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
                    setPicture(event.target.files[0]);
                  }}
                />
                {picture && <img src={URL.createObjectURL(picture)} alt="" />}
              </div>
              <div className="white-block">
                <div className="text-input">
                  <p>Titre</p>
                  <input
                    type="text"
                    name="title"
                    placeholder="ex : Chemise Sézane verte"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </div>
                <div className="text-input">
                  <p>Décris ton article</p>
                  <textarea
                    name="description"
                    cols="30"
                    rows="10"
                    placeholder="ex : Portée quelques fois"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
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
                    value={brand}
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
                    value={size}
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
                    value={color}
                    onChange={(event) => {
                      setColor(event.target.value);
                    }}
                  />
                </div>
                <div className="text-input">
                  <p>Etat</p>
                  <input
                    type="text"
                    name="condition"
                    placeholder="ex : bon état"
                    value={condition}
                    onChange={(event) => {
                      setCondition(event.target.value);
                    }}
                  />
                </div>
                <div className="text-input">
                  <p>Lieu</p>
                  <input
                    type="text"
                    name="city"
                    placeholder="ex : Orléans"
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="white-block">
                <div className="text-input">
                  <p>Prix</p>
                  <input
                    type="text"
                    name="price"
                    placeholder="ex : Sézane"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                </div>
                <div className="text-input">
                  <input
                    type="checkbox"
                    name="exchange"
                    value={exchange}
                    onChange={() => {
                      setExchange(!exchange);
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
