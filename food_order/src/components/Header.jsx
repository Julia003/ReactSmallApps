import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="React Food logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
