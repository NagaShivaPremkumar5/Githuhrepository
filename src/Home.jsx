import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './store';
import GoogleLoginComponent from './GoogleLoginComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Home() {
  const storeInfo = {
    name: "FreshMart",
    description: "At FreshMart, we believe in providing fresh, high-quality products that cater to both vegetarian and non-vegetarian tastes. Our mission is to bring delicious meals to your table with quality and affordability."
  };
  
  const storeHours = {
    weekdays: "9:00 AM - 8:00 PM",
    weekends: "10:00 AM - 6:00 PM"
  };

  const categories = [
    { name: "Vegetarian", description: "Fresh and healthy vegetarian dishes" },
    { name: "Non-Vegetarian", description: "A selection of premium meats and dishes" },
    { name: "Vegan", description: "100% plant-based options for a healthier choice" },
    { name: "Specials", description: "Limited-time offers and seasonal dishes" }
  ];

  const topSellers = {
    veg: [
      { name: "Potato Curry", price: 150.5 },
      { name: "Veg Biriyani", price: 120.5 }
    ],
    nonveg: [
      { name: "Chicken Curry", price: 315.0 },
      { name: "Mutton Biriyani", price: 350.5 }
    ]
  };

  const promotions = [
    { code: "PREM10", discount: "10%", description: "10% off on all items" },
    { code: "SAVE20", discount: "20%", description: "20% off for orders above $500" }
  ];

  const dispatch = useDispatch();

  return (
    <>
     {/* <GoogleOAuthProvider clientId="186063314066-supj9fb9bg0bqv76lnm61efu13o1dnip.apps.googleusercontent.com" >
     <GoogleLoginComponent />
</GoogleOAuthProvider> */}

     

      <h1>Welcome to {storeInfo.name}!</h1>
      <p>{storeInfo.description}</p>

      <h2>Store Hours</h2>
      <p>Weekdays: {storeHours.weekdays}</p>
      <p>Weekends: {storeHours.weekends}</p>

      <h2>Top Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <strong>{category.name}: </strong> {category.description}
          </li>
        ))}
      </ul>

      <h2>Top Selling Items</h2>
      <h3>Vegetarian</h3>
      <ul>
        {topSellers.veg.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Non-Vegetarian</h3>
      <ul>
        {topSellers.nonveg.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Special Offers and Discounts</h3>
      <ul>
        {promotions.map((promo, index) => (
          <li key={index}>
            Code: {promo.code} - {promo.discount} ({promo.description})
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
