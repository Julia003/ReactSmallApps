import { createContext, useState } from "react";

const PRODUCTS = [
  {
    id: "p1",
    title: "Red Scarf",
    description: "A pretty red scarf.",
    isFavorite: false,
  },
  {
    id: "p2",
    title: "Blue T-Shirt",
    description: "A pretty blue t-shirt.",
    isFavorite: false,
  },
  {
    id: "p3",
    title: "Green Trousers",
    description: "A pair of lightly green trousers.",
    isFavorite: false,
  },
  {
    id: "p4",
    title: "Orange Hat",
    description: "Street style! An orange hat.",
    isFavorite: false,
  },
];

export const ProductsContext = createContext({
  products: [],
  toggleFavorite: (productId) => {},
});

export default (props) => {
  const [productsList, setProductsList] = useState(PRODUCTS);

  const toggleFavorite = (productId) => {
    setProductsList((prevProductsList) => {
      const prodIndex = prevProductsList.findIndex(
        (p) => p.id === productId
      );
      const newFavStatus = !prevProductsList[prodIndex].isFavorite;
      const updatedProducts = [...prevProductsList];
      updatedProducts[prodIndex] = {
        ...prevProductsList[prodIndex],
        isFavorite: newFavStatus,
      };

      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider
      value={{ products: productsList, toggleFavorite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
