import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';

function nonveg(){

const nonVegProducts = useSelector(state => state.products.nonveg);

const dispatch = useDispatch();

  const items = nonVegProducts.map((product, index) =>
    <li key={index}>
      {product.name} - ${product.price.toFixed(2)}
          <button onClick={() => dispatch(addToCart(product))}>  Add to Cart</button>
    </li> 
  );
     return (
    <>
     <h2>NonVeg Items</h2>
      <ul>
     
      <p>  {items}  </p>
      </ul>
    </>
  )
};

export default nonveg;
