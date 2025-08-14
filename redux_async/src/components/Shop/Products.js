import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCTS = [
  {
    id: "p1",
    title: "My first book",
    description: "The first book I ever wrote",
    price: 6,
  },
  {
    id: "p2",
    title: "My second book",
    description: "The second book I ever wrote",
    price: 5,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
