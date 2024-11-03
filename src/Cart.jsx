import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from "./store";

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    setPurchaseHistory(storedHistory);
  }, []);

  const calculatePrices = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    // Applying standard discount
    const standardDiscountAmount = (discount / 100) * total;
    const priceAfterStandardDiscount = total - standardDiscountAmount;

    // Applying coupon discount on the price after standard discount
    const couponDiscountAmount = (couponDiscountPercentage / 100) * priceAfterStandardDiscount;
    const finalPrice = priceAfterStandardDiscount - couponDiscountAmount;

    return { total, standardDiscountAmount, couponDiscountAmount, finalPrice };
  };

  const applyCoupon = () => {
    if (couponCode === "PREM10") {
      setCouponDiscountPercentage(10);
    } else if (couponCode === "PREM20") {
      setCouponDiscountPercentage(20);
    } else if (couponCode === "PREM30") {
      setCouponDiscountPercentage(30);
    } else {
      alert("Invalid coupon code");
      setCouponDiscountPercentage(0);
    }
  };

  const handlePurchase = () => {
    const { total, finalPrice } = calculatePrices();

    const purchaseRecord = {
      items: cartItems,
      total,
      discountedTotal: finalPrice,
      discount,
      couponDiscountPercentage,
      date: new Date().toLocaleString(),
    };

    const updatedHistory = [...purchaseHistory, purchaseRecord];
    setPurchaseHistory(updatedHistory);
    localStorage.setItem("purchaseHistory", JSON.stringify(updatedHistory));

    dispatch(clearCart());
    setDiscount(0);
    setCouponCode("");
    setCouponDiscountPercentage(0);
    alert("Purchase successfully Completed...!");
  };

  const { total, standardDiscountAmount, couponDiscountAmount, finalPrice } = calculatePrices();

  return (
    <>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
          <>
          <ul>
           {cartItems.map(item => (
            <li key={item.name}>
                <p>
                  {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                 <button onClick={() => dispatch(incrementQuantity(item))}>+</button>
                <button onClick={() => dispatch(decrementQuantity(item))}>-</button>
                  <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
                </p>
              </li>
            ))}
          </ul>

          <p>Total Amount: ${total.toFixed(2)}</p>
          <div>
            <button onClick={() => setDiscount(10)}>Apply 10% Discount</button>
            <button onClick={() => setDiscount(20)}>Apply 20% Discount</button>
            <button onClick={() => setDiscount(30)}>Apply 30% Discount</button>
          </div>
          <br></br>
          <div>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
            />
            <button onClick={applyCoupon}>Apply Coupon</button>
          </div>

          <div>
            <p>Standard Discount Amount: ${standardDiscountAmount.toFixed(2)}</p>
            <p>Coupon Discount Amount: ${couponDiscountAmount.toFixed(2)}</p>
            <p>Discount Applied: {discount}%</p>
            <p>Coupon Applied: {couponDiscountPercentage}%</p>
            <p>Customer To Pay: ${finalPrice.toFixed(2)}</p>
          </div>

          <button onClick={handlePurchase}>Purchase</button>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </>
  );
};

export default Cart;
