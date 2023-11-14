import { useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF"
);

const Payment = ({ token, idUser, handleToken }) => {
  const location = useLocation();
  const { title, price } = location.state;
  //   console.log(title);

  return token ? (
    <>
      <main>
        <div className="container">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              title={title}
              price={price}
              token={token}
              idUser={idUser}
            />
          </Elements>
        </div>
      </main>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
