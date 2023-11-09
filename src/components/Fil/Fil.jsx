import { Link } from "react-router-dom";

const Fil = ({ offer }) => {
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
  console.log(owner.account.avatar);

  return (
    <Link to={`/offer/${_id}`}>
      <article className="product">
        <div className="author">
          {owner.account.avatar ? (
            <img src={owner.account.avatar.secure_url} alt="" />
          ) : null}

          <p>{owner.account.username}</p>
        </div>
        <div className="product-preview">
          <img src={product_image.secure_url} alt="" />
        </div>
        <p className="price">{product_price} €</p>
        <p className="size">{product_details[1].TAILLE}</p>
        <p className="brand">{product_details[0].MARQUE}</p>
      </article>
    </Link>
  );
};

export default Fil;
