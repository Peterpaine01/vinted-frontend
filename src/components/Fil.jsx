import { Link } from "react-router-dom";

const Fil = ({ offer, defaultAvatar }) => {
  const {
    _id,
    product_name,
    product_description,
    product_price,
    product_details,
    owner,
    product_date,
    product_image,
    product_pictures,
  } = offer;
  //   console.log(owner.account.avatar);

  return (
    <article>
      <div className="author">
        {owner.account.avatar ? (
          <img src={owner.account.avatar.secure_url} alt="" />
        ) : (
          <img src={defaultAvatar} alt="v du logo vinted" />
        )}

        <p>{owner.account.username}</p>
      </div>
      <Link className="product" to={`/offer/${_id}`}>
        <div className="product-preview">
          <img src={product_image.secure_url} alt="" />
        </div>
      </Link>
      <div className="product-description">
        <p className="price">{product_price} €</p>
        <p className="size">{product_details[1].TAILLE}</p>
        <p className="brand">{product_details[0].MARQUE}</p>
      </div>
    </article>
  );
};

export default Fil;
