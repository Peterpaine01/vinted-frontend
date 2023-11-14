import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CheckoutForm = ({ title, price, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  // Va nous permettre de faire une requête à Stripe pour lui envoyer les codes
  const stripe = useStripe();

  //   Pour récupérer le contenu de CardElement
  const elements = useElements();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/user/${token}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // Je récupère le contenu de l'input
      const cardElement = elements.getElement(CardElement);

      //   J'envoie ces informations à stripe pour qu'il valide l'existence de la carte
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'utilisateur", // J'envoie un identifiant de celui qui paye pour savoir qui est à l'origine de la transaction
      });

      console.log(stripeResponse);

      const stripeToken = stripeResponse.token.id;

      //   Je fais une requête à mon back et je lui envoie mon stripeToken

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
        }
      );
      console.log(response.data);
      //   Si la réponse contient succeeded, je fais apparaitre "payment validé"
      if (response.data.status === "succeeded") {
        setSucceeded(true);
      } else {
        setIsLoading(false);
      }

      //   console.log(stripeToken);
    } catch (error) {
      console.log(error);
    }
  };

  return succeeded ? (
    <>
      <h1>Achat réalisé avec succès</h1>
      <h1>Maintenant attends que le vendeur envoie le colis.</h1>
      <Link className="btn-solid btn-large">Continuer mon shopping</Link>
    </>
  ) : (
    <>
      <form onSubmit={handleSubmit}>
        <div className="resume-order">
          <p>
            <span>Commande</span>
            <span>{price} €</span>
          </p>
          <p>
            <span>Frais protection acheteurs</span>
            <span>1.00 €</span>
          </p>
          <p>
            <span>Frais de port</span>
            <span>2.00 €</span>
          </p>
        </div>
        <div className="total-order">
          <div>
            <span>Total</span>
            <span>{Number(price)} €</span>
          </div>
          <p>
            Il ne vous reste plus qu'un étape pour vous offrir{" "}
            <strong>{title}</strong>. Vous allez payer{" "}
            <strong>{Number(price)}</strong> € (frais de protection et frais de
            port inclus).
          </p>
        </div>
        <h1>Résumé de la commande</h1>

        <CardElement />
        <input type="submit" value="Payer" disabled={isLoading} />
      </form>
    </>
  );
};

export default CheckoutForm;