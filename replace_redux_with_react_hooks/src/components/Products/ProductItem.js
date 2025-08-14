//import { useDispatch } from 'react-redux';
import Card from "../UI/Card";
import "./ProductItem.css";
//import { ProductsContext } from "../../context/products-context";
//import { useContext } from "react";
//import { toggleFav } from '../../store/actions/products';
import { useStore } from "../../hooks-store/store";
import { memo } from "react";

const ProductItem = memo((props) => {
  console.log("rendering");
  const dispatch = useStore(false)[1];
  //const { toggleFavorite } = useContext(ProductsContext);
  //const dispatch = useDispatch();

  const toggleFavHandler = () => {
    //toggleFavorite(props.id);
    //   dispatch(toggleFav(props.id));
    dispatch("TOGGLE_FAV", props.id);
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
