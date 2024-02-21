import React from "react";
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Product() {
  
  const { addItemToCart } = useContext(CartContext);
  
  return (
    <article className="product">
      <img src={CartContext.image} alt={CartContext.title} />
      <div className="product-content">
        <div>
          <h3>{CartContext.title}</h3>
          <p className='product-price'>${CartContext.price}</p>
          <p>{CartContext.description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addItemToCart(CartContext.id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
