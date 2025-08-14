import { useContext, useActionState } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotalPrice = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const formData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({ order: { items: items, customer: formData } })
    );
  }

  const [formState, formAction, isPending] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={hideCheckout}>
        Close
      </Button>
      <Button>Sumbit the Order</Button>
    </>
  );

  if (isPending) {
    actions = <span>Sending order data ...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={hideCheckout}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>OK</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotalPrice)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
