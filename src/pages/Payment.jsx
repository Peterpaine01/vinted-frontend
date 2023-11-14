import { useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OCOITCauQZ88jZkZuo2BQub4gjLjmwsI50JzgXdi2QfDGDOqXxXZYxRz5nPBsdcAqMqJRqjmWgIV83fK3mCK1Ti00pr4ri026"
);

const Payment = ({ token, handleToken }) => {
  const location = useLocation();
  const { title, price } = location.state;
  console.log(title);

  return token ? (
    <>
      <main>
        {/* <p>{title}</p> */}
        <div className="container">
          <Elements stripe={stripePromise}>
            <CheckoutForm title={title} price={price} token={token} />
          </Elements>
        </div>
      </main>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
