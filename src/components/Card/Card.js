import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "./Card.css";
export default function Card({ product }) {
  const { addProductToCart, changeProductQty ,cart} = useContext(GlobalContext);
  
  let storedCart = cart.find((o) => o.id === product.id);
  const allStoredCart = storedCart ? true : false;
  const [count, setCount] = useState(storedCart?.qty);

  // console.log("storedCart", storedCart);
  // console.log("product", product);
  // console.log("count", count);
  useEffect(() => {
    setCount(storedCart?.qty)
  }, [storedCart?.qty])
  
  return (
    <div
      className={allStoredCart ? "product-card stored" : "product-card"}
      onClick={
        allStoredCart
          ? () => {
              setCount(count + 1);
              changeProductQty(storedCart, count + 1);
            }
          : () => addProductToCart(product)
      }
    >
      <div className="product-card-container">
        <img src={product.image} alt={product.title} />
        <div className="product-card-body">
          <h6>{product.title}</h6>
          <span>{product.code}</span>
        </div>
        <span className="product-card-price">$ {product.price}</span>
      </div>
    </div>
  );
}
