import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';

function Veg() {
  const dispatch = useDispatch();

  // State for filtering
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]); // default range can be customized
  
  // Get veg products and unique brands from the Redux store
  const vegProducts = useSelector((state) => state.products.veg);
  const brands = [...new Set(vegProducts.map(product => product.brand))]; // Extract unique brands

  // Filter the  products by selecting brand and price range
  const filteredProducts = vegProducts.filter(product => 
    (selectedBrand === "All" || product.brand === selectedBrand) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const items = filteredProducts.map((product, index) =>
    <li key={index}>
      {product.name} - ${product.price.toFixed(2)} - {product.brand}
      <strong>
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      </strong>
    </li>
  );

  return (
    <>
      <h2>Veg Items</h2>

      <div>
        <label>
          Filter by Brand:
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="All">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Price Range:
          <input 
            type="number" 
            value={priceRange[0]} 
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} 
            placeholder="Min Price" 
          />
          -
          <input 
            type="number" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} 
            placeholder="Max Price" 
          />
        </label>
      </div>

      <ul>
        {items.length > 0 ? items : <p>No products found within the selected criteria.</p>}
      </ul>
    </>
  );
}

export default Veg;
